import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { apiController } from "../../controller/api.controller"
import { Footer } from "../../components/footer/Footer"
import style from "./style.module.css"
import type { creteProduto } from "../../schemas/produto.schemas"
import { toast } from "react-toastify"
import type { venda } from "../../schemas/venda.schemas"

export const Home = ()=>{
    const navigate = useNavigate()
    const [produto,setProduto] = useState<creteProduto[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [modalOpen3, setModalOpen3] = useState(false)
    const [modalOpen4, setModalOpen4] = useState(false)
    const [mostrarInativos, setMostrarInativos] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState<Partial<creteProduto>>({})
    const [vendaSelecionado, setVendaSelecionado] = useState<venda>()
    

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

const openModal = (produto:any) => {
        setProdutoSelecionado(produto)
        setModalOpen(true)
}

const openModal2 = () => {
        setModalOpen2(true)
}

const openModal3 = () => {
        setModalOpen3(true)
}

const openModal4 = () => {
        setModalOpen4(true)
}

const deletarProduto = async (id:number) => {
    try {
    const res = await apiController.delete(`produto/${id}`)

    return res.data        
    } catch (error) {
        console.error("Erro ao deletar produto:", error)
    }

}

const buscar = async (nome:string) => {
    try {
        const res = await apiController.get("produto",{
            params: {
                name:nome
            }
        })

        return res.data
    } catch (error) {
        console.error("nao foi encontrado nada:", error)
    }
}

const criarVenda = async (venda:venda) => {
    try {
        const res = await apiController.post("venda", {
            quantidade: venda.quantidade,
            lucro: venda.lucro,
            sabor: venda.sabor
        })

        return res.data
    } catch (error) {
        console.error("Erro ao criar a venda:", error)
    }
}

const criarProduto = async (produto:creteProduto) => {
    try {
        const res =  await apiController.post("produto",{
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      url: produto.url,
      ativo: produto.ativo
    })

    return res.data
    } catch (error) {
     console.error("Erro ao deletar produto:", error)
    }
    
}
const atualizar = async (produto: Partial<creteProduto>, id:number) => {
  try {
    const res = await apiController.patch(`produto/${id}`, {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      url: produto.url,
      ativo: produto.ativo
    })

    

    return res.data
  } catch (error) {
    console.error("Erro ao atualizar produto:", error)
  }
}

    const pegarTodosUser = async (paramN?: string) => {
  const { data } = await apiController.get("produto", {
    params: { nome: paramN }
  })
  setProduto(data.sort((a: { id: number }, b: { id: number }) => a.id - b.id))
}

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (!token){
            navigate("/login")
        }else {
            validateUser(token)
            pegarTodosUser()
        }
    },[])

    return<>
        <Header/>
        
        <main className={style.main}>
        <div className={style.divPesquisa}>
        <div className={style.inputWrapper}>
        <input className={style.input} type="text" placeholder="Sabor que deseja..." onChange={async (e) => { 
            const valor = e.target.value
            if (valor.trim() === "") {
            pegarTodosUser()
            return
        }
            const resultado = await buscar(valor)
            if (resultado) { setProduto(resultado)}}
        }
