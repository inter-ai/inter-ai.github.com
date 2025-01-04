/**
 * 
 * @returns 
 */
import React from "react";

export default function NavItem(props: { name: any }) {

    return (
        <div className=" hover:bg-cc0 text-c40 h-[2rem] content-center pl-2">
            {props.name}
        </div>
    ) 
}