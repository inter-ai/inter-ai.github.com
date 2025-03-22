import {create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ActionBarStore {
    width:number
    setWidth: (newWidth: number) => void
}

export const useActionBarStore = create<
ActionBarStore, any
>(
    devtools(
        persist(
            (set) => ({
                width: window.innerWidth - window.innerHeight,
                setWidth: (width) => set({ width }),
            }),
            {
                name: 'actionBar-store', // key used in localStorage
            }
        )
    )
)