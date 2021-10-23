import { useState, useEffect } from "react"
import { IconLogout, IconMenu } from "../icons"
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
            console.log(resp)
        })



    }, [])

    return (
        <>

            <div className="hidden md:flex w-4/12 h-full bg-withe flex-col p-5">
                <div>
                    <div className="w-full flex flex-row items-center justify-center border-b-2 border-fuchsia-60 p-2 m-2">

                        {dadosOnline?.photo ? <img className="rounded-full m-2" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}
                        <span className="m-1">Ola,</span> <h1 className="text-gray-700 bold  font-bold 	">{dadosOnline?.nome}, {dadosOnline?.idade} anos</h1>
                    </div>
                </div>
                
            </div>


        </>
    )
}