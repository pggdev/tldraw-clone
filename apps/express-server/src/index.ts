import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import { z } from "zod"
import { SignupSchema } from "@repo/common/types"
import { auth } from "./auth.js";
import { prismaClient } from "@repo/db/client"
import jwt from "jsonwebtoken"
import { roomSchema } from "@repo/common/types";
import cors from "cors"

const app = express();



app.use(cors())
app.use(express.json())


app.post("/signup", async (req, res) => {

    const ValidatedData = SignupSchema.safeParse(req.body);

    if (!ValidatedData.success) {
        return res.json({
            msg: "invalid input"
        })
    }

    console.log(ValidatedData.data)

    const { name, password, username, email } = ValidatedData.data



    try {
        const user = await prismaClient.user.create({
            //@ts-ignore
            data: {
                name,
                password,
                username,
                email
            }
        })
        console.log(user)

        res.json({
            msg: "you're signed up " + user.id
        })

    } catch (e) {
        res.status(401).json("user already exists")
    }
})


app.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await prismaClient.user.findFirst({
        where: {
            email,
        }
    })

    if (!user) {
        return res.status(403).json({
            msg: "not authorized"
        })
    }


    if (user.password !== password) {
        return res.status(403).json({
            msg: "invalid username or password"
        })
    }

    //@ts-ignore
    const userId = user.id
    console.log(userId)



    const token = jwt.sign({ userId }, JWT_SECRET)

    res.json({ token, userId })






})


app.post("/create-room", auth, async (req: any, res: any) => {

    const data = roomSchema.safeParse(req.body);


    if (!data.success) {
        return res.status(403).json({
            msg: "invalid inputs ",
            error: data.error
        })
    }

    const { roomname } = data.data

    const userId = req.userId



    try {
        const reponse = await prismaClient.room.create({
            data: {
                //@ts-ignore
                roomname,
                adminId: userId
            }
        })

        res.json({
            msg: "room created " + reponse.id
        })

    } catch (e: any) {

        if (e.code === 'P2002') {
            return res.status(409).json({
                msg: "room already exists"
            });
        }
        res.json({
            msg: "error creatng room",
            error: e.message
        })
    }

})


app.get("/chat/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId)

    const message = await prismaClient.chat.findMany({
        where: {
            roomId,
        }
    })


    res.json({
        message
    })
})




app.listen(3001)