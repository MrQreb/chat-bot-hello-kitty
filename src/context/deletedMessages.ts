import { create } from 'zustand'

interface DeletedMessagesState {
    isDeleted: boolean;
    setDeleted: (deleted: boolean) => void;
}

const useDeletedMessagesStore = create<DeletedMessagesState>((set) => ({
    isDeleted: false,
    setDeleted: (deleted) => set({ isDeleted: deleted }),
}));

export default useDeletedMessagesStore;