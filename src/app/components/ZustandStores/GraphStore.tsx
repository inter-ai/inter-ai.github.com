import {create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface Vertex {
    x: number;
    y: number;
}

interface Edge {
nodeIndexA: number;
nodeIndexB: number;
}

interface GraphStore {
vertices: Vertex[];
edges: Edge[];
names: string[];
isDrawingEdge: boolean; //editing mode
isDrawingEdgeRemaining: number;
setVertex: (index : number, newPosition : Vertex) => void;
addVertex: (node: Vertex, name: string) => void;
addEdge: (nodeIndexA: number, nodeIndexB: number) => void;
removeVertex: (index: number) => void;
removeEdge: (nodeIndexA: number, nodeIndexB: number) => void;
setName: (index: number, name: string) => void;
setIsDrawingEdge: (newVal: boolean) => void;
setIsDrawingEdgeRemaining: (newVal: number) => void;
}

const useGraphStore = create<GraphStore>((set) => ({
vertices: [{x:0,y:0}, {x:0+834,y:0+697}],
edges: [{nodeIndexA: 0, nodeIndexB: 1}],
names: ["start","end"],
isDrawingEdge: false,
isDrawingEdgeRemaining: 0,
setVertex: (index, newPosition) =>
    set((state) => {
        const updatedVertices = [...state.vertices];
        updatedVertices[index] = newPosition;
        return { vertices: updatedVertices };
      }),
addVertex: (node, name) =>
    set((state) => ({
        vertices: [...state.vertices, node],
    names: [...state.names, name],
    })),
addEdge: (anodeIndexA, anodeIndexB) =>
    set((state) => {
        if (anodeIndexA < anodeIndexB) {
            return {
                edges: [...state.edges, { nodeIndexA: anodeIndexA, nodeIndexB: anodeIndexB }]
            };
        }
        return state;
    }),
removeVertex: (index) =>
    set((state) => {
    const newNodes = state.vertices.filter((_, i) => i !== index);
    const newEdges = state.edges.filter(
        (edge) => edge.nodeIndexA !== index && edge.nodeIndexB !== index
    );
    const newNames = state.names.filter((_, i) => i !== index);

    return { vertices: newNodes, edges: newEdges, names: newNames };
    }),
removeEdge: (nodeIndexA, nodeIndexB) =>
    set((state) => ({
    edges: state.edges.filter(
        (edge) =>
        !(
            (edge.nodeIndexA === nodeIndexA && edge.nodeIndexB === nodeIndexB) ||
            (edge.nodeIndexA === nodeIndexB && edge.nodeIndexB === nodeIndexA)
        )
    ),
    })),
setName: (index, newName) =>
    set((state) => {
        const updatedNames = [...state.names];
        updatedNames[index] = newName;
        return { names: updatedNames };
        }),
setIsDrawingEdge: (newVal) =>
    set((state) => ({
        isDrawingEdge: newVal
        })),
setIsDrawingEdgeRemaining: (newVal) =>
    set((state) => ({
        isDrawingEdgeRemaining: newVal
        })),
}));

export default useGraphStore;