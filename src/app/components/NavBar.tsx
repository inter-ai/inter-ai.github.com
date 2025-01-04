import NavItem from "./NavItem";
import ToggleTheme from "./ToggleTheme";
import React from "react";

/**
 * 
 * @returns 
 */
export default function NavBar() {

    return (
        <div className=" absolute bg-cff w-full h-full left-0 top-0 ">
            <div className=" relative h-[12.5%] content-center">
                {/* <div className=" "> */}
                <center className=" my-2">
                    <ToggleTheme></ToggleTheme>
                </center>
                <div>
                    <NavItem name={"chat0"}></NavItem>
                    <NavItem name={"chat1"}></NavItem>
                </div>
                {/* </div> */}

            </div>
        </div>
    ) 
}