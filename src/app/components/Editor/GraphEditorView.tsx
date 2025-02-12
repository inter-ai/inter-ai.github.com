/**
 * 
 * @returns 
 */
import React from "react";
import MapCanvas from "./MapCanvas";
import useGraphStore from '../ZustandStores/GraphStore';
export default function ActionBar() {
    const {addVertex, setIsDrawingEdge, setIsDrawingEdgeRemaining, isDrawingEdge} = useGraphStore();
    const addVertexRandom = () => {
        // alert("hi");
        addVertex({x:0,y:0}, "empty");
    }
    const addConnection = () => {
        setIsDrawingEdge(!isDrawingEdge);
        setIsDrawingEdgeRemaining(2);
    }
    return (
        <div className="w-full h-full">
            <MapCanvas></MapCanvas>
            {/* Tool bar */}
            <div className=" absolute top-0 left-0 w-full h-[6.25vh] ">
                <div className=" relative">
                    <div className=" absolute top-0 left-0 h-full w-full opacity-20 bg-c00 bg-opacity-5 pointer-events-none"></div>
                    <button onClick={addVertexRandom} className=" w-[6.25vh] h-[6.25vh]">
                        <svg viewBox="0 0 32 32" className=" fill-c80 hover:fill-c00" xmlns="http://www.w3.org/2000/svg">
                            <mask id="add-mask">
                                <rect width="200" height="200" fill="white"/>
                                <line x1="12" y1="16" x2="20" y2="16" stroke="black" strokeLinecap="round" strokeWidth="1.5" />
                                <line x1="16" y1="12" x2="16" y2="20" stroke="black" strokeLinecap="round" strokeWidth="1.5" />

                                {/* <line x1="20" y1="16" x2="16" y2="12" stroke="black" strokeLinecap="round" stroke-width="1.5" />
                                <line x1="20" y1="16" x2="16" y2="20" stroke="black" strokeLinecap="round" stroke-width="1.5" /> */}
                            </mask>
                            <circle r="12" cx="16" cy="16" mask="url(#add-mask)"></circle>
                        </svg>
                    </button>
                    <button onClick={addConnection} className=" w-[6.25vh] h-[6.25vh]">
                        <svg viewBox="0 0 32 32" className={`fill-${isDrawingEdge ? 'c40' : 'c80'} hover:fill-c00`} xmlns="http://www.w3.org/2000/svg">
                            
                            <mask id="arrow-mask">
                                <rect width="200" height="200" fill="white"/>
                                <line x1="12" y1="16" x2="20" y2="16" stroke="black" strokeLinecap="round" strokeWidth="1.5" />
                                <line x1="20" y1="16" x2="16" y2="12" stroke="black" strokeLinecap="round" strokeWidth="1.5" />
                                <line x1="20" y1="16" x2="16" y2="20" stroke="black" strokeLinecap="round" strokeWidth="1.5" />
                            </mask>
                            <circle r="12" cx="16" cy="16" mask="url(#arrow-mask)"></circle>
                            
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    ) 
}