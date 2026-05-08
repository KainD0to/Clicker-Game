import { create } from 'zustand';

const useMoneyStore = create((set) => ({
    coins: 0,

    increaseCoins: () => set((create) => ({ coins: state.coins + useUpgradeStore.getState().powerNow })),
    updateCoins: (newCoins) => set((create) => ({ coins: newCoins })),
}));

export default useMoneyStore;