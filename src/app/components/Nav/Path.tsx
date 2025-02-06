//Store nav path data
// import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
// const { persistAtom } = recoilPersist();
// export const pathState = atom({ key: "pathState", default: [0] });

// export const activePathState = atom({ key: "activePathState", default: [0], effects: [persistAtom] });


import {create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GenerationState {
    activePath: Array<number>
    setActivePath: (newActivePath: Array<number>) => void
    addActivePath: (newNode: number) => void
    clearActivePath: () => void
}

export const usePathStore = create<
GenerationState,
any
>(
    devtools(
        persist(
            (set) => ({
                activePath: [0],
                setActivePath: (newActivePath : Array<number>) => set({ activePath:newActivePath }),
                addActivePath: (newNode) => set((state)=>({ activePath:[...state.activePath, newNode] })),
                clearActivePath: () => set({ activePath:[] }),
                
            }),
            {
                name: 'nav-path', // key used in localStorage
            }
        )
    )
)