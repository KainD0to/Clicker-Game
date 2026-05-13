import { create } from "zustand";
import useGameStore from './gameStore';
import useItemsStore from './itemsStore';
import useInventoryStore from "./inventoryStore";

const useUpgradeStore = create((set, get) => ({

    upgrades: [
        {
            id: 'click_1',
            name: 'Just a click',
            cost: {
                coins: 10,
                items: {}
            },
            purchased: false,
            isAvailable: false,
            power: 2,
            upgradeLvl: 1,
        },
        {
            id: 'click_2',
            name: 'Nice click',
            cost: {
                coins: 30,
                items: { iron: 3 }
            },
            purchased: false,
            isAvailable: false,
            power: 3,
            upgradeLvl: 2,
        },
        {
            id: 'click_3',
            name: 'Nice cock',
            cost: {
                coins: 50,
                items: { iron: 5, wood: 3 }
            },
            purchased: false,
            isAvailable: false,
            power: 4,
            upgradeLvl: 2,
        }
    ],

    powerNow: 1,

    getPowerNow: () => get().powerNow,

    upgradeStore: () => set((state) => ({ upgradeLvlNow: state.upgradeLvlNow + 1})),

    updateIsAvailable: (coins, items) => set((state) => ({
        upgrades: state.upgrades.map(upgrade => ({
            ...upgrade,
            isAvailable: !upgrade.purchased && 
                          upgrade.cost.coins <= coins && 
                          Object.entries(upgrade.cost.items || {}).every(
                              ([itemName, amount]) => (items[itemName] || 0) >= amount
                          )
        }))
    })),

    getAvailableUpgrades: () => {
        return get().upgrades.filter(u => u.isAvailable && !u.purchased);
    },

    buyUpgrade: (upgradeId) => {
        const state = get();
        const upgrade = state.upgrades.find(u => u.id === upgradeId);
        const gameState = useGameStore.getState();
        const inventoryState = useInventoryStore.getState();

        if (!upgrade || upgrade.purchased || !upgrade.isAvailable) {
            return false;
        }

        const hasEnoughCoins = inventoryState.coins >= upgrade.cost.coins;
        const hasEnoughItems = !upgrade.cost.items || Object.entries(upgrade.cost.items).every(
            ([itemName, amount]) => {
                const totalInSlots = inventoryState.slots
                    .filter(s => !s.isFree && s.itemHere === itemName)
                    .reduce((sum, s) => sum + s.quantity, 0);
                return totalInSlots >= amount;
            }
        );

        set((state) => ({
            upgrades: state.upgrades.map(u =>
                u.id === upgradeId
                    ? { ...u, purchased: true, isAvailable: false }
                    : u
            ),
            powerNow: upgrade.power,
            upgradeLvlNow: state.upgradeLvlNow + 1,
        }));

        useGameStore.setState({ coins: gameState.coins - upgrade.cost.coins });

    // Списываем предметы из слотов
    if (upgrade.cost.items) {
        let toRemove = { ...upgrade.cost.items };
        
        const updatedSlots = inventoryState.slots.map(slot => {
            if (slot.isFree || !toRemove[slot.itemHere]) return slot;
            
            const toTake = Math.min(slot.quantity, toRemove[slot.itemHere]);
            toRemove[slot.itemHere] -= toTake;
            
            if (slot.quantity - toTake <= 0) {
                return { ...slot, isFree: true, itemHere: null, quantity: 0 };
            }
            return { ...slot, quantity: slot.quantity - toTake };
        });

        useInventoryStore.setState({ slots: updatedSlots });
    }

        return true;
    }
}));

export default useUpgradeStore;