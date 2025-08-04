import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { useEffect } from "react"
import { apiController } from "../../controller/api.controller"
import { GraficoVendasAnual } from "../../components/grafico/Grafico"
import { Grafico2DespesasAnual } from "../../components/grafico2/Grafico"
import { GraficoLucroVsDespesas } from "../../components/grafico3/grafico"
import style from "./style.module.css"
import { Footer } from "../../components/footer/Footer"

export const Relatorio = ()=>{
    const navigate = useNavigate()
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

useEffect(()=>{
            const token = localStorage.getItem("token")
            if (!token){
                navigate("/login")
            }else {
                validateUser(token)
            }
        },[])                    

    return <>
        <Header></Header>

        <main className={style.main}>
            <GraficoVendasAnual></GraficoVendasAnual>
            <Grafico2DespesasAnual></Grafico2DespesasAnual>
            <GraficoLucroVsDespesas></GraficoLucroVsDespesas>
        </main>

        <Footer></Footer>
    </>
}