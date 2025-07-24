import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../Components/header/Header"
import { apiController } from "../../controller/api.controller"
import style from "../home/style.module.css"
import React, { useState } from 'react';
import { Modal } from "../../Components/modal/Modal"

export const Home=()=>{
    const [showModal,setShowModal]= useState(false)
    const openModal=()=>{
        setShowModal(!showModal)
    }
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
    return <>
    <Header/>
    <main className={style.main}>
        
        <div className={style.cardapio}>
            <h2>Cardápio:</h2>
        </div>

        <div className={style.sabor}>
            <h2>Sabores</h2>
        </div>
        <div className={style.sabores}>
         <div onClick={openModal}>
            <p>Morango</p>
        </div>
          <div onClick={openModal}>
            <p>Chocolate</p>
        </div>
         <div onClick={openModal}>
            <p>Baunilha</p>
        </div>
        </div>
        
        <button onClick={openModal}>Adicionar</button>
        {showModal&&<Modal callback={openModal}>
            <fieldset>
                <legend>Adicionar Cupcake</legend>
                <label htmlFor="name">Sabor</label>
                <input  id="name" type="text" placeholder="Digite o Sabor"/>
                <label htmlFor="descricao">Descrição</label>
                <input  id="name" type="text" placeholder="Digite a Descrição"/>
                <button>Adicionar</button>
            </fieldset>
            </Modal>}
    </main>
    </>
}
