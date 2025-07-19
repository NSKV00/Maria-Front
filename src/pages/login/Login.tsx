import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Link } from "react-router-dom"
import style from "./style.module.css"

export const Login = ()=>{
    const navigate = useNavigate()

    return<>
        <Header/>

        <main className={style.main}>
            <form className={style.form}>

                <fieldset>
                    <label htmlFor="name">Nome</label>
                    <input  id="name" type="text" placeholder="Digite seu Nome"
                    //  onChange={(e)=>setName(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" placeholder="Digite sua senha"
                    //  onChange={(e)=>setPass(e.target.value)}
                    />

                </fieldset>

                <button type="submit">Cadastrar-se</button>

            </form>
        </main>

        {/* <main className={style.main}>
            <form>
                <input type="text" />
            </form>
        </main> */}

        {/* <main className={style.main}>
        <form className={style.form} onSubmit={handleSubmit(fazerLogin)}>
            <Input errorMsg={errors.email&&errors.email.message} 
            label="E-mail" type="text" placeholder="escreva seu e-mail" register={register("email")}/>
           
            <Input errorMsg={errors.password&&errors.password.message} 
                label="Senha" type="password" placeholder="****" register={register("password")}
            />
            <button type="submit">Login</button>
        </form>
    </main> */}
    
    </>
}