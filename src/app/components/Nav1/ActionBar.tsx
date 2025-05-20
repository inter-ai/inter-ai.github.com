/**
 * 
 * @returns 
 */
"client side"
import { ReactNode } from "react";
import { useActionBarStore } from "../ZustandStores/ActionBarStore";

export default function ActionBar({ children }: { children: ReactNode | null}) {
    const {width} = useActionBarStore();
    return (
        <div style={{ width: width+"px" }} className={` bg-cff text-c00 h-full overflow-hidden border-cc0 border-r-[2px]`}>
            {/* {window.innerHeight}
            {window.innerWidth}
            {width} */}
            {/* <button onClick={reset}>Reset</button> */}
            <div className=" w-full">
            {children}
            </div>
        </div>
    ) 
}