"use client"

import { Timers, Tldraw, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { Navbar } from '../components/navbar'
import { useEffect } from 'react'
import { prismaClient } from '@repo/db/client'
import { snapshot } from 'node:test'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { WS_URL } from '../../config'

export default function Canvas() {

    const params = useParams()
    const [socket, setSocket] = useState<WebSocket | null>()


    const roomId = params.roomId ? Number(params.roomId) : null

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (!token) return;
        if (token) {
            const ws = new WebSocket(`${WS_URL}?token=${token}`);

            ws.onopen = () => {
                console.log("connected to ws");
                setSocket(ws);
            }

            return;
        }




    }, [])


    return (


        <div className="relative">

            <div className=""><Navbar className='absolute top-0 z-10 w-full' socket={socket} /></div>
            <div className='fixed inset-0 '>

                <Tldraw persistenceKey='canvas'>

                    {socket && (roomId ? <PersistanceRoom socket={socket} /> : <Persistance socket={socket} />)}
                </Tldraw>
            </div>

        </div>
    )
}



const Persistance = ({ socket }: { socket: WebSocket }) => {
    const editor = useEditor()




    useEffect(() => {
        let timer: NodeJS.Timeout
        const persistData = () => {
            if (!socket) return;

            clearTimeout(timer);

            timer = setTimeout(() => {
                const canvas = editor.getSnapshot();

                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "user_canvas",
                        snapshot: canvas
                    }))

                }


            }, 2000)

        }

        const cleanup = editor.store.listen(persistData, {
            source: 'user',
            scope: 'document'
        })
        return cleanup

    }, [editor])
    return null
}






const PersistanceRoom = ({ socket }: { socket: WebSocket }) => {

    const editor = useEditor()
    const params = useParams()


    const roomId = params.roomId ? Number(params.roomId) : null



    useEffect(() => {
        if (!socket) return;
        let timer: NodeJS.Timeout

        const persistanceHandler = () => {

            clearTimeout(timer)

            timer = setTimeout(() => {
                const canvasData = editor.getSnapshot()
                console.log(canvasData)

                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "canvas_update",
                        roomId: 1,
                        snapshot: canvasData
                    }))

                }



            }, 5000)







        }

        const cleanup = editor.store.listen(persistanceHandler, {
            source: 'user',
            scope: 'document'
        })

        return cleanup

    }, [editor])


    return null
}