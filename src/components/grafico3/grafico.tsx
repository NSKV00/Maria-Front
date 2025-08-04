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

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  mes: string;
  ano: number;
}

export function GraficoLucroVsDespesas() {
  const [dadosGrafico, setDadosGrafico] = useState(
    new Array(12).fill(0).map((_, index) => ({
      nome: meses[index],
      lucro: 0,
      despesas: 0,
    }))
  );

  const carregarDados = async () => {
    const vendasRes = await apiController.get("venda", {
      params: {
        offset: 0,
        limit: 1000000,
      },
    });

    const vendasConvertidas: vendaReturn[] = vendasRes.data.map((item: vendaReturn) => ({
      ...item,
      data_venda: new Date(item.data_venda),
    }));

    const lucroPorMes = new Array(12).fill(0);
    const custoProducaoPorMes = new Array(12).fill(0);

    vendasConvertidas.forEach((venda) => {
      const mes = venda.data_venda.getMonth();
      lucroPorMes[mes] += venda.lucro * venda.quantidade;
      const custoUnitario = venda.Produto.preco / 100;
      custoProducaoPorMes[mes] += custoUnitario * venda.quantidade;
    });

    const despesasRes = await apiController.get("despesa", {
      params: {
        ano: 2025,
        offset: 0,
        limite: 1000000,
      },
    });

    const despesasConvertidas: Despesa[] = despesasRes.data;

    const despesasPorMes = new Array(12).fill(0);
    despesasConvertidas.forEach((despesa) => {
      const mesIndex = meses.findIndex(
        (m) => m.toLowerCase() === despesa.mes.slice(0, 3).toLowerCase()
      );
      if (mesIndex >= 0) {
        despesasPorMes[mesIndex] += despesa.valor;
      }
    });

    const combinado = new Array(12).fill(0).map((_, index) => ({
      nome: meses[index],
      lucro: parseFloat(lucroPorMes[index].toFixed(2)),
      despesas: parseFloat((despesasPorMes[index] + custoProducaoPorMes[index]).toFixed(2)),
    }));

    setDadosGrafico(combinado);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Lucro vs Despesas</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosGrafico}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="lucro" fill="#10b981" name="Lucro" />
          <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
