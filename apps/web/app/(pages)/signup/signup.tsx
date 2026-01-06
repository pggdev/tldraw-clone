'use client'

import { IconX } from "@tabler/icons-react"
import { CustomBtn } from "../../components/Btn"
import { useRouter } from "next/navigation"
import { useState, useRef, Dispatch, SetStateAction } from "react"
import { BACKEND_URL } from "../../../config"
import axios from "axios"

export const Signup = ({ socket, isOpen, setisOpen, setLoginisOpen }: { socket?: WebSocket | null, isOpen: boolean, setisOpen: Dispatch<SetStateAction<boolean>>, setLoginisOpen: Dispatch<SetStateAction<boolean>> }) => {


    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);






    const signuphandler = async () => {
        await axios.post(`${BACKEND_URL}/signup`, {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        })

        setLoginisOpen(true)
        setisOpen(false)


    }


    return <div className="">

        {isOpen && <div className="h-screen w-screen absolute inset-0 z-50 backdrop-blur-sm flex justify-center items-center">

            <div className="p-5 py-10 bg-white rounded-lg relative">

                <button className=" absolute right-5 top-5 p-1 " onClick={() => setisOpen(false)}> <IconX className="size-4" /></button>


                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold text-center">Join Room</h1>
                    <input ref={nameRef} type="text" placeholder="Name" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <input ref={emailRef} type="text" placeholder="Email" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <input ref={usernameRef} type="text" placeholder="username" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <input ref={passwordRef} type="text" placeholder="password" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <div className=" mt-3">
                        <button className=" bg-purple-200  w-full rounded-lg px-2 py-1 text-sm font-normal text-black cursor-pointer active:scale-98" onClick={signuphandler}>Signup</button>


                    </div>
                </div>



            </div>


        </div>}

        <CustomBtn onClick={() => setisOpen(true)}>Signup</CustomBtn>



    </div >



}