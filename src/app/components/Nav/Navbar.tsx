'use client'
//N
//The bar that will be present in pretty much all web pages. Composed of one master navfolder
/*TODO
Takes parameter of page location to create a top bar that display all page children for quick access
Display 
Rename to Document

*/
// import Link from "next/link";
import React, { useState, useEffect } from "react";
// import NavFolder from "../Archived/NavFolder";
// import NavItem from "../Archived/NavItem";
import ToggleTheme from "../ToggleTheme";
// import { pathState } from "./Path";
import { usePathStore } from "./Path";
import Node from "./Node";
import EndNode from "./EndNode";
// import { useRouter } from 'next/navigation';
// import { navigation}
export default function Navbar() {
  
  const [open, setOpen] = useState(false); //if the map is opened
  const {activePath, addActivePath} = usePathStore();
  // const router = useRouter();
  const currentUrl = window.location.pathname;
  /**
   * Below is the master hierarchy and it manages everything
   * NodeStructure: 
   *  ID : {Name, Url,..., children}
   * PathStructure:
   *  Node, Node, FinalNode
   */
  const map :any = {c:[
    {n:"HOME", l:"/", c:[
      {n:"EDITOR", l:"/editor"}
    ]}
  ]};
  function getPath(){
    const urlPath = currentUrl.substring(currentUrl.indexOf("/"));
    // console.log(urlPath);
    function dfs(node:any, curPath:number[]){
      if ((node.l) === urlPath){
        return curPath
      }
      if (node.c){ //if have children
        for (let i = 0; i < node.c.length; i++){
          let childResult : any = dfs(node.c[i], curPath.concat(i));
          if (childResult != false){
            return childResult;
          }
        }
      }
      return false;
    }
    
    return dfs(map.c[0], [0]); //start at home
  }
  const path = getPath();
  function getChildren(){ //get childrenNodes of the current absolute file path
    var curNode = map;
    for (let i = 0; i < path.length; i++){
      curNode = curNode.c[path[i]];
    }
    return curNode.c;
  }
  function renderChildren(){
    // console.log(getPath());
    // Prep immediate children list to render
    // setPath(getPath());
    var childrenNodes = getChildren();
    var childrenLinks : any[] = [];
    if (childrenNodes != undefined){
      for (let i = 0; i < childrenNodes.length; i++){
        childrenLinks.push(
          <div key={i} className=" h-fit">
            <EndNode name={childrenNodes[i].n} link={childrenNodes[i].l} path={path.concat(i)} ></EndNode>
          </div>
        );
      }
    }
    return childrenLinks
  }
  function getColums(){
    console.log(activePath);
    let colums: any[] = [];
    // Prep nodes list to render
    if (open){  //transform into list of nodes for render
      let curNode = map; //starts at origin Node
      let path :Array<number> = []; //origin have no path
  
      for (let i = 0; i < activePath.length; i++){
        let branch = activePath[i];
        curNode = curNode.c[branch];
        path.push(branch); //at this location
        let colum : any[] = [];
        curNode.c.forEach((node :any, index: number) => {
          // Check for cases of children
          // if (i < activePath.length-1 && index === activePath[i+1]) { //if is a node in path
          //     colum.push(
          //       <Node name={node.n} link={node.l} isInPath={true} path={path.concat([index])}></Node>
          //     );
          // }
          // else 
          if (node.c){ //if have children
            colum.push(
              <Node key={index} name={node.n} link={node.l} path={path.concat([index])}></Node>
            );
          }
          else{ //if is endnode
            colum.push(
              <EndNode key={index} name={node.n} link={node.l} path={path.concat([index])}></EndNode>
            );
          }
          
        });
        colums.push(colum);
      };
    }
    return colums
  }
  function renderColums(){ //render each colum by returning children of all colums not root
    let colums: any = getColums();
    let everything : any = []; //al colums
    colums.forEach((colum:any, colIndex: number) =>{ //for each column, add column into everything
      let cl:any = [];
      colum.forEach((node:any) => {
        cl.push(node);
      });    
      everything.push(<div key={colIndex} className=" flex" >
        <div>
        {cl}
        </div>
        <div className=" flex h-[100%] items-center"><div className=" border-r-[1px] border-cc0 h-[calc(100%-1rem)] relative"></div></div>
      </div>);
    })
    return <div className=" flex">
      {
        everything
      }
    </div>;
  }
  return (
      <div className={"flex first z-10 w-full bg-opacity-50 border-b-[1px] border-cc0 overflow-scroll scrollbar-hide"}>

        {/* First column and Root node */}
        <div className=" flex" onClick={()=>setOpen(!open)} > 
          <Node name = "HOME" link="/" path={[0]}/>
          <div className=" flex h-[100%] items-center"><div className=" border-r-[1px] border-cc0 h-[calc(100%-1rem)] relative"></div></div>
          
        </div>
        {/* Colums */}
        <div>
          {renderColums()}
        </div>
        {/* Immediate Children */}
        
        <div className=" flex ml-auto items-center ">
          {/* <div className=" flex h-[100%] items-center"><div className=" border-r-[1px] border-cc h-[calc(100%-1rem)] relative"></div></div> */}
          {renderChildren()}
          <div className=" flex w-[4rem] items-center justify-center">
            <ToggleTheme></ToggleTheme>
          </div>
        </div>
        {/* DarkModeButton */}
        {/* <div className=" flex w-[4rem] h-full items-center justify-center ">
        
          
        </div> */}
      </div>
  );
}






// }
// function getNode(child: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined){ //return the nodes
//   // console.log(typeof child);
//   const [activePath, setActivePath] = useRecoilState(activePathState);
//   if (typeof child === 'string' ){
//     return (
//     <li className=" text-c0">
//       {child}
//     </li>
//     );
//   } 
//   else {
//     return (
//     <li className=" text-c0 hover:bg-c8Blue" >
//       {child}
//     </li>
//     );
//   }
// }