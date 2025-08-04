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

const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const categorias = ["Luz", "Água", "Imposto", "Internet", "Salário de funcionário"];

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  mes: string;
  ano: number;
}

export function Grafico2DespesasAnual() {
  const [dadosGrafico, setDadosGrafico] = useState<any[]>([]);

  const agruparDespesas = (despesas: Despesa[]) => {
    const base = new Array(12).fill(0).map((_, index) => {
      const obj: any = { nome: meses[index] };
      categorias.forEach((categoria) => (obj[categoria] = 0));
      return obj;
    });

    despesas.forEach((despesa) => {
      const mesIndex = meses.findIndex(
        (m) => m.toLowerCase() === despesa.mes.slice(0, 3).toLowerCase()
      );
      if (mesIndex >= 0 && categorias.includes(despesa.nome)) {
        base[mesIndex][despesa.nome] += despesa.valor;
      }
    });

    return base;
  };

  const carregarDespesas = async (limite?:number,offset2?:number) => {
    const { data } = await apiController.get("despesa", {
      params: { 
        ano: 2025 ,
        offset: offset2,
        limite: limite
      },
    });

    const agrupado = agruparDespesas(data);
    setDadosGrafico(agrupado);
  };

  useEffect(() => {
    carregarDespesas(10000,0);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Despesas</h2>
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
          <Bar dataKey="Luz" stackId="a" fill="#facc15" />
          <Bar dataKey="Água" stackId="a" fill="#60a5fa" />
          <Bar dataKey="Imposto" stackId="a" fill="#f87171" />
          <Bar dataKey="Internet" stackId="a" fill="#818cf8" />
          <Bar dataKey="Salário de funcionário" stackId="a" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
