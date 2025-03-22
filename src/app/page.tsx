'use client'

import Head from "next/head";
// import NavBar from "./components/Nav1/ActionBar";
import ActionBar from "./components/Nav1/ActionBar";
import ActionItem from "./components/Nav1/ActionItem";
export default function Home() {
  
  return (
    
    <>
    <Head>
        <title>Main</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
    </Head>
    {/* TODO: make flex when width > height */}
    <div className=" sm:flex w-full" style={{ height: "100%" }}> 
      <ActionBar>
        <ActionItem name= "hi"></ActionItem> 
      </ActionBar>
      <div className=" flex-1">
        <center className=" mt-16">

          <div className=" text-c00 text-4xl tracking-widest">
          The Future of Agent Collaboration
          </div>
          <div className=" text-c00">
          Revolutionizing how autonomous agents communicate, collaborate, and create value
          </div>
        </center>
        <center className=" text-c00">
          Sign up for our newsletter
        </center>
      </div>
    </div>
    </>
  );
}
