// interface Vertex {
//     x: number;
//     y: number;
// }
// import { useState, useEffect, useRef} from 'react';
import useGraphStore from '../ZustandStores/GraphStore';
import React from "react";

export default function Line(props: { iA: number, iB: number }) {
    const {vertices} = useGraphStore();
    // const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (canvas) {
    //     const ctx = canvas.getContext('2d');
    //     if (ctx) {
    //         // Clear the canvas before drawing
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);

    //         // Draw the line
    //         ctx.beginPath();
    //         ctx.moveTo(vertices[ props.iA].x, vertices[ props.iA].y);
    //         ctx.lineTo(vertices[ props.iB].x, vertices[ props.iB].y);
    //         ctx.stroke();
    //     }
    //     }
    // }, [vertices, edges]);

    // return <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />;
    return (
    <div className=" absolute left-0 top-0 pointer-events-none">
        <svg width="4096px" height="4096px" xmlns="http://www.w3.org/2000/svg">
            <line className="stroke-c40" x1={vertices[ props.iA].x} y1={vertices[ props.iA].y} x2={vertices[ props.iB].x} y2={vertices[ props.iB].y} strokeWidth="2" />
        </svg>
    </div>
    );
}