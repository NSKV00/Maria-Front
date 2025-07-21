import {Routes, Route} from "react-router-dom"
import { Home } from "../Home/home"

export function MainRoutes(){
    return <Routes>
        <Route path="/" element={<Home/>} />

    </Routes>
}