'use client'

import { IconLoader, IconX } from "@tabler/icons-react"
import { CustomBtn } from "../../components/Btn"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../../config"


interface roomstate {
    roomId: number | null,
    error: string | null
}
export const Createroom = ({ socket }: { socket?: WebSocket | null }) => {
    const [isOpen, setisOpen] = useState(false);
    const [roomstatus, setroomstatus] = useState<roomstate>({ roomId: null, error: null })
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()


    const roomnameRef = useRef<HTMLInputElement>(null);




    const createhandler = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        const roomname = roomnameRef.current?.value
        if (!roomname) return;

        setisLoading(true)

        try {
            const response = await axios.post(`${BACKEND_URL}/create-room`,
                { roomname },
                {
                    headers: {
                        authorization: token
                    }
                }

            )


            setroomstatus({ roomId: response.data, error: null })
        } catch (e: any) {
            if (e.response.status === 409) {
                setroomstatus({ roomId: null, error: e.response.data.msg })
            } else {
                setroomstatus({ roomId: null, error: "error creating room try again" })
            }

        } finally {
            setisLoading(false)
        }

    }


    return <div className="">

        {isOpen && <div className="h-screen w-screen absolute inset-0 z-50 backdrop-blur-sm flex justify-center items-center">

            <div className="p-5 py-6 bg-white rounded-lg relative">

                <button className=" absolute right-1 top-1 p-2 " onClick={() => setisOpen(false)}> <IconX className="size-4" /></button>


                <div className="flex flex-col gap-2">

                    {roomstatus.error && <span className="text-sm bg-red-100 max-w-40 w-full px-2 py-2 rounded-lg text-red-500">{roomstatus.error}</span>}
                    {roomstatus.roomId && <span className="text-sm bg-green-100 max-w-40 w-full px-2 py-2 rounded-lg text-green-500">{`RoomId is ${roomstatus.roomId}`}</span>}

                    <div className="flex gap-2 justify-center py-4 items-center">
                        <h1 className="text-xl font-semibold text-center">Create Room</h1>
                        {isLoading && <div> <IconLoader className="animate-spin size-5" /></div>}

                    </div>
                    <input ref={roomnameRef} type="text" placeholder="RoomName" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <div className=" flex flex-col gap-10 mt-3">
                        <button className=" bg-purple-200  w-full rounded-lg px-2 py-1 text-sm font-normal text-black cursor-pointer active:scale-98" onClick={createhandler}>Create Room</button>


                    </div>
                </div>



            </div>


        </div>}

        <CustomBtn onClick={() => setisOpen(true)}>Create room</CustomBtn>



    </div >



}