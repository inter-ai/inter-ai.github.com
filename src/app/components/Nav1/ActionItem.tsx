/**
 * 
 * @returns 
 */
import React from "react";

export default function NavItem(props: { name: any , link: string}) {

    return (
        <div className=" w-full hover:bg-cc0 text-c40 h-[2rem] flex items-center px-2" onClick={() => window.open(props.link, "_self")}>
        {/* <Link className=" hover:bg-cc0 text-c40 h-[2rem] w-full " href={props.link} > */}
            {props.name}
        {/* </Link> */}
        </div>
    ) 
}