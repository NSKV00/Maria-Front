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
            <Link to="/relatorios"><span data-lucide="bar-chart"></span>Relatórios</Link>
            <Link to="/configs"><span data-lucide="settings"></span>Configurações</Link>
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

            <Link to="/login">
                <button className={style.loginBtn}>Login</button>
            </Link>
        </header>
    </>
}

// import { Link } from "react-router-dom"
// import { useEffect } from "react"
// import { createIcons, icons} from "lucide"
// import style from "./style.module.css"
// import "../../index.css"

// interface HeaderProps {
//     hiddenExpenses?:boolean
//     hiddenhome?:boolean
//     hiddenLogin?:boolean
//     hiddenSales?:boolean
//     hiddenReturn?:boolean
// }

// export const Header: React.FC = ()=>{
//     const MenuLateral = () => {
//         const overlay = document.getElementById("overlay")
//         const menu = document.getElementById("Menu")

//         if (menu && overlay) {
//             menu.classList.toggle(style.open)
//             overlay.style.display = menu.classList.contains(style.open) ? "block" : "none"
//         }
//     }

//     useEffect(() => {
//         createIcons({ icons })
//     }, [])

//     return <>
//     <div id="overlay" className={style.overlay} onClick={MenuLateral}></div>

//     <div id="Menu" className={style.Menu}>
//         <a href="#"><i data-lucide="shopping-bag"></i> Vendas</a>
//         <a href="#"><i data-lucide="package"></i> Produtos</a>
//         <a href="#"><i data-lucide="credit-card"></i> Despesas</a>
//         <a href="#"><i data-lucide="bar-chart"></i> Relatórios</a>
//         <a href="#"><i data-lucide="settings"></i> Configurações</a>
//         {/* <Link to={"/vendas"} data-lucide="shopping-bag"> Vendas</Link>
//         <Link to={"/produtos"} data-lucide="package"> Produtos</Link>
//         <Link to={"/despesas"} data-lucide="credit-cart"> Despesas</Link>
//         <Link to={"/relatorios"} data-lucide="bar-chart"> Relatórios</Link>
//         <Link to={"/configs"} data-lucide="settings"> Configurações</Link> */}
//     </div>

//     <header className={style.header}>
//         <div className={style.MenuLateral} onClick={MenuLateral}>
//             <div></div>
//             <div></div>
//             <div></div>
//         </div>

//         <Link to={"/"} className={style.logo}>Doces CallMaria</Link>

//         <Link to={"/login"}>
//             <button className={style.loginBtn}>Login</button>
//         </Link>
//     </header>
//     </>
// }