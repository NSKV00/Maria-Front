import {Routes, Route} from "react-router-dom"
import { Home } from "../pages/Home/home"
import { Login } from "../pages/Login/login"
export function MainRoutes(){
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
}