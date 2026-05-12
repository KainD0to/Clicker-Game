import { create } from "zustand";

const useItemsStore = create((set, get) => ({
    items: [
        {
            id: 'iron',
            chance: 0.1,
        },
        {
            id: 'wood',
            chance: 0.8,
        }
    ],

    getChances: () => {
        const state = get();
        const droppedItems = [];

        state.items.forEach(item => {
            const roll = Math.random();
            
            if (roll <= item.chance) {
                droppedItems.push({
                    id: item.id,
                    quantity: 1
                });
            }
        });

        return droppedItems;
    },
}));

export default useItemsStore;