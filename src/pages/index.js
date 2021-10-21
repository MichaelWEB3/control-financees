import { IconeGoogle, Mao } from "../components/icons";
import { useSession, signIn, signOut } from "next-auth/react"
import router from 'next/router'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies, { set } from "js-cookie";


export default function Home() {
  const { data: session, status } = useSession()

  const [conta, setconta] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEamil] = useState('')
  const [idade, setIdade] = useState('')
  const [verificado, setverificado] = useState(false)

  function GerenciarCookie(logado) {
    if (logado) {
      Cookies.set('login', logado, {
        //dias logado
        expires: 7
      })
    } else {
      Cookies.remove('login')
    }
  }

  async function temConta() {

    const date = await axios.get(`http://localhost:3000/api/users/${session?.user.email}`)
    const resp = await date.data.response
    if (resp) {

      setconta(true)
      
    }else{
      setverificado(true)
    }
  }
  
  async function authentic() {
    const data = await axios.post(`http://localhost:3000/api/users`, {
      nome: nome,
      name: session.user.name,
      email: session.user.email,
      photo: session.user.image,
      idade
    })

    router.push('/perfil')

  }


  if (session) {
    temConta()

    if (conta) {
      GerenciarCookie(true)
      router.push('/perfil')
    } else {
      GerenciarCookie(false)
    }
  }




  return (
    <>
      <div className={`
      flex
       h-screen items-center justify-center`}>
        <div className={`
          hidden md:flex
          w-1/2
          h-screen
         
      `}>
          <img src={`https://source.unsplash.com/random`}></img>
        </div>
        <div className={`
        w-1/2  
        m-10
        `}>


          {status == 'loading' && <img src={'carregando.svg'} />}

          {session && !conta && !verificado &&
          
            <img src={'carregando.svg'} />
          }



          {session &&
            <>


              {verificado &&

                <>
                          <h1 className={`
                  flex
                  items-center justify-center
            
                  text-2xl md:text-4xl 
                  m-5
                    `}>Login</h1>
                  <h1 className="text-sm">clique em continuar para finalizar o cadastro</h1>

                  <div className="flex flex-col ">
                    <div className="w-full" ><span className="w-1/12">Nome: </span><input type="text" required className=" w-10/12 p-1 m-1 border rounded " value={nome} onChange={(e) => setNome(e.target.value)}></input></div>
                    <div className="w-full"><span className="w-1/12">Eamil: </span> <input type="email" required className="w-10/12 p-1  m-1 border rounded " value={session.user.email} onChange={() => setEamil(session.user.email)}></input></div>
                    <div className="w-full"><span className="w-1/12">Idade: </span><input type="number" required className="w-10/12 p-1  m-1 border rounded " value={idade} onChange={(e) => setIdade(+e.target.value)}></input></div>
                  </div>


                  <button className="w-full rounded-full py-3 px-6 bg-green-400 hover:bg-green-500 flex items-center justify-center text-white" onClick={() => {
                    authentic()
                  }} > Continuar</button>
                    <h1 className="text-sm m-2 text-red-300 cursor-pointer" onClick={()=> signOut()} >cancelar</h1>

                </>
              }

            </>
          }

          {!session && !conta &&
            <>
              <h1 className={`
          flex
          items-center justify-center
    
          text-2xl md:text-4xl 
          m-5
          `}>Login</h1>
              <button className="w-full rounded-full py-3 px-6 bg-blue-100 text-gray-200 flex items-center justify-center" onClick={() => {
                signIn('google')
              }}> {IconeGoogle}</button>
            </>
          }



        </div>
      </div>

    </>
  )



}