/>
</div>
            <div className={style.divBotaoCriar}>
                <button className={style.botaoCriar} onClick={() => openModal2()}>Adicionar Cupcake</button>
                <button className={style.botaoCriar} onClick={() => openModal4()}>Criar Venda</button>
                <button className={style.botaoCriar} onClick={() => setMostrarInativos((prev) => !prev)}>
  {mostrarInativos ? "Ver Ativos" : "Ver Inativos"}</button>
            </div>
        </div>

            <div className={style.divB}>
        {produto.filter(item => item.ativo === !mostrarInativos).map((item, index) => (
            <article onClick={() => openModal(item)} key={index.id} className={style.article}>
                <img className={style.img} src={item.url} alt={`Imagem do produto ${item.nome}`} />
                <div className={style.divA}>
                    <h1 className={style.textoNome}>{item.nome}</h1>
                    <p>{item.descricao}</p>
                </div>
            </article>
        ))}
    </div>
            
        </main>
{modalOpen4 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen3(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <p className={style.modalLinha}>Quantidade: <input className={style.inputBonito} type="text" onChange={(e) => setVendaSelecionado({...vendaSelecionado, quantidade: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Lucro: <input className={style.inputBonito}  type="text"  onChange={(e) => setVendaSelecionado({...vendaSelecionado, lucro: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Sabor: <input className={style.inputBonito}  type="text"  onChange={(e) => setVendaSelecionado({...vendaSelecionado, sabor: e.target.value})}/></p>
        <div className={style.divBotao}></div>
        <div className={style.divBotao}>
        <button className={`${style.botaoModal} ${style.erro}`} onClick={() => {
            setModalOpen4(false)
        }}>Cancelar</button>
        <button className={`${style.botaoModal} ${style.sucesso}`} onClick={async () => {
            const criado = await criarVenda(vendaSelecionado as venda)

            if(!criado){
                {toast.error("Erro ao criar a venda")
                    return
            }}

            toast.success("Venda criada com sucesso")
            setTimeout(() => {setModalOpen4(false)}, 3600)
        }}>Criar</button>
        </div>

    </div>
    </div>
)}    


    {modalOpen3 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen3(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <div className={style.divBotao}>
        <button className={`${style.botaoModal} ${style.erro}`} onClick={() => {
            setModalOpen3(false)
        }}>Cancelar</button>
        <button className={`${style.botaoModal} ${style.sucesso}`} onClick={async () => {
        const deletado = await deletarProduto(produtoSelecionado.id)

        if(!deletado){
            toast.error("Erro ao deletar produto")
        }

        toast.success("Produto Deletado com sucesso") 
        setTimeout(() => {
            setModalOpen3(false)
            pegarTodosUser()
        } , 3600)
        

    }}>Confirmar</button>
        </div>

    </div>
    </div>
)}    

     {modalOpen2 && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen2(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <p className={style.modalLinha}>Sabor: <input className={style.inputBonito} type="text" onChange={(e) => setProdutoSelecionado({...produtoSelecionado, nome: e.target.value})}/></p>
        <p className={style.modalLinha}>Descrição: <input className={style.inputBonito}  type="text"  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, descricao: e.target.value})}/></p>
        <p className={style.modalLinha}>preco: <input className={style.inputBonito}  type="text"  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, preco: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Url da imagem: <input className={style.inputBonito}  type="text"  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, url: e.target.value})}/></p>    
        <p className={style.modalLinha}>Ativo:   <select className={style.inputBonito}  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, ativo: e.target.value === "true"})}> <option value="true">Ativo</option> <option value="false">Inativo</option> </select></p>    
        <div className={style.divBotao}>
        <button className={`${style.botaoModal} ${style.erro}`}onClick={() => setModalOpen2(false)}>Fechar</button>
        <button
  className={`${style.botaoModal} ${style.sucesso}`}
  onClick={async () => {
    if (!produtoSelecionado.nome || !produtoSelecionado.descricao || !produtoSelecionado.preco || !produtoSelecionado.url) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const criado = await criarProduto(produtoSelecionado as creteProduto)

    if (criado) {toast.success("Produto criado com sucesso") 
      setTimeout(() => {setModalOpen2(false)
      pegarTodosUser()}, 3600)
    } else {toast.error("Erro ao criar o produto")
        setTimeout(() => {setModalOpen2(false)}, 3600)
    }}}>Criar
</button>
        </div>
        
    </div>
    </div>
)}

    {modalOpen && (
    <div className={style.modalBackdrop} onClick={() => setModalOpen(false)}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <p className={style.modalLinha}>Sabor: <input className={style.inputBonito} type="text" value={produtoSelecionado.nome} onChange={(e) => setProdutoSelecionado({...produtoSelecionado, nome: e.target.value})}/></p>
        <p className={style.modalLinha}>Descrição: <input className={style.inputBonito}  type="text" value={produtoSelecionado.descricao} onChange={(e) => setProdutoSelecionado({...produtoSelecionado, descricao: e.target.value})}/></p>
        <p className={style.modalLinha}>preco: <input className={style.inputBonito}  type="text" value={produtoSelecionado.preco} onChange={(e) => setProdutoSelecionado({...produtoSelecionado, preco: Number(e.target.value)})}/></p>
        <p className={style.modalLinha}>Url da imagem: <input className={style.inputBonito}  type="text" value={produtoSelecionado.url} onChange={(e) => setProdutoSelecionado({...produtoSelecionado, url: e.target.value})}/></p>    
        <p className={style.modalLinha}>Ativo:   <select className={style.inputBonito} value={produtoSelecionado.ativo ? "true" : "false"} onChange={(e) => setProdutoSelecionado({...produtoSelecionado, ativo: e.target.value === "true"})}> <option value="true">Ativo</option> <option value="false">Inativo</option> </select></p>    
    <div className={style.divBotao}>
    <button className={`${style.botaoModal} ${style.erro}`} onClick={() => setModalOpen(false)}>Fechar</button>
    <button className={`${style.botaoModal} ${style.sucesso}`} onClick={async () => {
    const produtoAtualizado = await atualizar(produtoSelecionado, produtoSelecionado.id)
    if (produtoAtualizado) {
        toast.success("Produto Atualizado com sucesso") 
        setTimeout(() => {
            setModalOpen(false)
            pegarTodosUser()
        } , 3600)
    } else {toast.error("Erro ao atualizar produto")}}}>
    Atualizar </button>
    <button className={`${style.botaoModal} ${style.erro}`} onClick={() => {
        setModalOpen(false)
        setTimeout(() => {
            openModal3()
        }, 200);
    }}>Deletar</button>
    </div>
    </div>
  </div>
)}

        <Footer></Footer>
    </>
}