'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

interface Agent {
  id: number;
  name: string;
  points: number[];
}

export default function Search() {
  const [agents, setAgents] = useState<Agent[]>([]);
  // const [input, setInput] = useState("");
  const fetchResults = async () => {
    try {
      fetch("http://localhost:8000/items").then((res) => res.json())
      .then((data) => setAgents(data));
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