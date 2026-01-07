'use client'

import { IconX, IconLoader } from "@tabler/icons-react"
import { CustomBtn } from "../../components/Btn"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { BACKEND_URL } from "../../../config"
import axios from "axios"

interface joinstatus {
    error: string | null

}


export const Joinroom = ({ socket }: { socket?: WebSocket | null }) => {
    const [isOpen, setisOpen] = useState(false);
    const [joinstatus, setjoinstatus] = useState<string | null>(null)
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()


    const roomnameRef = useRef<HTMLInputElement>(null);




    const createhandler = async () => {
        const roomId = Number(roomnameRef.current?.value)

        setisLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/room-details`, { roomId })
            console.log(response.data.roomId)
            console.log(roomId)
            if (response.data.roomId !== roomId) {
                setjoinstatus("Room doesn't exist")
                return
            };


        } catch (e: any) {
            console.log("Axios Error:", e.response?.data || e.message);
        } finally {
            setisLoading(false)
        }



        try {

            if (socket && socket.readyState === WebSocket.OPEN) {

                socket.send(JSON.stringify({
                    type: "join_room",
                    roomId: Number(roomId)

                }))


                setisOpen(false)

                router.push(`/?roomId=${roomId}`);



            }

        } catch (e: any) {

            setjoinstatus("error joining room , try again")
        } finally {

        }




    }



    const closehandler = () => {
        setisOpen(false);
        setjoinstatus(null)
    }

    return <div className="">

        {isOpen && <div className="h-screen w-screen absolute inset-0 z-50 backdrop-blur-sm flex justify-center items-center">

            <div className="p-5 py-10 bg-white rounded-lg relative">

                <button className=" absolute right-5 top-5 p-1 " onClick={closehandler}> <IconX className="size-4" /></button>


                <div className="flex flex-col gap-2">
                    {joinstatus && <span className="text-sm bg-red-100 max-w-37 w-full px-2 py-2 rounded-lg text-red-500 flex justify-center items-center">{joinstatus}</span>}
                    <div className="flex gap-2 justify-center py-4 items-center">

                        <h1 className="text-xl font-semibold text-center">Join Room</h1>
                        {isLoading && <div> <IconLoader className="animate-spin size-5" /></div>}

                    </div>
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