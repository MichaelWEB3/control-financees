import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconeGoogle, IconEntrar, IconLupa, IconSair } from "../components/icons";
import { Chart } from "react-google-charts";
import Seach from "../components/layout/seach";
import Dark from "../components/layout/dark";
import { Pier, Liner, Barchar } from "../components/Barchar/idex";
import { motion } from "framer-motion";

import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Table, Divider, Tag } from 'antd';

export default function Perfil(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()


    const [entrada, setentrada] = useState(0)
    const [tirar, settirar] = useState(0)

    const [total, setTotal] = useState(null)
    const [totalEntrada, settotalEntrada] = useState(null)
    const [totalSaida, settotalSaida] = useState(null)



    //grafico
    const [options, setOptions] = useState({
        title: 'Gráfico  Transçoes'
    })
    const [data, setData] = useState(null)


    const [mostraDe, setmostraDe] = useState(false)
    const [mostraEnt, setmostraEnt] = useState(false)


    //animed

    const [selectedId, setSelectedId] = useState(null)

    const item = [
        {
            objt: 1,
            local: 'local',

        }
    ]

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })

    }, [])


    useEffect(() => {


        setTotal(dadosOnline?.total_conta)

        let acomulador = 0
        for (let i = 0; i < dadosOnline?.entradas?.length; i++) {

            acomulador = acomulador + dadosOnline?.entradas[i]
        }
        let acumuladoSaida = 0
        dadosOnline?.despesas?.map((valor, index) => {
            acumuladoSaida = acumuladoSaida + valor.tirar
        })

        settotalEntrada(acomulador)
        let totalTran = acomulador + acumuladoSaida

        setData([

            totalTran,
            acumuladoSaida,
            acomulador,

        ])

    }, [dadosOnline])
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }



   
      
      const columns = [
        {
          title: 'Entradas',
          dataIndex: 'entradas',
          key: 'entradas',
        },
        
      ];
      

    return (
        <Layout perfil={true} financas={false}>

            <div className={`flex flex-col  w-full h-full   `}>

                <div className="flex flex-row  w-full  items-center justify-around   ">

                    <div className="">
                        <span className="invisible sm:visible  text-2xl " >DashBoard</span>
                    </div>

                    <div className="" >

                        <Seach></Seach>

                    </div>

                    <div className="hidden sm:flex">
                        <Dark></Dark>
                    </div>

                    <div className="w-20 sm:hidden">

                        {dadosOnline?.photo ? <img className="rounded-full m-2" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}

                    </div>
                </div>

                <motion.div whileHover={{ scale: 1.1 }}  >
                    <div className={`w-12/12  md:w-11/12 h-50 p-2 m-5     ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}  rounded-3xl  flex flex-col sm:flex-row justify-evenly items-center `}>
                        <img src="carteiraGif.gif" className="hidden md:flex flex w-40" />
                        <div className=" flex flex-col">

                            <span className="text-sm ">Balance  </span>
                            <span className="text-sm sm:text-xl   font-bold">{dadosOnline?.total_conta?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}  </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm sm:text-xl  text-green-800">{IconEntrar}</span>

                            <span className="text-sm sm:text-xl  text-green-800"> {dadosOnline?.ultima_entrada?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                            <span className="text-sm ">Date: {dadosOnline?.ultima_data}  </span>


                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm sm:text-xl  text-red-800">{IconSair} {dadosOnline?.ultima_saida?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                            <span className="text-sm ">Date: {dadosOnline?.ultima_data}  </span>
                        </div>

                    </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}  >
                    <div className={`flex flex-col    m-5  p-2 rounded-lg  h-80 lg:flex-row w-11/12    ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'} `}>

                        <Barchar legendas={['Total', 'saidas', 'entradas']} dates={data}></Barchar>
                        <Liner legendas={['Total', 'saidas', 'entradas']} dates={data}></Liner>
                    </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}  >


                    <div className={`flex m-5  p-2 rounded-lg lg:flex-row w-11/12  ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}`}>
                        <h1 className=" text-xs">List and transaction</h1>


                        <div className="flex flex-col lg:flex-row w-11/12  justify-around" >



                            <div className="">
                                <button className="bg-blue-400 w-30 p-1 text-white hover:bg-blue-600 rounded-full  flex" onClick={() => mostraEnt ? setmostraEnt(false) : setmostraEnt(true)} >Prohibited {mostraEnt ? IconEntrar : IconSair}</button>
                                {mostraEnt && dadosOnline?.entradas?.map((e) =>
                                    <ul>
                                        <li className="text-blue-600">{e?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
                                    </ul>)}

                                   
                            </div>

                            <div className="">
                                <button className="bg-red-400 w-30 p-2 text-white hover:bg-red-600 rounded-full flex " onClick={() => mostraDe ? setmostraDe(false) : setmostraDe(true)}>Exit{mostraDe ? IconEntrar : IconSair}</button>
                                {mostraDe && dadosOnline?.despesas?.map((e,i) =>
                               
                                    <ul>
                                        <li className="" key={i}><span className="font-bold">{e.tirarDescr}</span> -  <span className="text-red-600">{e.tirar?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></li>
                                    </ul>)}
                            </div>



                            <Pier legendas={['Total', 'saidas', 'entradas']} dates={data}></Pier>



                        </div>

                    </div>
                </motion.div>


            </div>
        </Layout>
    )
}


