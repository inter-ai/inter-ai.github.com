import { useCallback, useEffect, useRef, useState } from 'react';
import Vertex from './Vertex';
import useGraphStore from '../ZustandStores/GraphStore';
import Line from './Line';
import React from "react";
import tailwindConfig from "../../../../tailwind.config";
import { off } from 'process';
// console.log(tailwindConfig.theme.extend.colors?.c00);
const Map:React.FC = ()=> {
  const vertRadius = 5;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1); // For zoom
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // For panning
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStartPosition, setmouseStartPosition] = useState({ x: 0, y: 0 });
  const {vertices, edges} = useGraphStore();
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
    var canvasPostition = canvasRef.current!.getBoundingClientRect();
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

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // console.log("drawing");

    // ctx.beginPath();

    // ctx.moveTo(0, 0);
    // ctx.lineTo(200, 100);
    // ctx.stroke();

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.save();
    
    // ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw edges (lines between nodes)
    ctx.strokeStyle = getTailwindColor("--color-80");
    ctx.lineWidth = 2;
    edges.forEach((edge) => {
      const start = vertices[edge.nodeIndexA];
      const end = vertices[edge.nodeIndexB];
      if (!start || !end) return;
      // ctx.beginPath();
      ctx.moveTo(start.x + offset.x, start.y + offset.y);
      ctx.lineTo(end.x+ offset.x, end.y+ offset.y);
      ctx.stroke();
    });

    // Draw nodes
    ctx.fillStyle = getTailwindColor("--color-80");
    vertices.forEach((vertex) => {
      ctx.beginPath();
      ctx.arc(vertex.x+ offset.x, vertex.y+ offset.y, vertRadius, 0, Math.PI * 2);
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
    const calculateZoomFactor = scale - e.deltaY * zoomFactor * 0.01
    setScale(Math.min(Math.max(calculateZoomFactor,0.5), 2)); // Limits zoom between 0.5x and 2x

  };

  const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
        // e.preventDefault();
        // e.stopPropagation(); // Prevent event propagation to the map
        var mousePosition = screenToMapPos({x:e.clientX,y:e.clientY});
        var clickedOnVert = false;
        console.log(mousePosition);
        vertices.forEach((vert)=>{
          console.log(vert);
          if (Math.abs(mousePosition.x - vert.x) <= vertRadius && Math.abs(mousePosition.y-vert.y) <= vertRadius ){
            console.log("clicked on vert");
            clickedOnVert=true;
          }
        });
        if (!clickedOnVert){
          setIsDragging(true);
          // setmouseStartPosition({ x: e.clientX/scale - offset.x, y: e.clientY/scale - offset.y });
          setmouseStartPosition(mousePosition);
        }
       
  };
      
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      var mousePosition = screenToMapPos({x:e.clientX,y:e.clientY});
      const newOffset = {
        // x: e.clientX/scale - mouseStartPosition.x,
        // y: e.clientY/scale - mouseStartPosition.y,
        x: offset.x+ mousePosition.x - mouseStartPosition.x,
        y: offset.y+mousePosition.y - mouseStartPosition.y,
      };
      setOffset(newOffset);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // setVertex(props.index, offset);
    };

    if (isDragging) {
      // Attach listeners to the document when dragging starts
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      // Cleanup listeners when dragging stops or component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = getCanvasRect();
  
      // Match the internal drawing size to the displayed size
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    drawGraph();
  }, [scale, offset, drawGraph]); // Run this when resizing, zooming, or panning

  return (
    <canvas
      ref={canvasRef}
      // width={window.innerWidth}
      // height={window.innerHeight}
      className=" w-full h-full bg-cc0"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    />
  );
}

export default Map;