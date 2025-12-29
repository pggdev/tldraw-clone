'use client'

import { IconX } from "@tabler/icons-react"
import { CustomBtn } from "../../components/Btn"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"

export const Createroom = ({ socket }: { socket?: WebSocket | null }) => {
    const [isOpen, setisOpen] = useState(false);
    const router = useRouter()


    const roomnameRef = useRef<HTMLInputElement>(null);

    const roomname = roomnameRef.current?.value



    const createhandler = () => {

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: Number(roomname)

            }))


            setisOpen(false)



        }
        return console.log("hi from the handler");




    }


    return <div className="">

        {isOpen && <div className="h-screen w-screen absolute inset-0 z-50 backdrop-blur-sm flex justify-center items-center">

            <div className="p-5 py-10 bg-white rounded-lg relative">

                <button className=" absolute right-5 top-5 p-1 " onClick={() => setisOpen(false)}> <IconX className="size-4" /></button>


                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold text-center">Join Room</h1>
                    <input ref={roomnameRef} type="text" placeholder="RoomId" className="border-2 border-neutral-300 rounded-lg px-2 py-1"></input>
                    <div className=" mt-3">
                        <button className=" bg-purple-200  w-full rounded-lg px-2 py-1 text-sm font-normal text-black cursor-pointer active:scale-98" onClick={createhandler}>Join Room</button>


                    </div>
                </div>



            </div>


        </div>}

        <CustomBtn onClick={() => setisOpen(true)}>Join room</CustomBtn>



    </div >



}