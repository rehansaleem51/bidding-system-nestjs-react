import {create} from 'zustand';

const spinnerStore = create((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default spinnerStore