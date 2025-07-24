
import z from "zod";

export const userReturnSchema = z.object ({
    id: z.number(),
    name: z.string()
})

export const createUserSchema = z.object({
    name: z.string().min(2,"nome é obrigatório"),
    password: z.string()
})

export const returnUserSchema = createUserSchema.extend({
    id: z.number()
}).omit({password:true})


export const updateUserSchema = createUserSchema.partial()

export type CreateUser = z.infer<typeof createUserSchema>
export type returnUser = z.infer<typeof userReturnSchema>
