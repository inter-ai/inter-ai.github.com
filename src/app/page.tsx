'use client'

import Head from "next/head";
import NavBar from "./components/Nav/Navbar";
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
    <NavBar>

    </NavBar>
    </>
  );
}
