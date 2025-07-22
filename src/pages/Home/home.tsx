import { useEffect } from "react"
// import { Header } from "../../components/header/Header"
import { useNavigate } from "react-router-dom"
import { apiController } from "../../controller/api.controller"
import style from "../home/style.module.css"

export const Home=()=>{
    // const navigate = useNavigate()

    // const validateUser=async(token:string)=>{
    //     try {
    //         const res = await apiController.get("usuarios/retrieve",{
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         if(res.data){
    //             localStorage.setItem("user",JSON.stringify(res.data))
    //         }
    //     } catch (error) {
    //         console.log(error,"eror")
    //         localStorage.removeItem("token")
    //         localStorage.removeItem("user")
    //          navigate("/login")
    //     }
    // }
    // useEffect(()=>{
    //     console.log("use effect")
    //     const token = localStorage.getItem("token")
    //     if(!token){
    //         navigate("/login")
    //     }else{
    //         validateUser(token)
    //     }
    // },[])
    return <>
    
    <main>
        
       

        <div className={style.cardapio}>
            <h2>Cardápio:</h2>
        </div>

        <div className={style.sabor}>
            <h2>Sabores</h2>
        </div>
        <div className={style.sabores}>
            <p>Morango</p>
            <p>Chocolate</p>
            <p>Baunilha</p>
        </div>
        <button>Adicionar</button>
    </main>
    </>
}


{/* <Header hidden="home"/> */}