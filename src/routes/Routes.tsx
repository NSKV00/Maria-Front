import { Route, Routes} from "react-router-dom"
import { Configs } from "../pages/configs/Configs"
import { Login } from "../pages/login/Login"
import { Home } from "../pages/home/Home"

export function MainRoutes(){
    
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/configs" element={<Configs/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
}