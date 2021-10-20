import { useEffect, useState } from "react"
import { IconMenu } from "../icons"
import Menu from "./menu"
import Cookies from "js-cookie";
import router from "next/router"


export default function Layout(props) {

    const [menu, setMenu] = useState(false)
    const cokie = Cookies.get('login')
  

    useEffect(() => {
        if (cokie == 'false' || cokie == undefined) {
            router.push('/')
        }
    }, [])

    return (
        <div className={`
        flex
        flex-row
        h-screen
        `}>
            <Menu menu={menu} perfil={props.perfil} financas={props.financas} />

            <div className={`
            flex
            w-full sm:w-11/12
            h-full
            bg-green-100
            `}>
                <span className={`sm:hidden p-2 cursor-pointer`} onClick={() => menu ? setMenu(false) : setMenu(true)}>{IconMenu}</span>
                {props.children}
            </div>
        </div>
    )
}