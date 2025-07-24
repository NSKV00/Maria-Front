import React, { useState } from "react"
import style from "./style.module.css"
interface ModalProps {
    callback:()=>void,
    children:React.ReactNode
}
export const Modal=({callback,children}:ModalProps)=>{
    const [open,setOpen] = useState(true)
    const close=()=>{
        setOpen(false)
        callback()
    }
    return open&& <div className={style.wrapper}>
        <div className={style.modal}>
            <button onClick={close}>fechar</button>
            {children}
        </div>
    </div>
}