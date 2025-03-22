'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      const response = await axios.get(`${API_BASE_URL}/environment/kg/dump`);
      console.log("Response:", response.data);
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