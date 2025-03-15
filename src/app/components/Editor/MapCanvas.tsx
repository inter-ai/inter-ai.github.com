import { useCallback, useEffect, useRef, useState } from 'react';
import useGraphStore from '../ZustandStores/GraphStore';
import React from "react";
// console.log(tailwindConfig.theme.extend.colors?.c00);
const Map:React.FC = ()=> {
  const vertRadius = 8;
  const edgeMinLen = 64;
  // let drawnEdgeAIndex = 0;
  // const drawnEdgeBIndex = 0;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1); // For zoom
  const [drawnEdgeAIndex, setDrawnEdgeAIndex] = useState(0); // For previous node memory

  const [offset, setOffset] = useState({ x: 0, y: 0 }); // For panning
  const [isPanning, setisPanning] = useState(false);
  const [draggedVertex, setdraggedVertex] = useState(-1); // For zoom
  const [mouseStartPosition, setmouseStartPosition] = useState({ x: 0, y: 0 });
  const {vertices, edges, setVertex, addEdge, isDrawingEdge, isDrawingEdgeRemaining, setIsDrawingEdgeRemaining} = useGraphStore();
  // const getTailwindColor = (tailwindCode:string) => {
  //   const div = document.createElement("div");
  //   div.className = "bg-"+tailwindCode+" "; // Apply Tailwind color
  //   document.body.appendChild(div);
  //   const color = window.getComputedStyle(div).backgroundColor;
  //   document.body.removeChild(div);
  //   // color.substring(color.lastIndexOf(","))=1;
  //   console.log(color);
  //   return color;
  // };
  // function getThemeVariable(variableName: string): string {
  //   const rootStyle = getComputedStyle(document.documentElement);
  //   print(rootStyle)
  //   return rootStyle.getPropertyValue(variableName);
  // }
  interface Position {
    x: number;
    y: number;
  }
  const getCanvasRect = () => {
    const canvasPostition = canvasRef.current!.getBoundingClientRect();
    // console.log(canvasPostition);
    return canvasPostition;
  }
  // const getCanvasRect = () => {
  //   if (canvasRef.current) {
  //     canvasRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       console.log('Rect:', { x, y, width, height, pageX, pageY });
  //     });
  //   }
  // };
  const screenToMapPos = (
    screenPos: Position,
    // offset: Position,
    // scale: number
  ): Position => {
    
    return {
      x: (screenPos.x - getCanvasRect().left - offset.x * scale) / scale,
      y: (screenPos.y - getCanvasRect().top - offset.y * scale) / scale,
    };
  };
  const getTailwindColor = (variable: string) => {
    const rootStyle = getComputedStyle(document.documentElement);
    const color = rootStyle.getPropertyValue(variable);
    // console.log(color);
    return color;
  };

  const applySpringForces = () => {
    vertices.forEach((v1, i) => {
      vertices.forEach((v2, j) => {
        if (i !== j) {
          const dx = v2.x - v1.x; //Vector from v1 to v2
          const dy = v2.y - v1.y;
          const distance = Math.sqrt(dx * dx + dy * dy); // Avoid division by zero
          const a = -(edgeMinLen-distance)/100; //in the direction of dx,dy
          if (distance < vertRadius){
            v1.x-=vertRadius;
          }
          else if ((distance) < edgeMinLen){
            v1.x += dx/distance * a ;
            v1.x += dy/distance * a;
            v2.x += -dx/distance * a;
            v2.y += -dy/distance * a;
          }
          // if ((distance) > 110){
          //   v1.x += dx/1000000* distance;
          //   v1.x += dy/1000000* distance;
          //   v2.x -= dx/1000000* distance;
          //   v2.y -= dy/1000000* distance;
          // }
          // const force = k * (distance - restLength);
          // const fx = (force * dx) / distance;
          // const fy = (force * dy) / distance;
  
          // Apply force (Newton's second law: F = ma)
          // v1.vx += fx / v1.mass;
          // v1.vy += fy / v1.mass;
          // v2.vx -= fx / v2.mass; // Opposite reaction
          // v2.vy -= fy / v2.mass;
          
        }
      });
    });
  }

  const drawGraph = useCallback(() => {
    applySpringForces();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // console.log("drawing");

    // ctx.beginPath();

    // ctx.moveTo(0, 0);
    // ctx.lineTo(200, 100);
    // ctx.stroke();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getTailwindColor("--color-80");
    ctx.save();


    // ctx.save();
    
    // ctx.translate(offset.x, offset.y);
    // ctx.scale(scale, scale);

    // Draw edges (lines between nodes)
    ctx.strokeStyle = getTailwindColor("--color-80");
    ctx.lineWidth = 2;
    edges.forEach((edge) => {
      const start = vertices[edge.nodeIndexA];
      const end = vertices[edge.nodeIndexB];
      if (!start || !end) return;
      ctx.beginPath();
      ctx.moveTo((start.x + offset.x)*scale, (start.y + offset.y)*scale);
      ctx.lineTo((end.x+ offset.x)*scale, (end.y+ offset.y)*scale);
      ctx.stroke();
    });

    // Draw nodes
    vertices.forEach((vertex) => {
      ctx.beginPath();
      ctx.arc((vertex.x+ offset.x)*scale, (vertex.y+ offset.y)*scale, vertRadius*scale, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }, [vertices, edges, scale, offset]);

  const handleWheel = (e:React.WheelEvent<HTMLCanvasElement>) => {
    /**
     * When zooming, you want to make the center consistent
     * Approximating method: make the viewport top-left consistent
     * - the newCoordinate of the viewPort is offset/zoom
     * - the returing amount is newCor-oldCor = oldCor*offset/zoom-oldCor
     * - the updatedCoordinateis = oldCor-(oldCor*offset/zoom-oldCor)=2oldCor-oldCor*offset/zoom)
     */
    // e.preventDefault();
    const zoomFactor = 0.1;
    const calculateZoomFactor = Math.min(Math.max(scale - e.deltaY * zoomFactor * 0.01,0.5),2)
    const mousePosition = screenToMapPos({x:e.clientX,y:e.clientY});
    //(mouse+offset)*scale=(mouse+offset')*scale'
    //(mouse+offset)*scale/scale'-mouse=offset'
    setOffset({x:(mousePosition.x+offset.x)*scale/calculateZoomFactor-mousePosition.x   ,
      y:(mousePosition.y+offset.y)*scale/calculateZoomFactor-mousePosition.y})
    setScale(calculateZoomFactor); // Limits zoom between 0.5x and 2x
    
    
  };

  const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
        // e.preventDefault();
        // e.stopPropagation(); // Prevent event propagation to the map
        const mousePosition = screenToMapPos({x:e.clientX,y:e.clientY});
        let clickedOnVert = false;
        // console.log(mousePosition);
        vertices.forEach((vert, vertIndex)=>{
          // console.log(vert);
          if (Math.abs(mousePosition.x - vert.x) <= vertRadius && Math.abs(mousePosition.y-vert.y) <= vertRadius ){
            if (isDrawingEdge){
            //Drawing a new edge case
              if (isDrawingEdgeRemaining == 2){ 
                console.log("clicked edge A");
                setIsDrawingEdgeRemaining(1);
                setDrawnEdgeAIndex( vertIndex);
              }
              else {
                console.log("clicked edge B");
                const nia=Math.min(drawnEdgeAIndex,vertIndex);
                const nib=Math.max(drawnEdgeAIndex,vertIndex);

                // let newEdge = {nodeIndexA:drawnEdgeAIndex, nodeIndexB:vertIndex};
                // let newEdge1 = {nodeIndexA:vertIndex, nodeIndexB:drawnEdgeAIndex};
                // console.log("add edge "+drawnEdgeAIndex+" "+vertIndex);

                if ( !edges.some(obj => obj.nodeIndexA === nia && obj.nodeIndexB === nib)){
                  addEdge(nia,nib);
                  console.log(edges);
                  setIsDrawingEdgeRemaining(2);
                }
                

                // setIsDrawingEdge(false);
              }
            }
            setdraggedVertex(vertIndex);
            // console.log("clicked on vert"+vertIndex);

            clickedOnVert=true;
          }
        });
        if (!clickedOnVert){
          setisPanning(true);
          // setmouseStartPosition({ x: e.clientX/scale - offset.x, y: e.clientY/scale - offset.y });
          setmouseStartPosition(mousePosition);
        }
       
  };
      
  const handleMouseUp = () => {
    setisPanning(false);
    setdraggedVertex(-1);
    // setVertex(props.index, offset);
  };
  const handleMouseMove = (e:React.MouseEvent<HTMLCanvasElement>) => {
      
    const mousePosition = screenToMapPos({x:e.clientX,y:e.clientY});
    const newOffset = {
      // x: e.clientX/scale - mouseStartPosition.x,
      // y: e.clientY/scale - mouseStartPosition.y,
      x: offset.x+ mousePosition.x - mouseStartPosition.x,
      y: offset.y+ mousePosition.y - mouseStartPosition.y,
    };
    if (isPanning){
      setOffset(newOffset);
    }
    if (draggedVertex != -1){
      // console.log("sv");
      setVertex(draggedVertex, mousePosition);
    }
  };
  // useEffect(() => {
    

    

  //   if (isPanning || draggedVertex != -1) {
  //     // Attach listeners to the document when dragging starts
  //     document.addEventListener("mousemove", handleMouseMove);
  //     document.addEventListener("mouseup", handleMouseUp);
  //   }

  //   return () => {
  //     // Cleanup listeners when dragging stops or component unmounts
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // });
  const animate = () => {
    drawGraph();
    requestAnimationFrame(animate);
  };
  animate();
  //Animation loop
  // useEffect(() => {
  //   const animate = () => {
  //     drawGraph();
  //     requestAnimationFrame(animate);
  //   };
  //   animate();
  // }, [drawGraph]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = getCanvasRect();
  
      // Match the internal drawing size to the displayed size
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    // drawGraph();
  }, [scale, offset]); // Run this when resizing, zooming, or panning

  return (
    <canvas
      ref={canvasRef}
      // width={window.innerWidth}
      // height={window.innerHeight}
      className=" w-full h-full bg-cc0"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
}

export default Map;