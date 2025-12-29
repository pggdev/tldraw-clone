"use client"

import { CustomBtn } from "../components/Btn"
import { useRouter } from "next/navigation"

export const Landing = () => {
    const router = useRouter()
    return <div className="flex gap-2 ">
        <CustomBtn onClick={() => router.push("/signup")}>
            SignUp
        </CustomBtn>
        <CustomBtn onClick={() => router.push('/login')}>
            Login
        </CustomBtn>
    </div>
}