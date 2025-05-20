import {create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ActionBarStore {
    width:number
    setWidth: (newWidth: number) => void
    reset:()=>void
}

export const useActionBarStore = create<
ActionBarStore, any
>(
    devtools(
        persist(
            (set) => ({
                width: typeof window !== "undefined" 
                ? window.innerWidth - window.innerHeight 
                : 500, // Default fallback for SSR
                setWidth: (width) => set({ width }),
                reset: () => {
                    localStorage.removeItem("action-bar-store"); // Clear storage
                    set({ width: window.innerWidth - window.innerHeight }); // Reset state
                  },
            }),
            {
                name: 'action-bar-store', // key used in localStorage
            }
        )
    )
)
