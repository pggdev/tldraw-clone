import express, { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {

    const token = req.headers["authorization"] ?? ""

    const decode = jwt.verify(token, JWT_SECRET)

    if (decode) {

        //@ts-ignore
        req.userId = decode.userId
        next()


    } else {
        res.status(403).json("user not found")
    }

}