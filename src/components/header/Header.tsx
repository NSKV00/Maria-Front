import { Link } from "react-router-dom"
import { useEffect } from "react"
import { createIcons, icons } from "lucide"
import style from "./style.module.css"
import "../../index.css"

export const Header:React.FC=()=>{
    const MenuLateral = ()=>{
        const overlay = document.getElementById("overlay")
        const menu = document.getElementById("Menu")

        if (menu && overlay) {
            menu.classList.toggle(style.open)
            overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
        }
    }

    useEffect(()=>{
        createIcons({ icons })
    }, [])

    return <>
        <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>

        <div id="Menu" className={style.Menu}>
            <Link to="/vendas" ><span data-lucide="shopping-bag"></span>Vendas</Link>
            <Link to="/despesa" ><span data-lucide="wallet"></span>Despesas</Link>
            <Link to="/relatorio"><span data-lucide="bar-chart"></span>Relatórios</Link>
            {/* <Link to="/vendas" data-lucide="shopping-bag">Vendas</Link>
            <Link to="/vendas" data-lucide="shopping-bag">Vendas</Link> */}
            {/* {/*
            <a href="#"><i data-lucide="package"></i> Produtos</a> */}
            {/* <a href="/vendas"><i data-lucide="credit-card"></i> Vendas</a>
            <a href="#"><i data-lucide="bar-chart"></i> Relatórios</a>
            <a href="#"><i data-lucide="settings"></i> Configurações</a> */}
        </div>

        <header className={style.header}>
            <div className={style.MenuLateral} onClick={MenuLateral}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <Link to="/" className={style.logo}>Doces CallMaria</Link>

            

            <div className={style.divTransparente}></div>
        </header>
    </>
}
