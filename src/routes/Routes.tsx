import { Route, Routes} from "react-router-dom"
import { Login } from "../pages/login/Login"
import { Home } from "../pages/home/Home"
import { Vendas } from "../pages/vendas/Vendas"
import { Relatorio } from "../pages/relatorio/Relatorio"

export function MainRoutes(){
    
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/vendas" element={<Vendas/>}/>
        <Route path="/relatorio" element={<Relatorio/>}/>
    </Routes>
}