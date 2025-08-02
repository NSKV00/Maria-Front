import z from "zod";
import { returnProdutoSchema } from "./produto.schemas";

export const vendaSchema = z.object ({
    quantidade: z.number(),
    lucro: z.number(),
    sabor: z.string()
})

export const vendaReturnSchema = z.object ({
    quantidade: z.number(),
    lucro: z.number(),
    sabor: z.string(),
    Produto: returnProdutoSchema.omit({ url: true })
})

export const vendasReturnSchema = z.object({
    quantidade: z.number(),
    lucro: z.number(),
    sabor: z.string(),
    id: z.number(),
    Produto: returnProdutoSchema.omit({ url: true })
})

export const updateVendaSchema = vendaSchema.partial()
export const vendasArraySchema = vendasReturnSchema.array()

export type venda = z.infer<typeof vendaSchema>
export type vendaReturn = z.infer<typeof vendaReturnSchema>
export type vendasReturn = z.infer<typeof vendasArraySchema>
