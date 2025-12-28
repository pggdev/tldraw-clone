"use client"

import Login from "../app/(pages)/login/page"
import { Signup } from "../app/(pages)/signup/signup"
import { CustomBtn } from "./Btn"
import { useRouter } from "next/navigation"

export const Navbar = () => {

    const router = useRouter()


    return <div className="flex justify-between  px-4 py-2">
        <h1 className="font-black text-xl text-black">Logo</h1>
        <div className="flex gap-2">
            <CustomBtn onClick={() => router.push('/signup')}>
                Signup
            </CustomBtn>

            <CustomBtn onClick={() => router.push('/login')}>
                Login
            </CustomBtn>
        </div>
    </div>
} 