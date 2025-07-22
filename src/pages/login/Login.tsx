import { Header } from "../../components/header/Header"
import { Link } from "react-router-dom"
import style  from "./style.module.css"



export const Login = ()=>{
    const navigate = useNavigate()

    return<>
        <Header/>

        <main className={style.main}>
            <div className={style.login}>
                <h2>Doces CallMaria</h2>
                <form className={style.form}>
                    <fieldset>
                        <label htmlFor="name">Nome de Usuário</label>
                        <input  id="name" type="text" placeholder="Digite seu Usuário"//  onChange={(e)=>setName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" placeholder="Digite sua senha"//  onChange={(e)=>setPass(e.target.value)}
                        />
                    </fieldset>

                    <button type="submit">Logar</button>
                </form>
            </div>
        </main>
    </>
}
