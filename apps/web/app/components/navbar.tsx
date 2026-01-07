"use client"
import { Login } from "../(pages)/login/login"
import { Signup } from "../(pages)/signup/signup"
import { cn } from "../../lib/utils"
import { CustomBtn } from "./Btn"
import { Joinroom } from "../(pages)/joinroom"
import { Logout } from "../(pages)/logout"
import { useEffect, useState } from "react"
import { Createroom } from "../(pages)/createroom"
import { Currentroom } from "./currentroom"
import { Roomlist } from "./roomlist"

export const Navbar = ({ className, socket }: { className?: string, socket?: WebSocket | null }) => {
    const [LoginisOpen, setLoginisOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false)
    const token = localStorage.getItem('token')




    return <div className={cn("flex justify-between  px-4 py-2", className)}>

        <div className="flex gap-5">
            <h1 className="font-black text-xl text-black">Logo</h1>
            <Currentroom />
        </div>

        <div>
            <Roomlist />
        </div>
        <div className="flex gap-2 ">

            {!token && <Signup isOpen={isOpen} setisOpen={setisOpen} setLoginisOpen={setLoginisOpen} />}
            {!token && <Login LoginisOpen={LoginisOpen} setLoginisOpen={setLoginisOpen} />}




            {token && <Logout />}
            {token && <Joinroom socket={socket} />}
            {token && <Createroom />}






        </div>
    </div>
} 