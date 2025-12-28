"use client"

import { useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "../../../config";
import { useRouter } from "next/navigation"





export const Signup = () => {


    const Router = useRouter()



    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const sendRequest = async () => {

        await axios.post(`${BACKEND_URL}/signup`, {
            name: nameRef.current?.value,
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            email: emailRef.current?.value,

        })
        Router.push('/login')

    }


    return <div className="flex h-screen justify-center items-center">

        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-center">Signup</h1>
            <input ref={nameRef} type="text" placeholder="name" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
            <input ref={usernameRef} type="text" placeholder="username" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
            <input ref={passwordRef} type="text" placeholder="password" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
            <input ref={emailRef} type="text" placeholder="email" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>


            <div className=" mt-3">
                <button onClick={sendRequest} className=" bg-purple-200  w-full rounded-lg px-2 py-1 text-sm font-normal text-black cursor-pointer active:scale-98">Join Now</button>


            </div>
        </div>


    </div>


}