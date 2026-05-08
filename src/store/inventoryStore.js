import {create} from 'zustand';

const useInventoryStore = create((set, get) => ({

    slots: [
        {
            id: 'slot_1',
            isFree: true,
            itemHere: undefined,
        },
        {
            id: 'slot_2',
            isFree: true,
            itemHere: undefined,
        }
    ]

}));


export default useInventoryStore;