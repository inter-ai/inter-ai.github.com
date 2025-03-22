"use client"
//Added to all pages to modify dark and light mode

// import { themeState } from "./ThemeState";
import React from 'react';
import NoSsr from "./NoSsr";
import { useGenerationStore } from "./ZustandStores/RecordingStore";
export default function ThemeWrapper(props: { children: any }) {
  const {theme} = useGenerationStore();
  // const notTheme = theme ? "light" : "dark";
  return (
    <NoSsr>
    <div className={ theme+" min-h-screen w-full h-full bg-cff bg-cover bg-fixed"}>{props.children}</div>
    </NoSsr>
  );
}
 