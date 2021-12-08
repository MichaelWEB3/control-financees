import { useState, useEffect } from "react"
import { IconCoracao, IconLogout, IconMenu } from "../icons"
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import router from "next/router"
import Cookies from "js-cookie"
import useDados from "../../dados/userHooke";

export default function Lateral(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)

        })



    }, [dadosUsuario, dadosOnline])

    return (
        <>

            <div className={`hidden md:flex w-3/12 h-full bg-withe flex-col p-5   ${dadosUsuario.dark == 'dark' ? 'bg-gray-600 text-gray-100' : 'text-gray-700'}`}>
                <div>
                    <Link href={`/user/${dadosOnline?.email}`}>
                        <div className="w-full flex flex-row items-center justify-center border-b-2 border-fuchsia-60 p-2 m-2 cursor-pointer">

                            {dadosOnline?.photo ? <img className="rounded-full m-2 h-14 w-14" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}
                            <div className="flex flex-col"> <span className="m-1">Ola</span> <span className={`bold  font-bold 	`}>{dadosOnline?.nome}, {dadosOnline?.idade} anos</span></div>
                        </div>
                    </Link>
                </div>


                <div className="flex flex-col p-5 m-2 ">
                    <span className={`text-sm  bold  font-bold flex `}><span className="mr-5">Users favorites</span> <span className={`text-red-600`}>{IconCoracao}</span> </span>
                    <div className="flex flex-col p-2 m-2">
                        <ul>
                            {dadosOnline?.favs?.map((userfav, idex) => {
                                return <li key={userfav.id}>
                                    <div className="flex flex-row  items-center"> {userfav?.photo ? <img className="rounded-full m-5  h-14 w-14" src={`${userfav?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />} <Link href={`/search/${userfav.email}`}><span className=" font-bold mr-5 cursor-pointer">{userfav.nome} </span></Link> <span className="text-red-600">{IconCoracao}</span> </div>
                                </li>
                            })}
                        </ul>


                    </div>
                </div>

            </div>


        </>
    )
}