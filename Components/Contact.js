"use client"

import {useState} from 'react'

export default function Contact(){

    const[inputs, setInputs] = useState({})
    const[message, setMessage] = useState("")

    const handleInput = (e) => {
        setInputs((prevState)=> {return {...prevState, [e.target.name]:e.target.value}})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`,{
            method: "POST",
            body: JSON.stringify(inputs)
        })
        .then((res)=>res.json())
        .then(res => {
            setMessage(res.message)
            setInputs({}) 
            setTimeout(()=>{
                setMessage("")
            },3000)
         }
        )
    }

    return <main className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-lvh">
    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center mb-4">
            <label htmlFor="name" className="w-1/4">Name:</label>
            <input onChange={handleInput} name="name" value={inputs.name??""} type="text" id="name" className="border rounded px-2 py-1 w-3/4 focus:outline-none"/>
        </div>
        <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4">Email:</label>
            <input onChange={handleInput} name="email" value={inputs.email??""} type="email" id="email" className="border rounded px-2 py-1 w-3/4 focus:outline-none"/>
        </div>
        <div className="flex items-center mb-4">
            <label htmlFor="message" className="w-1/4">Message:</label>
            <textarea onChange={handleInput} name="message" value={inputs.message??""} id="message" className="border rounded px-2 py-1 w-3/4 focus:outline-none" rows="4"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    {message && <p>{message}</p>}
</main>
}