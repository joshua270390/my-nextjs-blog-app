// You're importing a component that needs `useState`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
//To avoid this use

"use client"

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"
// import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([])
  const inputRef = useRef("")
  // const [value, setValue] = useState("")
  const [searchStatus, setSearchStatus] = useState(false)

  useEffect(()=>{
             fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).
             then(res=>res.json()).
             then(res => setPosts(res)).
             catch((err)=> console.log(err.message))
  },[])

  const search = (e) => {
    if(e.type === "keydown" && e.key !== "Enter"){
       return;
    }
    setSearchStatus(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${inputRef.current.value}`)
    .then(res=>res.json())
    .then(res => setPosts(res))
    .catch((err)=> console.log(err.message))
    .finally(()=>
      setSearchStatus(false) 
    )
  }

  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
    <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4 text-center">Welcome to Our Blog</h2>
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
    <div className="flex justify-end px-4 w-full">
        <input onKeyDown={search} ref={inputRef} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick={search} disabled={searchStatus} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{searchStatus ? "..." : "Search"}</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts?.map((item, index)=>{
         return (
          <Link key={index} href={`/post/${item._id}`}>
            <div className="border border-gray-200 p-4">
              <img className="w-full h-48 object-cover mb-4" src={item.image} alt={item.title}/>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.short_desc}</p>
            </div>
          </Link>
          )
      })}
        {!posts.length > 0 && inputRef.current.value && <p>No Post is available for your search query: <b>{inputRef.current.value}</b></p>}
    </div>

    </div>
  );
}
