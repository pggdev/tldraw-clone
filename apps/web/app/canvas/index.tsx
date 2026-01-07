"use client"

import { Timers, Tldraw, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { Navbar } from '../components/navbar'
import { Suspense, useEffect } from 'react'
import { prismaClient } from '@repo/db/client'
import { snapshot } from 'node:test'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { WS_URL } from '../../config'

export default function Canvas() {

    const params = useSearchParams()
    const [socket, setSocket] = useState<WebSocket | null>()

    const roomId = params.get('roomId') ? Number(params.get('roomId')) : null

    console.log(roomId)

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

            <Suspense fallback={<div>Loading...</div>}>
                <div className=""><Navbar className='absolute top-0 z-10 w-full' socket={socket} /></div>
            </Suspense>
            <div className='fixed inset-0 '>

                <Tldraw persistenceKey='canvas'>

                    {socket && (roomId ? <PersistanceRoom socket={socket} roomId={roomId} /> : <Persistance socket={socket} />)}
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
            console.log(socket)

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






const PersistanceRoom = ({ socket, roomId }: { socket: WebSocket, roomId: Number }) => {

    const editor = useEditor()






    useEffect(() => {
        if (!socket) return;

        let timer: NodeJS.Timeout

        const persistanceHandler = () => {

            clearTimeout(timer)

            timer = setTimeout(() => {
                const canvasData = editor.getSnapshot()
                console.log(canvasData)

                if (socket && socket.readyState === WebSocket.OPEN) {
                    console.log(roomId)
                    socket.send(JSON.stringify({
                        type: "canvas_update",
                        roomId: roomId,
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

    }, [editor, roomId, socket])



    useEffect(() => {
        if (!socket || !editor) return;

        const handleMessage = (event: MessageEvent) => {
            console.log("hi from printer")
            const data = JSON.parse(event.data);

            if (data.type === "canvas_update") {

                const rawSnapshot = data.snapshot || data.content;

                const snapshotToLoad = rawSnapshot?.document || rawSnapshot;

                if (snapshotToLoad && 'store' in snapshotToLoad) {
                    console.log("Valid snapshot ");
                    editor.loadSnapshot(snapshotToLoad);
                } else {
                    console.warn("Received data is not a valid tldraw snapshot", rawSnapshot);
                }
            }
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket, editor]);



    return null
}