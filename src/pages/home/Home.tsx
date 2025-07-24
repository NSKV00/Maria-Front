import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { apiController } from "../../controller/api.controller"

export const Home = ()=>{
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
    const update=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("update",e.target.files)
        const reader = new FileReader()
        const file = e.target.files![0]
        reader.readAsText(file)
        reader.onload=(even)=>{
            console.log("reader",even.target!.result)
        }
        
    }
    useEffect(()=>{
        console.log("use effect")
        const token = localStorage.getItem("token")
        if (!token){
            navigate("/login")
        }else {
            validateUser(token)
        }
    },[])

    return<>
        <Header/>

        <main>
            <h5>ltgcltodltutgfvkyrd</h5>
        </main>
    </>
}