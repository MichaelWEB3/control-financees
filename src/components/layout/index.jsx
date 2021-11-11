import { useEffect, useState } from "react"
import { IconMenu } from "../icons"
import Menu from "./menu"
import Cookies from "js-cookie";
import router from "next/router"
import Lateral from "./laretal";
import useDados from "../../dados/userHooke";

export default function Layout(props) {

    const [menu, setMenu] = useState(false)
    const cokie = Cookies.get('login')
    const dados = useDados()

    useEffect(() => {
        if (cokie == 'false' || cokie == undefined) {
            router.push('/')
        }
    }, [])

    return (
        <div className={`
        flex
        flex-row
        heigue
        ${dados.dark == 'dark' ? 'bg-gray-600 text-gray-100':false}
     
        `}>
            <Menu menu={menu} perfil={props.perfil} financas={props.financas} />

            <div className={`
            h-full
            flex
            w-full sm:w-10/12
              
            lft
            ${dados.dark == 'dark' ? 'bg-gray-500 text-gray-100':' bg-blue-100 text-gray-700'}
            
            `}>
                <span className={`sm:hidden p-2 cursor-pointer absolute`} onClick={() => menu ? setMenu(false) : setMenu(true)}>{IconMenu}</span>
                {props.children}
            </div>

            <Lateral />
        </div>
    )
}