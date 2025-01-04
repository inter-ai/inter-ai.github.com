import {create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface Text {
    text:string
    setText: (text: string) => void
}

export const useTextStore = create<
Text,
any
>(
    // devtools(
    //     persist(
            (set) => ({
                text: "",
                setText: (text) => set({ text }),
            }),
            // {
            //     name: 'text-store', // key used in localStorage
            // }
    //     )
    // )
)