'use client'

import Head from "next/head";
// import NavBar from "./components/Nav1/ActionBar";
import ActionBar from "../components/Nav1/ActionBar";
import ActionItem from "../components/Nav1/ActionItem";
import ToggleTheme from "../components/ToggleTheme";
export default function Home() {
  
  return (
    
    <>
    <Head>
        <title>ui options</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
    </Head>
    <div className=" sm:flex w-full" style={{ height: "100%" }}> 
      <ActionBar>
        <ActionItem name= "home" link="/"></ActionItem> 
        <div className=" ml-2"><ToggleTheme></ToggleTheme></div>
      </ActionBar>
      {/* Later, this is one of our products */}
      <div className=" flex-1">
        <center className=" mt-16">

          <div className=" text-c00 text-4xl tracking-widest">
          Your Framework for Multi-agent Communication and Decision-making in Dynamic Systems
          </div>
          <div className=" text-c00">
          Assembly lines, drones, cameras, digital agents, all work with most up-to-date information
          </div>
        </center>
      </div>
    </div>
    </>
  );
}
