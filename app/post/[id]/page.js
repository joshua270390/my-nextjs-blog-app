import Post from "@/Components/Post"

export async function generateMetadata({params}){
   const id = params.id
   const postmetadata = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`).then((res)=>res.json())
   return {title:postmetadata.title, description:postmetadata.description, keywords:postmetadata.description}
}

export default function Page({params}){

    return <Post params={params}/>
}