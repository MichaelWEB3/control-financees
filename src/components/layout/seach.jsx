import { useState, useEffect } from "react"
import { IconLupa, } from "../icons"
import Link from "next/link"
import { useSession } from "next-auth/react"
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
    }, [dadosOnline, session, dadosUsuario])
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
            <span className={`flex m-2 w-30  sm:w-60 h-10 rounded-full    ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}  p-2`}>  <input type="text" placeholder="Searcher" className={`form-input p-2  w-20 sm:w-60 rounded-full  border-solid border-1  ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100 seachrdark' : ' bg-blue-50 text-gray-700'}  `} onKeyUpCapture={() => { temConta() }} value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} /> <span className="hidden sm:flex">{IconLupa}</span> </span>
            {pesquisa && pesquisados &&
                <div className="flex  flex-col rounded-2xl  p-2 ">
                    {pesquisados.map((resp, index) => {
                        <ul key={index}>
                            {console.log(resp)}
                            <li key={resp._id} className="flex items-center">{resp?.photo ? <img className="rounded-full w-10 m-2" src={`${resp?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />} <Link href={`/search/${resp.email}`}>{resp.nome}</Link> </li>
                        </ul>
                    }
                    )}
                </div>
            }



        </>
    )
}