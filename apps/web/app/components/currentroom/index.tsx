import { useSearchParams } from "next/navigation"
import { CustomBtn } from "../Btn"
import { useState, useEffect } from "react"


export const Currentroom = () => {
    const [roomId, setroomId] = useState<number | null>(null)
    const params = useSearchParams()

    useEffect(() => {
        const currentroomId = Number(params.get('roomId'))
        if (currentroomId) {
            setroomId(currentroomId)

        }
    }, [params])



    return <div>

        {roomId && <div className="rounded-lg p-1 bg-neutral-200 flex gap-2 px-2 items-center">
            <h1 className="text-neutral-400 font-medium text-sm ">Current RoomId</h1>

            <span className="text-sm">

                {roomId}

            </span>
        </div>}

    </div>
}