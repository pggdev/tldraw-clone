import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 })


interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const Users: User[] = [];
const saveTimers = new Map<number, NodeJS.Timeout>()
const roomStates = new Map<string, any>();



function checkUser(token: string): string | null {
    const decode = jwt.verify(token, JWT_SECRET)

    if (typeof decode === "string") {
        return null
    }

    if (!decode || !decode.userId) {
        return null
    }

    return decode.userId
}

wss.on("connection", (ws, request) => {

    const url = request.url;

    if (!url) {
        return
    }

    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') ?? ''

    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTgzZDlkMi03ODY5LTQ5YjItYTIzOS04OGE5NTE1N2IzMmYiLCJpYXQiOjE3NjY5NDYzNjZ9.9LDaLS_7MxjCnZo_iU1D-z8pSQD-20PmLPfH7I9akV0"
    const userId = checkUser(token || testToken)


    if (!userId) {
        ws.close()
        return
    }

    console.log(ws)


    Users.push({
        userId,
        rooms: [],
        ws
    })

    try {
        ws.on("message", async function message(data) {

            const parsedData = JSON.parse(data as unknown as string);

            if (parsedData.type === "join_room") {
                const user = Users.find(x => x.ws === ws);
                user?.rooms.push(parsedData.roomId)
            }

            if (parsedData.type === "leave_room") {
                const user = Users.find(x => x.ws === ws)

                if (!user) {
                    return;
                }
                user.rooms = user?.rooms.filter(x => x === parsedData.room)
            }

            if (parsedData.type === "chat") {
                const roomId = parsedData.roomId;
                const message = parsedData.message;


                await prismaClient.chat.create({
                    //@ts-ignore
                    data: {
                        roomId: Number(roomId),
                        message,
                        userId
                    }
                })
                Users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: message,
                            roomId,

                        }))
                    }
                })

            }



            if (parsedData.type === "canvas_update") {
                const { roomId, snapshot } = parsedData;
                roomStates.set(roomId, snapshot)


                Users.forEach(user => {
                    if (user.rooms.includes(roomId) && user.ws !== ws) {
                        user.ws.send(JSON.stringify({
                            type: "canvas_update",
                            snapshot,
                            roomId
                        }));
                    }
                });



                if (saveTimers.has(roomId)) {
                    clearTimeout(saveTimers.get(roomId))
                }

                const timer = setTimeout(async () => {

                    try {
                        const latestSnapshot = roomStates.get(roomId);

                        console.log(latestSnapshot)

                        if (!latestSnapshot) return;


                        await prismaClient.canvas.upsert({
                            where: {

                                roomId,
                            },
                            update: {
                                content: latestSnapshot
                            },
                            create: {
                                roomId,
                                content: latestSnapshot
                            }
                        });

                        saveTimers.delete(roomId)

                    } catch (e) {
                        console.error("critical: failed to save the canvas")
                    }



                }, 10000)
                saveTimers.set(roomId, timer);


            };


























        })

    }
    catch (e) {
        console.error("Error handling message:", e);
    }





})

