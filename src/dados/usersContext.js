import { createContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios";

const userContext = createContext({})

export function UserProvider(props) {
    const [dateUser, setDataUser] = useState({})
    const { data: session, status } = useSession()

    async function sessao(email) {
        if (email) {
            const date = await axios.get(`http://localhost:3000/api/users/${email}`)
            const resp = await date.data.response
            return resp
        }
    }




    return (
        <userContext.Provider value={{
            sessao: sessao,
            dateUser

        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext