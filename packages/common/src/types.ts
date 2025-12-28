import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(3).max(10),
    name: z.string(),
    email: z.email()
});



export const loginSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(3).max(10),

});


export const roomSchema = z.object({
    roomname: z.string().min(3).max(10)
})