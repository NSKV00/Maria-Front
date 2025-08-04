import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import type { creteDespesa, returnDespesa } from "../../schemas/despesa.Schema"
import { useEffect, useState } from "react"
import { apiController } from "../../controller/api.controller"
import style from "./style.module.css"
import { toast } from "react-toastify"

export const Despesa = ()=>{
    const navigate = useNavigate() 
    const [despesa,setDespesa] = useState<returnDespesa[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [modalOpen3, setModalOpen3] = useState(false)
    const [despesaSelecionada, setDespesaSelecionada] = useState<returnDespesa | null>(null)
    const [offset, setOffset] = useState(0);
    const [filtroNome, setFiltroNome] = useState<string>("")
    const [filtroMes, setFiltroMes] = useState<string>("")

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
        
const openModal = (despesa:returnDespesa) => {
        setDespesaSelecionada(despesa)
        setModalOpen(true)
}

const openModal2 = () => {
        setModalOpen2(true)
}

const openModal3 = () => {
        setModalOpen3(true)
}

const criarDespesa = async (despesa:creteDespesa) => {
    try {
        const res =  await apiController.post("despesa",{
      nome: despesa.nome,
      valor: despesa.valor,
      mes: despesa.mes,
      ano: despesa.ano,
    })

    return res.data
    } catch (error) {
     console.error("Erro ao deletar produto:", error)
    }
    
}


const atualizar = async (despesa: Partial<creteDespesa>, id:number) => {
  try {
    const res = await apiController.patch(`despesa/${id}`, {
        nome: despesa.nome,
        valor: despesa.valor,
        mes: despesa.mes,
        ano: despesa.ano,
    })

    return res.data
  } catch (error) {
    console.error("Erro ao atualizar a venda:", error)
  }
}

const deletarDespesa = async (id:number) => {
    try {
    const res = await apiController.delete(`despesa/${id}`)

    return res.data        
    } catch (error) {
        console.error("Erro ao deletar a despesa:", error)
    }

}
        
        
            const pegarTodasDespesas = async (paramN?: string,paramA?: number,paramM?: string,limite?:number, offset2?:number) => {
          const { data } = await apiController.get("despesa", {
            params: { 
                name: paramN ,
                ano1: paramA,
                mes1:paramM,
                offset: offset2,
                limite: limite
            }
          })
        
          setDespesa(data.sort((a: { id: number }, b: { id: number }) => a.id - b.id));
        };
        
    useEffect(()=>{
            const token = localStorage.getItem("token")
            if (!token){
                navigate("/login")
            }else {
                validateUser(token)
                pegarTodasDespesas(undefined,undefined,undefined,100,offset)
            }
        },[])    

    return <>
    <Header></Header>

    <main>
        <div className={style.divBusca}>
            <div >
            <input type="text" name="" id="" value={filtroNome} placeholder="Qual despesa quer buscar" className={style.inputSelectEstilizado} onChange={e => {setFiltroNome(e.target.value) 
                pegarTodasDespesas(e.target.value, undefined, filtroMes, 100, offset)}}/>
            <select className={style.selectEstilizado} onChange={e => {setFiltroMes(e.target.value)
                pegarTodasDespesas(filtroNome, undefined, e.target.value, 100, offset)}}>
  <option value="">Todos</option>
  <option value="Janeiro">Janeiro</option>
  <option value="Fevereiro">Fevereiro</option>
  <option value="Março">Março</option>
  <option value="Abril">Abril</option>
  <option value="Maio">Maio</option>
  <option value="Junho">Junho</option>
  <option value="Julho">Julho</option>
  <option value="Agosto">Agosto</option>
  <option value="Setembro">Setembro</option>
  <option value="Outubro">Outubro</option>
  <option value="Novembro">Novembro</option>
  <option value="Dezembro">Dezembro</option>
</select>
            </div>
            <button onClick={() => {
                openModal3()
            }}> criar </button>
        </div>

        {despesa.map((item) => (
            <div key={item.id} className={style.despesaitem}>
                <div className={style.despesadivA}>
                    <h1 className={style.despesatextoNome}> Tipo de conta à pagar: {item.nome}</h1>
                    <p>Mes: {item.mes}</p>
                    <p>ano: {item.ano}</p>
                    <p>Valor: R${item.valor}</p>
                </div>
                <button onClick={() => openModal(item)}>Edit</button>
            </div>
        ))}

    </main>

    {modalOpen && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen(false)}>
    <div className={`${style.modalContent} ${style.divBotaoDespesa}`} onClick={e => e.stopPropagation()}>
        <div className={style.divPGap}>
        <p className={style.modalLinha}>Tipo de despesa: <input className={style.inputBonito} type="text" value={despesaSelecionada?.nome} onChange={(e) => setDespesaSelecionada({...despesaSelecionada, nome: e.target.value})}/></p>
        <p className={style.modalLinha}>Valor: <input className={style.inputBonito}  type="text" value={despesaSelecionada?.valor} onChange={(e) => setDespesaSelecionada({...despesaSelecionada, valor: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Mes: <input className={style.inputBonito}  type="text" value={despesaSelecionada?.mes} onChange={(e) => setDespesaSelecionada({...despesaSelecionada, mes: e.target.value})}/></p> 
        <p className={style.modalLinha}>Ano: <input className={style.inputBonito}  type="text" value={despesaSelecionada?.ano} onChange={(e) => setDespesaSelecionada({...despesaSelecionada, ano: Number(e.target.value)})}/></p>
        </div>
        <div className={style.divBotaoGap}>
            <button onClick={() => {
                setModalOpen(false)
            }}>Fechar</button>

   <button onClick={async () => {
        const atualizado = await atualizar(despesaSelecionada, despesaSelecionada?.id)
    if (atualizado) {
        toast.success("Venda Atualizado com sucesso") 
        setTimeout(() => {
            setModalOpen(false)
            pegarTodasDespesas(undefined,undefined,undefined,100,offset)
        } , 3600)
    } else {toast.error("Erro ao atualizar a venda")}
    }}>Atualizar</button>
    <button onClick={() => {
        setModalOpen(false)
        setTimeout(() => {
            openModal2()
        }, 200);
    }}>Deletar</button>
        </div>
    </div>
    </div>
)}

        {modalOpen2 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen2(false)}>
    <div className={`${style.modalContent} ${style.divBotaoDespesa}`} onClick={e => e.stopPropagation()}>
        <div className={style.despesaDelet}>
        <h1>Tem Certeza ?</h1>
        <div className={style.divBotaoGap}>        
        <button onClick={() => setModalOpen2(false)}>Cancelar</button>
        <button onClick={async () => {
            const deletado = await deletarDespesa(despesaSelecionada.id)
            if (deletado) {
        toast.success("Venda deletada com sucesso") 
        setTimeout(() => {
            setModalOpen2(false)
            pegarTodasDespesas(undefined,undefined,undefined,100,8)
        } , 3600)
    } else {toast.error("Erro ao deletar a venda")}
        } }>Confirmar</button>
        </div>
        </div>
    </div>
    </div>
)}

{modalOpen3 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen3(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <p className={style.modalLinha}>Nome: <input className={style.inputBonito} type="text" onChange={(e) => setDespesaSelecionada({...despesaSelecionada, nome: e.target.value})}/></p>
        <p className={style.modalLinha}>Valor: <input className={style.inputBonito}  type="text"  onChange={(e) => setDespesaSelecionada({...despesaSelecionada, valor: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Mes: <input className={style.inputBonito}  type="text"  onChange={(e) => setDespesaSelecionada({...despesaSelecionada, mes: e.target.value})}/></p>
        <p className={style.modalLinha}>Ano: <input className={style.inputBonito}  type="text"  onChange={(e) => setDespesaSelecionada({...despesaSelecionada, valor: Number(e.target.value)})}/></p>
        <div className={style.divBotao}></div>
        <div className={style.divBotaoGap2}>
        <button className={`${style.botaoModal} ${style.erro}`} onClick={() => {
            setModalOpen3(false)
        }}>Cancelar</button>
        <button className={`${style.botaoModal} ${style.sucesso}`} onClick={async () => {
            const criado = await criarDespesa(despesaSelecionada as creteDespesa)

            if(!criado){
                {toast.error("Erro ao criar a despesa")
                    return
            }}

            toast.success("Venda criada com despesa")
            setTimeout(() => {setModalOpen3(false)}, 3600)
        }}>Criar</button>
        </div>

    </div>
    </div>
)}  

    </>
}