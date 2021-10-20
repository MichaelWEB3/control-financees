import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconeGoogle, IconEntrar, IconLupa, IconSair } from "../components/icons";





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

    const data = [
        { name: 'Page A', pv: 2400, amt: 2400 },
        { name: 'Page B', pv: 1398, amt: 2210 },
        { name: 'Page C', pv: 9800, amt: 2290 },
        { name: 'Page D', pv: 3908, amt: 2000 },
        { name: 'Page E', pv: 4800, amt: 2181 },
        { name: 'Page F', pv: 3800, amt: 2500 },
        { name: 'Page G', pv: 4300, amt: 2100 },
    ];

    const colors = [
        'red',
         'blue'
    ]

    return (
        <Layout perfil={true} financas={false}>
            <div className="flex flex-col  w-screen h-screen">

                <div className="flex flex-row  w-full  items-center justify-around  ">

                    <div className="">
                        <h1 className="invisible sm:visible text-gray-600 text-2xl" >DashBoard</h1>
                    </div>

                    <div className="" >

                        <span className=" flex h-10 rounded-full m-2    bg-green-50 p-2">  <input type="text" placeholder="Seacher" className="form-input p-2 text-gray-700 rounded-full bg-green-50 border-solid border-1" /> <span className="hidden sm:flex">{IconLupa}</span> </span>

                    </div>
                    <div className="w-20">

                        {dadosOnline?.photo ? <img className="rounded-full" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}

                    </div>
                </div>
                <div className="w-8/12 h-2/6 m-5 bg-green-50  rounded-3xl  flex flex-col sm:flex-row justify-evenly items-center">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-600">Saldo  </span>
                        <span className="text-xl text-gray-400">1500,00  </span>
                    </div>

                    <div>
                        <span className="text-xl text-green-800">{IconEntrar} R$7,00</span>

                    </div>

                    <div>
                        <span className="text-xl text-red-800">{IconSair} R$7,00</span></div>
                </div>
                <div className="flex flex-col    sm:flex-row ">
                    <div className="flex ">

                      
                      
                    </div>

                    <div>


                    </div>




                </div>
            </div>
        </Layout>
    )
}