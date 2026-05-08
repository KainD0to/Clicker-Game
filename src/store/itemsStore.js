import {create} from 'zustand';

const useInventoryStore = create((set, get) => ({

    items: [
        {
            id: 'Iron',
        },
        {
            id: 'Copper',
        }
    ]

}))