/**
 * 
 * @returns 
 */
import React from "react";
import Map from "./Map";
import useGraphStore from './ZustandStores/GraphStore';
export default function ActionBar() {
    const {addVertex} = useGraphStore();
    const addVertexRandom = () => {
        // alert("hi");
        addVertex({x:2048,y:2048}, "empty");
    }
    return (
        <div className="w-full h-full">
            <Map></Map>
            {/* Tool bar */}
            <div className=" absolute top-0 left-0 w-full h-[6.25vh] opacity-50">
                <button onClick={addVertexRandom} className=" w-[6.25vh] h-[6.25vh]">
                    <svg viewBox="0 0 24 24" className=" fill-c40 hover:fill-c00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"></path> </g></svg>
                </button>
                {/* {vertices[-1].x}{vertices[-1].y} */}
                
            </div>
        </div>
    ) 
}