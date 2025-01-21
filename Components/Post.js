"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";

export default function Post({params}){

    // const id = params.id
    const newId = use(params);
    const router = useRouter();

    const [singlePost, setSinglePost] = useState(null)

    useEffect(()=>{
        const fetchPost = async () => {
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${newId.id}`);
              const data = await response.json();
              setSinglePost(data);
            } catch (error) {
              console.log("Error fetching post:", error.message);
            }
          };
      
          fetchPost();
    },[newId.id])

    return <>
        
        {singlePost && <div className="py-20">
            <div className="container mx-auto">
            <button className="text-xl mb-10" onClick={()=>router.back()}>Back</button>
            <div className="section-for-post"><h1 className="text-5xl font-bold">{singlePost.title}</h1></div>
            <div className="text-2xl mt-10">Published on {singlePost.modified_date_format}</div>
            <div className="text-center flex items-center justify-center"><img className="w-1/2" src={singlePost.image} alt={singlePost.title}/></div>
            <div className="section-for-post-description"><p className="text-2xl mt-10">{singlePost.description}</p></div>
            </div>
       </div>
        }
    </>
}