import { Link } from "react-router-dom"
import style from "./style.module.css"

interface HeaderProps {
    hiddenExpenses?:boolean
    hiddenhome?:boolean
    hiddenLogin?:boolean
    hiddenSales?:boolean
    hiddenReturn?:boolean
}

export const Header = ({ hiddenExpenses, hiddenhome, hiddenLogin, hiddenSales, hiddenReturn}:HeaderProps)=>{
    
    
    
    
    
    return <header className={style.Header}>

        <Link to={"/"}>
            <h1 className={style.H1}>Doces CallMarias</h1>
        </Link>

        <nav className={style.nav}>
            <Link className={style.Link} to={"/login"}>Login</Link>
            
        </nav>


        {/* <nav >
            {!hiddenhome && <Link  to={"/"}>
            </Link>}
            </nav> */}
    </header>
}