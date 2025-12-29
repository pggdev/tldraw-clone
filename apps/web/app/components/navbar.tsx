"use client"

import Login from "../(pages)/login/page"
import { Signup } from "../(pages)/signup/signup"
import { cn } from "../../lib/utils"
import { CustomBtn } from "./Btn"
import { useRouter } from "next/navigation"
import { Createroom } from "../(pages)/createroom/page"

export const Navbar = ({ className, socket }: { className?: string, socket?: WebSocket | null }) => {

    const token = localStorage.getItem('token')

    const router = useRouter()

    return <div className={cn("flex justify-between  px-4 py-2", className)}>
        <h1 className="font-black text-xl text-black">Logo</h1>
        <div className="flex gap-2">
            {!token && <CustomBtn onClick={() => router.push('/signup')}>
                Signup
            </CustomBtn>
            }
            {!token && <CustomBtn onClick={() => router.push('/login')}>
                Login
            </CustomBtn>}

            {token && <CustomBtn >Logout</CustomBtn>}
            {token && <Createroom socket={socket} />}
            {token && <CustomBtn onClick={() => { router.push('/joinroom') }}>Join Room</CustomBtn>}
            ``


        </div>
    </div>
} 