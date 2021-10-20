import { useState } from "react"
import { IconLogout, IconMenu } from "../icons"
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import router from "next/router"
import Cookies from "js-cookie"

export default function Menu(props) {

    function deslogar() {

        Cookies.set('login', false)
        signOut()
        router.push('/')


    }


    return (
        <>

            <nav className={` ${props.menu ? 'flex' : 'hidden'}  sm:flex w-2/12  h-screen pt-2 bg-white items-center justify-center text-gray-500 flex-col`}>
                <h1 className="hidden md:flex sm:text-sm md:text-1xl lg:text-2xl m-2">Control Finaces</h1>



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
                    <li value="financas"  ><Link href="/perfil"><span className={`
                    mt-5
                    p-2
                    flex
                    items-center
                    justify-center
                    text-4md
                    text-gray-600
                    cursor-pointer
                    hover:bg-green-100
                    
                    ${props.perfil == true ? 'bg-green-200 border-r-2  border-green-600' : ''}
                    
                `} >Perfil</span></Link></li>

                    <li value="financas"  ><Link href="/financas"><span className={`
                    mt-5
                    p-2
                    flex
                    items-center
                    justify-center
                    text-4md
                    text-gray-600
                    cursor-pointer
                    hover:bg-green-100
                    ${props.financas == true ? 'bg-green-100 border-r-2  border-green-600' : ''}
                    
                `}
                    >Finaças</span></Link></li>
           
                </ul>

                <h1 className={`
                
                sm:flex
                p-2
                cursor-pointer
                hover:text-red-400
                
                `} onClick={() => deslogar()}>{IconLogout}</h1>

            </nav>
        </>
    )
}