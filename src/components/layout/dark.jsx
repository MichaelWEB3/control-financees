import { useState, useEffect } from "react"
import { IconLogout, IconLua, IconLupa, IconMenu, IconSol } from "../icons"
import Link from "next/link"
import Cookies from "js-cookie"
import useDados from "../../dados/userHooke";

export default function Dark(props) {

    const [dark, setdark] = useState('')
    const dados = useDados()
    useEffect(() => {
        
        console.log(dados.dark)
    }, [])






    return (
        <>
            <div className={`w-20 h-7 rounded-full p-2 bg-gray-200 flex flex-row ${dados.dark == 'dark' ? 'justify-end':'justify-start'} items-center `}>
                <button onClick={() => {
                    if (!dados.dark) {
                        dados.setarDark()
                    } else {
                        dados.setarDark()
                    }
                }}>{dados.dark == 'dark'? <span className="text-yellow-600">{IconSol}</span>:<span className="text-blue-800">{IconLua}</span> }</button>

            </div>

        </>
    )
}