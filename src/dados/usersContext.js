import { createContext, useState } from "react";
import { useSession } from "next-auth/react"
import axios from "axios";

const userContext = createContext({})

export function UserProvider(props) {
    const [dateUser, setDataUser] = useState({})
    const [dark, setDark] = useState('')


    const { data: session, status } = useSession()

    async function sessao(email) {
        if (email) {
            const date = await axios.get(`http://localhost:3000/api/users/${email}`)
            const resp = await date.data.response
            return resp
        }
    }


function setarDark(){
    if (!dark) {
       setDark('dark')
    } else {
       setDark('')
    }
}


    return (
        <userContext.Provider value={{
            sessao: sessao,
            dateUser,
            dark,
            setDark,
            setarDark:setarDark

        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext