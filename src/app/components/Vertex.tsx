/**
 * 
 * @returns 
 */
interface Vertex {
  x: number;
  y: number;
}
import { useState, useEffect} from 'react';
import useGraphStore from './ZustandStores/GraphStore';
export default function Vertex(props: { index: number, scale: number }) {
    const {vertices, names,  setVertex, setName} = useGraphStore();
    const [offset, setOffset] = useState({ x: vertices[props.index].x, y: vertices[props.index].y  }); // For panning
    const [isDragging, setIsDragging] = useState(false);
    const [mouseStartPosition, setmouseStartPosition] = useState({ x: 0, y: 0 });

    const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
      setName(props.index, e.target.value);
  }

    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent event propagation to the map
      setIsDragging(true);
      setmouseStartPosition({ x: e.clientX/props.scale - offset.x, y: e.clientY/props.scale - offset.y });
    };
    
      useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;
          const newOffset = {
            x: e.clientX/props.scale - mouseStartPosition.x,
            y: e.clientY/props.scale - mouseStartPosition.y,
          };
        
          // Update the position in the store
          setVertex(props.index, newOffset); // Pass newOffset directly to setVertex
        
          // Update the local state to reflect the movement in the UI
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
    
      return (
        <div
          className=" absolute"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) translate(-50%, -8px)`,
            transformOrigin: 'center',
          }}
        >
          <div className=' items-center content-center'>
          {/* Box */}
            <center>
              <div className=' w-[16px] h-[16px] bg-c40 hover:bg-c00 rounded-full'
                onMouseDown={handleMouseDown}
                >
              </div>
              <input 
                type="text"
                value={names[props.index]}
                onChange={changeName}
                placeholder="Enter name here"
                className=' text-c40 text-center bg-transparent'
              >
                
              </input> 
            </center>
          </div>

        </div>
      );
}