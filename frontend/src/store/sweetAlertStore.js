import {create} from 'zustand';

const sweetAlertStore = create((set) => ({
    showAlert: false,
    setShowAlert: (showAlert) => set({ showAlert }),
}));

export default sweetAlertStore