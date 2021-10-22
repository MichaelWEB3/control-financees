import { useEffect, useState } from "react"
import { IconMenu } from "../icons"
import Menu from "./menu"
import Cookies from "js-cookie";
import router from "next/router"
import Lateral from "./laretal";

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
        heigue
        
        `}>
            <Menu menu={menu} perfil={props.perfil} financas={props.financas} />

            <div className={`
            h-full
            bg-green-100
            flex
            w-full sm:w-10/12
           
  
            `}>
                <span className={`sm:hidden p-2 cursor-pointer absolute`} onClick={() => menu ? setMenu(false) : setMenu(true)}>{IconMenu}</span>
                {props.children}
            </div>

            <Lateral />
        </div>
    )
}