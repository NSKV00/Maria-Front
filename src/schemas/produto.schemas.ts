
import z from "zod";

export const produtoSchema = z.object ({
    nome: z.string(),
    descricao: z.string(),
    preco: z.number(),
    ativo: z.boolean().default(true),
    url: z.string().default("https://i.pinimg.com/736x/4b/00/c6/4b00c6f29ca4e2d5a0b66ba92b1f5ab1.jpg")
})
export const returnProdutoSchema = produtoSchema.extend({
    id: z.number()
})

export const updateProdutoSchema = produtoSchema.partial()
export const returnAllProdutosSchema = returnProdutoSchema.array()

export type creteProduto = z.infer<typeof produtoSchema>
export type returnProduto = z.infer<typeof returnProdutoSchema>
export type returnAllProduto = z.infer<typeof returnAllProdutosSchema>


