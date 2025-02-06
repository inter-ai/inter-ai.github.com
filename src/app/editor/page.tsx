'use client'
import React from 'react';
import RecordingView from "../components/Editor/RecordingView";
// import ToggleTheme from "./components/ToggleTheme";
import NavBar from './../components/NavBar';
// import Map from './components/Map';
import Textbox from './../components/Textbox';
import GraphEditorView from '../components/Editor/GraphEditorView';
export default function Home() {
  return (
    <>
    
  <div className="flex min-h-screen flex-col items-center bg-transparent">
    <RecordingView/>
  </div>
  {/* <div  className = "absolute top-0 left-0 w-fit h-fit"> */}
  <div className=' absolute left-0 top-0 md:w-[12.5vw] w-[25vw] h-[87.5vh]'>
    <NavBar></NavBar>
  </div>
  <div className=' absolute md:left-[12.5vw] left-[25vw] top-0 md:w-[87.5vw] w-[75vw] h-[87.5vh]'>
    <GraphEditorView></GraphEditorView>
  </div>
  <div className=' absolute md:left-[12.5vw] left-[25vw] top-[87.5vh] md:w-[87.5vw] w-[75vw]'>
    <Textbox>

    </Textbox>
  </div>
     
    </>
  );
}
