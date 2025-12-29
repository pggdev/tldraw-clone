"use client"

import { useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "../../../config";
import { useRouter } from "next/navigation"





export default function Login() {


    const Router = useRouter()



    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const sendRequest = async () => {

        const response = await axios.post(`${BACKEND_URL}/login`, {
            password: passwordRef.current?.value,
            email: emailRef.current?.value,

        })

        localStorage.setItem("token", response.data.token)



        Router.push('/')

    }


    return <div className="flex h-screen justify-center items-center">

        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-center">Login</h1>
            <input ref={passwordRef} type="text" placeholder="password" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
            <input ref={emailRef} type="text" placeholder="email" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>


            <div className=" mt-3">
                <button onClick={sendRequest} className=" bg-purple-200  w-full rounded-lg px-2 py-1 text-sm font-normal text-black cursor-pointer active:scale-98">Join Now</button>


            </div>
        </div>


    </div>


}