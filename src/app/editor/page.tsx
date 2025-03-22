'use client'
import React, { useEffect } from 'react';
import RecordingView from "../components/Editor/RecordingView";
// import ToggleTheme from "./components/ToggleTheme";
import Navbar from '../components/Nav/Navbar';
// import Map from './components/Map';
import Textbox from './../components/Textbox';
import GraphEditorView from '../components/Editor/GraphEditorView';
import Head from "next/head";
import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function Home() {
  const fetchResults = async () => {
      try {
        // fetch("http://localhost:8000/items").then((res) => res.json())
        // .then((data) => setAgents(data));
        const response = await axios.get(`${API_BASE_URL}/environment/kg/dump`);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    useEffect(() => {
      fetchResults();

    });
return (
<>
<Head>
    <title>Editor</title>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    />
    <link rel="icon" href="/favicon.png" />
</Head>
<div className=' flex flex-col h-screen'>
  <Navbar></Navbar>
  <div className=' w-full flex-1 relative overflow-hidden'>
      <GraphEditorView></GraphEditorView>
      <div className=' absolute top-[87.5%] w-full  h-[12.5%]'>
        <div className=' relative w-full h-full flex  flex-row '>

          <div className=' w-[12.5%] h-full '>
          <RecordingView/>
          </div>
          <div className=' flex-1'>
          <Textbox></Textbox>
          </div>
          {/* {audioURL &&
            (<audio className=" absolute bottom-0 right-0 w-[12.5%] h-[12.5%]" src={audioURL} controls />)
          } */}
        </div>

      </div>
      {/* </div>
      <div className=' absolute md:left-[12.5%] left-[25%] top-[87.5%] md:w-[87.5%] w-[75%]'> */}
        
      {/* </div> */}
  </div>

</div>
{/* <div className=' absolute w-full bottom-0'>
  <div className=' relative '>
    <div className="flex min-h-screen flex-col items-center bg-transparent">
      <RecordingView/>
    </div>
    
    <div className=' absolute md:left-[12.5%] left-[25%] top-0 md:w-[87.5%] w-[75%] h-[87.5%]'>
      <GraphEditorView></GraphEditorView>
    </div>
    <div className=' absolute md:left-[12.5%] left-[25%] top-[87.5%] md:w-[87.5%] w-[75%]'>
      <Textbox>

      </Textbox>
    </div>
  </div>
</div> */}
</>
  );
}
