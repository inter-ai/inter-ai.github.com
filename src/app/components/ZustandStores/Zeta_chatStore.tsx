import {create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface Chat {
    chat: string[]
    addChat: (message: string) => void
}

export const useZeta_chatStore = create<
Chat,
any
>(
    // devtools(
    //     persist(
            (set) => ({
                chat: [],
                addChat: (message) => set((state) => ({ chat: [...state.chat, message] })),
            }),
            // {
            //     name: 'text-store', // key used in localStorage
            // }
    //     )
    // )
)