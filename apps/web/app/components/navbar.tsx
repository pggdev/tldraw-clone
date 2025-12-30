"use client"

import Login from "../(pages)/login/page"
import { Signup } from "../(pages)/signup/signup"
import { cn } from "../../lib/utils"
import { CustomBtn } from "./Btn"
import { Joinroom } from "../(pages)/joinroom/page"
import { Logout } from "../(pages)/logout"
import { useEffect } from "react"

export const Navbar = ({ className, socket }: { className?: string, socket?: WebSocket | null }) => {



    const token = localStorage.getItem('token')




    return <div className={cn("flex justify-between  px-4 py-2", className)}>
        <h1 className="font-black text-xl text-black">Logo</h1>
        <div className="flex gap-2">
            {!token && <Signup />}
            {!token && <Login />}


            {token && <Logout />}
            {token && <Joinroom socket={socket} />}



        </div>
    </div>
} 