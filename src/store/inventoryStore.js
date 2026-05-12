import { create } from 'zustand';

const useInventoryStore = create((set, get) => ({
    slots: [
        {
            id: 'slot_1',
            isFree: false,
            itemHere: 'iron',
            quantity: 2
        },
        {
            id: 'slot_2',
            isFree: false,
            itemHere: 'wood',
            quantity: 5
        },
        {
            id: 'slot_3',
            isFree: true,
            itemHere: null,
            quantity: 0
        }
    ],

    getItems: () => {
        return get().slots
            .filter(slot => !slot.isFree)
            .map(slot => ({ name: slot.itemHere, quantity: slot.quantity }));
    },

    hasFreeSlot: () => {
        return get().slots.some(slot => slot.isFree);
    },

    addItem: (newItem) => {
        const state = get();

        const similarSlot = state.slots.find(slot => !slot.isFree && slot.itemHere === newItem.id);
        if (similarSlot) {
            set((state) => ({
                slots: state.slots.map(slot =>
                    slot.id === similarSlot.id
                        ? { ...slot, quantity: slot.quantity + (newItem.quantity || 1)}
                        : slot
                )
            }));
            return true;
        }


        const freeSlot = state.slots.find(slot => slot.isFree);
        if (!freeSlot) {
            console.log("Инвентарь полон!");
            return false;
        }

        set((state) => ({
            slots: state.slots.map(slot =>
                slot.id === freeSlot.id
                    ? {...slot, 
                       isFree: false, 
                       itemHere: newItem.id, 
                       quantity: newItem.quantity || 1}
                    : slot
            ),
        }));

        return true;
    }
}));

export default useInventoryStore;