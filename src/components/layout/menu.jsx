import { IconLogout } from "../icons"
import Link from 'next/link'
import { signOut } from "next-auth/react"
import router from "next/router"
import Cookies from "js-cookie"
import useDados from "../../dados/userHooke"
import * as React from "react";

export default function Menu(props) {
    const dados = useDados()
    function deslogar() {
        Cookies.set('login', false)
        signOut()
        router.push('/')
    }


    return (
        <>

            <nav className={`fixed ${props.menu ? 'flex' : 'hidden'}  sm:flex w-50 h-screen pt-2  items-center justify-center   ${dados.dark == 'dark' ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-500'}  flex-col`}>
                <span className="hidden md:flex sm:text-sm md:text-1xl lg:text-2xl m-2">Finance control</span>
                <ul className={
                    `
                 mt-10
                 w-full
                 h-screen
                
               `
                }>

                    <span className={`
                text-gray-200
                `}>Menu</span>
                    <Link href="/perfil">
                        <li value="financas"  >
                            <span className={`
                    mt-5
                    p-2
                    flex
                    items-center
                    justify-center
                    text-4md
                    text-gray-600
                    cursor-pointer
                    ${dados.dark == 'dark' ? 'bg-gray-300 text-gray-100 hover:bg-gray-400 ' : '  bg-blue-100 text-gray-500 hover:bg-blue-100'}
                    ${props.perfil == true ? 'bg-blue-200 border-r-2  border-blue-600' : ''}
                    
                `} >Perfil
                            </span>
                        </li>
                    </Link>

                    <li value="financas"  ><Link href="/financas"><span className={`
                    mt-5
                    p-2
                    flex
                    items-center
                    justify-center
                    text-4md
                    text-gray-600
                    cursor-pointer
                  
                    ${dados.dark == 'dark' ? 'bg-gray-300 text-gray-100 hover:bg-gray-400 ' : '  bg-blue-100 text-gray-500 hover:bg-blue-100'}
                    ${props.financas == true ? 'bg-blue-200 border-r-2  border-blue-600' : ''}
                    
                `}
                    >Finances</span></Link></li>

                </ul>

                <span className={`
                
                sm:flex
                p-2
                cursor-pointer
                hover:text-red-400
                
                `} onClick={() => deslogar()}>{IconLogout}</span>

            </nav>
        </>
    )
}