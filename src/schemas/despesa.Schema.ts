import z from "zod";

export const despesaSchema = z.object ({
    nome: z.string(),
    valor: z.number(),
    mes: z.string(),
    ano: z.number()
})
export const returnDespesaSchema = despesaSchema.extend({
    id: z.number()
})

export const updateDespesaSchema = despesaSchema.partial()
export const returnAllDespesasSchema = returnDespesaSchema.array()

export type creteDespesa = z.infer<typeof despesaSchema>
export type returnDespesa = z.infer<typeof returnDespesaSchema>
export type returnAllDespesas = z.infer<typeof returnAllDespesasSchema>
