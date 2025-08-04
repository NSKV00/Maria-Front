import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { apiController } from "../../controller/api.controller"
import { useEffect, useState } from "react"
import type { venda, vendaReturn } from "../../schemas/venda.schemas"
import style from "./style.module.css"
import { toast } from "react-toastify"
import { Footer } from "../../components/footer/Footer"

export const Vendas = ()=>{
    const navigate = useNavigate()

    const [venda,setVenda] = useState<vendaReturn[]>([])
    const [filtroData, setFiltroData] = useState<"hoje" | "ontem" | "anteontem" | null>(null)
    const [offset, setOffset] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [vendaSelecionada, setVendaSelecionada] = useState<vendaReturn | null>(null)


    const validateUser = async(token:string)=>{
            try {
                const res = await apiController.get("usuarios/retrieve",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data){
                    localStorage.setItem("user", JSON.stringify(res.data))
                }
            } catch (error){
                console.log(error,"error")
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                 navigate("/login")
            }
        }

        const openModal = () => {
        setModalOpen(true)
}

const openModal2 = (venda:vendaReturn) => {
        setVendaSelecionada(venda)
        setModalOpen2(true)
}

const formatDateLocal = (date: Date) => {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};

const pegarVendasPorData = async (opcao: "hoje" | "ontem" | "anteontem",offset2?:number,limite?:number) => {
  const hoje = new Date();
  let dataFiltro = hoje;

  if (opcao === "ontem") {
    dataFiltro = new Date();
    dataFiltro.setDate(hoje.getDate() - 1);
  } else if (opcao === "anteontem") {
    dataFiltro = new Date();
    dataFiltro.setDate(hoje.getDate() - 2);
  }

  const dataFormatada = formatDateLocal(dataFiltro);

  const { data } = await apiController.get("venda", {
    params: {
      data: dataFormatada,
      offset:offset2,
      limit: limite
    }
  });

  const vendasConvertidas = data.map((item: vendaReturn) => ({
    ...item,
    data_venda: new Date(item.data_venda),
  }));

  setVenda(vendasConvertidas.sort((a: { id: number }, b: { id: number }) => a.id - b.id));
};

const deletarVenda = async (id:number) => {
    try {
    const res = await apiController.delete(`venda/${id}`)

    return res.data        
    } catch (error) {
        console.error("Erro ao deletar Venda:", error)
    }

}

const atualizar = async (venda: Partial<venda>, id:number) => {
  try {
    const res = await apiController.patch(`venda/${id}`, {
        quantidade: venda.quantidade,
        lucro: venda.lucro,
        sabor: venda.sabor
    })

    return res.data
  } catch (error) {
    console.error("Erro ao atualizar a venda:", error)
  }
}
        

    const pegarTodasVendas = async (paramN?: string,paramD?: string, offset2?:number,limite?:number) => {
  const { data } = await apiController.get("venda", {
    params: { 
        nomeDoProduto: paramN ,
        data:paramD,
        offset: offset2,
        limit: limite
    }
  })
  const vendasConvertidas = data.map((item: vendaReturn) => ({
    ...item,
    data_venda: new Date(item.data_venda),
  }));

  setVenda(vendasConvertidas.sort((a: { id: number }, b: { id: number }) => a.id - b.id));
};

    useEffect(()=>{
            const token = localStorage.getItem("token")
            if (!token){
                navigate("/login")
            }else {
                validateUser(token)
                pegarTodasVendas(undefined, undefined, offset,8)
            }
        },[])    

    return<>
        <Header/>

        <main>
            <div className={style.divBusca}>
                <input className={style.inputSelectEstilizado} type="text" placeholder="Sabor que deseja encontra..." onChange={async (e) => { 
            const valor = e.target.value
            if (valor.trim() === "") {
            pegarTodasVendas(undefined,undefined,0,8)
            return
        }
           await pegarTodasVendas(valor,undefined,0,8)
            }
        }/>
                <select className={style.selectEstilizado}   onChange={(e) => {
    const valor = e.target.value as "hoje" | "ontem" | "anteontem" | "todos";

    setFiltroData(valor === "todos" ? null : valor);

    if (valor === "todos") {
      pegarTodasVendas(undefined, undefined, 0, 8);
    } else {
      pegarVendasPorData(valor, 0, 8);
    }

    setOffset(0);
  }} name="dias" id="dias"><option value="todos">todos</option> <option value="hoje">Hoje</option> <option value="ontem">Ontem</option> <option value="anteontem">Anteontem</option> </select>
            </div>
            <div className={style.divVenda}>
                 {venda.map((item) => (
            <div key={item.id}>
                <div className={style.divVendInfo}>
                    <div className={style.divFinalVenda}>
                    <p>Sabor do produto: {item.Produto.nome}</p>
                    <p>&larr;  &rarr;</p>
                    <p>Preço do produto: R${item.Produto.preco / 100}</p>
                    </div>
                    <h1> Quantidade de produtos vendidos: {item.quantidade}</h1>
                    <div className={style.divFinalVenda}>
                    <p>Lucro unitario da venda: R${item.lucro}</p>   
                    <p> <span> &larr;  &rarr; </span> </p>                 
                    <p>Lucro total da venda: R${item.lucro * item.quantidade}</p>
                    </div>
                    <p>Data da venda: {item.data_venda.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                </div>
                <div>
                    <button onClick={() => openModal2(item)}>Edit</button>
                </div>
            </div>
        ))}   
</div>
<div className={style.antesDepois}>
<button disabled={offset <= 0} onClick={async () => {
    setOffset(prevOffset => {
    const novoOffset = prevOffset - 8;
        if (filtroData) {
            pegarVendasPorData(filtroData, novoOffset,8)
        } else {
            pegarTodasVendas(undefined, undefined, novoOffset,8)
        }
        return novoOffset;
    return novoOffset;});
    }}> 
    Prev</button>
<button
  onClick={async () => {
    const proximoOffset = offset + 8;

    let dados: vendaReturn[] = [];
    if (filtroData) {
      const res = await apiController.get("venda", {
        params: {
          data: formatDateLocal(
            (() => {
              const hoje = new Date();
              if (filtroData === "ontem") hoje.setDate(hoje.getDate() - 1);
              else if (filtroData === "anteontem") hoje.setDate(hoje.getDate() - 2);
              return hoje;
            })()
          ),
          offset: proximoOffset,
          limit: 8,
        },
      });
      dados = res.data;
    } else {
      const res = await apiController.get("venda", {
        params: {
          offset: proximoOffset,
          limit: 8,
        },
      });
      dados = res.data;
    }

    if (dados.length > 0) {
      setOffset(proximoOffset);
      const vendasConvertidas = dados.map((item) => ({
        ...item,
        data_venda: new Date(item.data_venda),
      }));
      setVenda(vendasConvertidas.sort((a, b) => a.id - b.id));
    }
  }}
  disabled={venda.length < 8}
>
  Next
</button>

    </div>
        </main>


        {modalOpen2 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen2(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <p className={style.modalLinha}>Quantidade: <input className={style.inputBonito} type="text" value={vendaSelecionada.quantidade} onChange={(e) => setVendaSelecionada({...vendaSelecionada, quantidade:  Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Lucro unitario: <input className={style.inputBonito}  type="text" value={vendaSelecionada.lucro} onChange={(e) => setVendaSelecionada({...vendaSelecionada, lucro: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Sabor: <input className={style.inputBonito}  type="text" value={vendaSelecionada.sabor} onChange={(e) => setVendaSelecionada({...vendaSelecionada, sabor: e.target.value})}/></p> 
    <div className={`${style.botaoModal} ${style.divBotoesGap}`}>
    <button className={`${style.botaoModal} ${style.erro}`} onClick={() => setModalOpen2(false)}>Fechar</button>
    <button onClick={async () => {
        const atualizado = await atualizar(vendaSelecionada, vendaSelecionada?.id)
    if (atualizado) {
        toast.success("Venda Atualizado com sucesso") 
        setTimeout(() => {
            setModalOpen2(false)
            pegarTodasVendas(undefined,undefined,offset,8)
        } , 3600)
    } else {toast.error("Erro ao atualizar a venda")}
    }}>Atualizar</button>
    <button onClick={() => {
        setModalOpen2(false)
        setTimeout(() => {
            openModal()
        }, 200);
    }}>Deletar</button>
    </div>
    </div>
  </div>
)}


        {modalOpen && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen(false)}>
    <div className={`${style.modalContent} ${style.divBotaoVenda}`} onClick={e => e.stopPropagation()}>
        <div className={style.vendaDelet}>
        <h1>Tem Certeza ?</h1>
        <div className={style.vendaBotoesD}>        
        <button onClick={() => setModalOpen(false)}>Cancelar</button>
        <button onClick={async () => {
            const deletado = await deletarVenda(vendaSelecionada.id)
            if (deletado) {
        toast.success("Venda deletada com sucesso") 
        setTimeout(() => {
            setModalOpen(false)
            pegarTodasVendas(undefined,undefined,offset,8)
        } , 3600)
    } else {toast.error("Erro ao deletar a venda")}
        } }>Confirmar</button>
        </div>
        </div>
    </div>
    </div>
)}


<Footer></Footer>
    </>
}