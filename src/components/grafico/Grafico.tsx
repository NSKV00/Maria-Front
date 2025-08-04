import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./style.module.css";
import { apiController } from "../../controller/api.controller";
import { useEffect, useState } from "react";
import type { vendaReturn } from "../../schemas/venda.schemas";

const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function GraficoVendasAnual() {
  const [dadosGrafico, setDadosGrafico] = useState(
    new Array(12).fill(0).map((_, index) => ({
      nome: meses[index],
      producao: 0,
      lucro: 0,
    }))
  );

  function agruparPorMes(vendas: vendaReturn[]) {
    const agrupado = new Array(12).fill(0).map((_, index) => ({
      nome: meses[index],
      producao: 0,
      lucro: 0,
    }));

    vendas.forEach((venda) => {
      const mes = new Date(venda.data_venda).getMonth(); 
      agrupado[mes].producao += venda.quantidade * venda.Produto.preco / 100;
      agrupado[mes].lucro += venda.lucro * venda.quantidade;
    });

    return agrupado;
  }

  const pegarTodasVendas = async (paramN?: string, paramD?: string, offset2?: number,limite?:number) => {
    const { data } = await apiController.get("venda", {
      params: {
        nomeDoProduto: paramN,
        data: paramD,
        offset: offset2,
        limit: limite
      },
    });

    const vendasConvertidas = data.map((item: vendaReturn) => ({
      ...item,
      data_venda: new Date(item.data_venda),
    }));

    const agrupado = agruparPorMes(vendasConvertidas);
    setDadosGrafico(agrupado);
  };

  useEffect(() => {
    pegarTodasVendas(undefined, undefined, 0,1000000);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Produção</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dadosGrafico}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="producao" fill="#6d5832" name="Produção" />
          <Bar dataKey="lucro" fill="#a78c6d" name="Lucro" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
