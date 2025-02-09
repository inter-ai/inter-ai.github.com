// import { useEffect, useState } from 'react';
// import Vertex from './Vertex';
// import useGraphStore from '../ZustandStores/GraphStore';
// import Line from './Line';
// import React from "react";


// const Map:React.FC = ()=> {
//   const [scale, setScale] = useState(1); // For zoom
//   const [offset, setOffset] = useState({ x: -2048, y: -2048 }); // For panning
//   const [isDragging, setIsDragging] = useState(false);
//   const [mouseStartPosition, setmouseStartPosition] = useState({ x: 0, y: 0 });
//   const {vertices, edges} = useGraphStore();


//   const handleWheel = (e:React.WheelEvent<HTMLDivElement>) => {
//     /**
//      * When zooming, you want to make the center consistent
//      * Approximating method: make the viewport top-left consistent
//      * - the newCoordinate of the viewPort is offset/zoom
//      * - the returing amount is newCor-oldCor = oldCor*offset/zoom-oldCor
//      * - the updatedCoordinateis = oldCor-(oldCor*offset/zoom-oldCor)=2oldCor-oldCor*offset/zoom)
//      */
//     // e.preventDefault();
//     const zoomFactor = 0.1;
//     const calculateZoomFactor = scale - e.deltaY * zoomFactor * 0.01
//     setScale(Math.min(Math.max(calculateZoomFactor,0.5), 2)); // Limits zoom between 0.5x and 2x

//   };

//   const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
//         // e.preventDefault();
//         // e.stopPropagation(); // Prevent event propagation to the map
//         setIsDragging(true);
//         setmouseStartPosition({ x: e.clientX/scale - offset.x, y: e.clientY/scale - offset.y });
//       };
      
//         useEffect(() => {
//           const handleMouseMove = (e: MouseEvent) => {
//             if (!isDragging) return;
//             const newOffset = {
//               x: e.clientX/scale - mouseStartPosition.x,
//               y: e.clientY/scale - mouseStartPosition.y,
//             };
//             setOffset(newOffset);
//           };
      
//           const handleMouseUp = () => {
//             setIsDragging(false);
//             // setVertex(props.index, offset);
//           };
      
//           if (isDragging) {
//             // Attach listeners to the document when dragging starts
//             document.addEventListener("mousemove", handleMouseMove);
//             document.addEventListener("mouseup", handleMouseUp);
//           }
      
//           return () => {
//             // Cleanup listeners when dragging stops or component unmounts
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//           };
//         });

//   return (
//     <div
//       className="w-full h-full overflow-hidden relative bg-cc0"
//       onWheel={handleWheel}
//     //   onMouseMove={handleMouseMove}
//       onMouseDown={handleMouseDown}
//     //   onMouseUp={handleMouseUp}
//     //   onMouseLeave={handleMouseUp}
//     >
//       <div
//         className="absolute w-[4096px] h-[4096px]"
//         // className="absolute w-screen h-screen bg-[url('/grid.webp')] bg-repeat"
//         style={{
//           transform: `translate(${offset.x*scale}px, ${offset.y*scale}px) scale(${scale})`,
//           transformOrigin: 'top left',
//         }}
//       >
//         <div className=' relative'>
//         {edges.map((edge, index) => (
//             // <div>{vertex.x}</div>
//             <Line key={index} iA={edge.nodeIndexA} iB={edge.nodeIndexB}></Line>
//         ))}
       

//         {vertices.map((vertex, index) => (
//             // <div>{vertex.x}</div>
//             <Vertex key={index} index={index} scale={scale}></Vertex>
//         ))
//         }
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Map;