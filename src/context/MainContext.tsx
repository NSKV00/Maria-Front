import React, { createContext, useContext, useState } from 'react';
// import type { ReturnUser } from '../schemas/usuario.schemas';
// import type { iPosts } from '../schemas/posts.schemas';

 interface iContext {
//     user: ReturnUser,
//     setUser: React.Dispatch<React.SetStateAction<ReturnUser>>
//     name:string,
//     setName: React.Dispatch<React.SetStateAction<string>>
//     posts:iPosts,
//     setPosts:React.Dispatch<React.SetStateAction<iPosts>>
 }

export const MainContext = createContext<iContext>({} as iContext);

interface MainContextProps {
    children: React.ReactNode
}

export const MainContextProvider=({children}:MainContextProps)=>{
    //const [user,setUser] = useState({} as ReturnUser)
    const [name,setName] = useState("")
    //const [posts,setPosts] = useState({}as iPosts)
    return <MainContext.Provider value={{name,setName}}>

        {children}

    </MainContext.Provider>
} 

//user,setUser , posts,setPosts