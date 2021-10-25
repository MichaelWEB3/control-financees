import { useState, useEffect } from "react"
import { IconLogout, IconLupa, IconMenu } from "../icons"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import router from "next/router"
import Cookies from "js-cookie"
import useDados from "../../dados/userHooke";
import axios from "axios"
export default function Seach(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    const [pesquisa, setPesquisa] = useState('')
    const [pesquisados, setpesquisados] = useState(null)


    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)

        })



    }, [])



    async function temConta() {
        if (pesquisa) {
            const date = await axios.get(`http://localhost:3000/api/search/users/${pesquisa}`)
            const resp = await date.data.response
            if (resp) {
                setpesquisados(resp)
            }
        }

    }


    return (
        <>
            <span className=" flex h-10 rounded-full m-2     bg-green-50 p-2">  <input type="text" placeholder="Seacher" className="form-input p-2 text-gray-700 rounded-full bg-green-50 border-solid border-1" onKeyUpCapture={() => { temConta() }} value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} /> <span className="hidden sm:flex">{IconLupa}</span> </span>
            {pesquisa && pesquisados &&
                <div className="flex  flex-col rounded-2xl bg-green-50 p-2 ">
                    {pesquisados.map((resp) => 
                        <ul>
                            {console.log(resp)}
                            <li key={resp._id} className="flex items-center">{resp?.photo ? <img className="rounded-full w-10 m-2" src={`${resp?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />} <Link href={`/search/${resp.email}`}>{resp.nome}</Link> </li>
                        </ul>
                    )}
                </div>
            }



        </>
    )
}