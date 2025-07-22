import z from "zod";
import { userReturnSchema } from "./usuarios.schemas";

export const loginSchemas = z.object ({
    name: z.string(),
    password: z.string()
})

export const loginReturnSchemas = z.object ({
    user: userReturnSchema,
    token: z.string()
})

export type loginUser = z.infer<typeof loginSchemas>
export type returnLogin = z.infer<typeof loginReturnSchemas>