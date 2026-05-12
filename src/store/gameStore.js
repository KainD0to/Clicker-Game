import { create } from 'zustand';
import useUpgradeStore from './upgradeStore';
import useItemsStore from './itemsStore';
import useInventoryStore from './inventoryStore';
import { useState } from 'react';

const savedCoins = JSON.parse(localStorage.getItem('coins')) || 0;
const savedTotalCoins = JSON.parse(localStorage.getItem('totalCoins')) || 0;
const savedClicks = JSON.parse(localStorage.getItem('clicks')) || 0;

const useMoneyStore = create((set) => ({

    coins: savedCoins,
    totalCoins: savedTotalCoins,
    clicks: savedClicks,
    items: () => get((state) => ({items: useItemsStore.items})),

    increaseCoins: () => {
        const powerNow = useUpgradeStore.getState().powerNow;
        const droppedItems = useItemsStore.getState().getChances();
    
        if (droppedItems.length > 0) {
            console.log('Выпало:', droppedItems);
            droppedItems.forEach(item => {
                useInventoryStore.getState().addItem(item);
            });
        }
        
        set((state) => {
            const newCoins = state.coins + powerNow;
            const newTotalCoins = state.totalCoins + powerNow;
            const newClicks = state.clicks + 1;
            
            useUpgradeStore.getState().updateIsAvailable(newCoins, state.items || {});
            
            localStorage.setItem('coins', JSON.stringify(newCoins));
            localStorage.setItem('totalCoins', JSON.stringify(newTotalCoins));
            localStorage.setItem('clicks', JSON.stringify(newClicks));

            return { 
                coins: newCoins,
                totalCoins: newTotalCoins,
                clicks: newClicks
            };
        });
    },

    updateCoins: (newCoins) => {
        localStorage.setItem('coins', JSON.stringify(newCoins));
        set({ coins: newCoins });
    },
}));

export default useMoneyStore;