'use client'

import Head from "next/head";
// import NavBar from "./components/Nav1/ActionBar";
import ActionBar from "../../components/Nav1/ActionBar";
import ActionItem from "../../components/Nav1/ActionItem";
import { useZeta_chatStore } from "@/app/components/ZustandStores/Zeta_chatStore";
import { useEffect, useRef, useState } from "react";
export default function Chat() {
  const {chat, addChat} =useZeta_chatStore();
  const [input, setInput] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },);
  
  const changeInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }
  const handleSubmit = () => {
    if (!input.trim()) return;
    // onSend(input);
    console.log(input);
    addChat(input);
    addChat("OK!");
    setInput("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    
    <>
    <Head>
        <title>Chat</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
    </Head>
    <div className=" sm:flex w-full h-full" style={{ height: "100%" }}> 
      <ActionBar>
        <ActionItem name= "home" link="/"></ActionItem> 
      </ActionBar>
      
      <div className=" flex-1 h-full">
        <div className=" flex flex-col h-full">
          <div className=" w-full">
            <textarea
              // type="text
              value={input}
              onKeyDown={handleKeyDown}
              onSubmit={handleSubmit}
              onChange={changeInput}
              placeholder="Prompt"
              className=" w-full h-full bg-cc0 text-c00 px-2 py-2 resize-none focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className=" flex-1 overflow-y-scroll " ref={containerRef}>
            {chat.map( (msg, id) => {
              let chat;
              if (id % 2 == 0){
                
                chat = (<div className=" text-c00 break-words w-fit max-w-full mx-2 px-[1rem] py-[0.5rem] bg-cc0 rounded-[2rem] whitespace-pre-line" key={id}>
                  {msg}
                </div>);
              } else {
                chat = (<div className="  text-c00 break-words py-[0.5rem] max-w-full whitespace-pre-line" key={id}>
                  {msg}
                </div>);
              }
              
              return (
                chat
              )
            }
            )}
          </div>
          
        </div>
      </div>
      
    </div>
    </>
  );
}
