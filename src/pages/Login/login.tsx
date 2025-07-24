
import { Header } from "../../Components/header/Header"
import style from "./style.module.css"
import { apiController } from "../../controller/api.controller"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { loginSchemas, type loginUser } from "../../schemas/login.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../Components/input/Input"
import { useContext } from "react"
import { MainContext } from "../../context/MainContext"

// import { useNavigate } from "react-router-dom"
// import { Header } from "../../components/header/Header"
// import { Link } from "react-router-dom"
// import style  from "./style.module.css"



export const Login = ()=>{
     const navigate = useNavigate()
    const { setUser } = useContext(MainContext)
    
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<loginUser>({
        mode:"onBlur",
        resolver: zodResolver(loginSchemas)
    })

    const fazerLogin = async (loginData:loginUser) => {
        console.log(loginData,"loginData")
       
      try {
         const res = await apiController.post("/login",loginData)
            console.log(res,"res do axios")
       if(res.data.token){
            toast.success("Sucesso, login")
            localStorage.setItem("token",res.data.token)
            setUser(res.data)
            setTimeout(() => {
                navigate("/")
            }, 3000);
       }
      } catch (error:any) {
        console.log(error,"error")
        toast.error(error.response.data.message)
      }
        
    }

    return<>
        <Header/>

        <main className={style.main}>
            <div className={style.login}>
                <h2>Doces CallMaria</h2>
                <form className={style.form} onSubmit={handleSubmit(fazerLogin)}>

                    <Input errorMsg={errors.name && errors.name.message}
                    label="Name" type="text" placeholder="Digite seu Usuário" register={register("name")} />

                    <Input errorMsg={errors.password && errors.password.message}
                    label="password" type="password" placeholder="Digite sua senha" register={register("password")} />

                        {/* <label htmlFor="name">Nome de Usuário</label>
                        <input  id="name" type="text" placeholder="Digite seu Usuário"//  onChange={(e)=>setName(e.target.value)}
                        />

                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" placeholder="Digite sua senha"//  onChange={(e)=>setPass(e.target.value)}
                        /> */}

                    {/* <Input label="Senha" placeholder="" register={register("password")} 
                    type="password" errorMsg={errors.password && errors.password.message}/> */}

                    <button type="submit">Logar</button>
                </form>
            </div>
        </main>
    </>
}
