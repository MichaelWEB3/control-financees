import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconeGoogle, IconLupa } from "../components/icons";

export default function Perfil(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {
            console.log(resp)
            setdadosOnline(resp)
        })
    }, [])

    return (
        <Layout perfil={true} financas={false}>
            <div className="flex flex-col p-5 w-full ">

                <div className="flex justify-around w-full m-2 p-2">
                    <div>
                        <h1 className="text-2xl text-gray-600">DashBoard</h1>
                    </div>

                    <div className="flex flex-row h-10 bg-white rounded-full" >

                          <input type="text" placeholder="Seacher" className="form-input h-10 p-2 rounded-full bg-withe border-solid border-1" />  <span className=" rounded-full  h-10 bg-white p-2">{IconLupa}</span> 

                    </div>
                    <div>

                        {dadosOnline?.photo ? <img className="rounded-full w-15  h-18" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full w-13  h-11" src={'carregando.svg'} />}

                    </div>
                </div>
                <div>1</div>
                <div>1</div>
            </div>
        </Layout>
    )
}