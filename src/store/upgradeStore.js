import { create } from "zustand";

const useUpgradeStore = create((set, get) => ({

    upgrades: [
        {
            id: 'click_1',
            name: 'Just a click',
            cost: 10,
            purchased: false,
            isAvailable: false,
            power: 1,
            upgradeLvl: 1,
        },
        {
            id: 'click_2',
            name: 'Nice click',
            cost: 30,
            purchased: false,
            isAvailable: false,
            power: 2,
            upgradeLvl: 2,
        },
        {
            id: 'click_3',
            name: 'Nice cock',
            cost: {
                coins: 50,
                iron: 5
            },
            purchased: false,
            isAvailable: false,
            power: 2,
            upgradeLvl: 2,
        }
    ],

    powerNow: 1,

    getPowerNow: () => get().powerNow,

    upgradeStore: () => set((state) => ({ upgradeLvlNow: state.upgradeLvlNow + 1})),
    
    //checkCoins: (coins) => get((state) => ({ coins: coins })),

    updateIsAvailable: (coins) => set((state) => ({
        upgrades: state.upgrades.map(upgrade => ({
            ...upgrade,
            isAvailable: !upgrade.purchased && upgrade.cost <= coins 
        }))
    })),

    getAvailableUpgrades: () => {
        return get().upgrades.filter(u => u.isAvailable && !u.purchased);
    },

    buyUpgrade: (upgradeId) => {
        const state = get();
        const upgrade = state.upgrades.find(u => u.id === upgradeId);

        if (!upgrade || upgrade.purchased || !upgrade.isAvailable) {
            return false;
        }

        set((state) => ({
            upgrades: state.upgrades.map(u =>
                u.id === upgradeId
                    ? { ...u, purchased: true, isAvailable: false }
                    : u
            ),
            powerNow: upgrade.power,
            upgradeLvlNow: state.upgradeLvlNow + 1
        }));

        return true;
    }
}));

export default useUpgradeStore;