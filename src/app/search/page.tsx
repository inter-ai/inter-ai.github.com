'use client'
import { useState, useEffect } from "react";
// import axios from "axios";
import Head from "next/head";

interface Agent {
  id: number;
  name: string;
  points: number[];
}

export default function Search() {
  const [agents] = useState<Agent[]>([]);
  // const [input, setInput] = useState("");
  const fetchResults = async () => {
    try {
      // fetch("http://localhost:8000/items").then((res) => res.json())
      // .then((data) => setAgents(data));
      const response = await fetch("https://browser-backend-0fwi.onrender.com/agent/kg/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_name: "string",
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    fetchResults();

  }, []);
  return (
    
    <>
    <Head>
        <title>Search</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
    </Head>
    {agents.map((el) => (
        <div key={el.id}>{el.id}: {el.name}</div>
    ))}

    </>
  );
}