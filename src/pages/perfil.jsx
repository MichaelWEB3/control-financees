import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconeGoogle, IconEntrar, IconLupa, IconSair } from "../components/icons";
import { Chart } from "react-google-charts";
import Seach from "../components/layout/seach";




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
            ['Transaçoes', 'Transaçoes'],
            ['Total', totalTran],
            ['saidas', acumuladoSaida],
            ['entradas', acomulador],

        ])

    }, [dadosOnline])



  

    return (
        <Layout perfil={true} financas={false}>
            <div className="flex flex-col  w-full h-full ">

                <div className="flex flex-row  w-full  items-center justify-around   ">

                    <div className="">
                        <h1 className="invisible sm:visible text-gray-600 text-2xl " >DashBoard</h1>
                    </div>

                    <div className="" >

                       <Seach></Seach>

                    </div>
                    <div className="w-20 sm:hidden">

                        {dadosOnline?.photo ? <img className="rounded-full m-2" src={`${dadosOnline?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}

                    </div>
                </div>


                <div className="w-12/12  md:w-11/12 h-2/6 p-2 m-5 bg-green-50  rounded-3xl  flex flex-col sm:flex-row justify-evenly items-center ">
                    <img src="carteiraGif.gif" className="hidden md:flex flex w-40" />
                    <div className=" flex flex-col">

                        <span className="text-sm text-gray-600">Balance  </span>
                        <span className="text-sm sm:text-xl  text-gray-400 font-bold">R${dadosOnline?.total_conta}  </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm sm:text-xl  text-green-800">{IconEntrar}</span>

                        <span className="text-sm sm:text-xl  text-green-800"> R${dadosOnline?.ultima_entrada}</span>
                        <span className="text-sm text-gray-600">Date: {dadosOnline?.ultima_data}  </span>


                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm sm:text-xl  text-red-800">{IconSair} R${dadosOnline?.ultima_saida}</span>
                        <span className="text-sm text-gray-600">Date: {dadosOnline?.ultima_data}  </span>
                    </div>

                </div>




                <div className="w-12/12  md:w-11/12 h-2/6 m-5 p-5 bg-green-50   flex  justify-center items-col rounded-3xl  ">
                    <h1 className="text-gray-600 text-xs">List and transaction</h1>


                    <div className=" w-full  flex flex-col sm:flex-col p-2 justify-center items-center ">


                        <div className="flex flex-col  w-full justify-center items-center m-5">
                        <button className="bg-green-400 w-30 p-1 text-white hover:bg-green-600 rounded-full  flex" onClick={() => mostraEnt ? setmostraEnt(false):setmostraEnt(true)} >Prohibited {mostraEnt? IconEntrar:IconSair}</button>
                            {mostraEnt&& dadosOnline?.entradas?.map((e) =>
                                <ul>
                                    <li className="text-green-600">R$ {e}</li>
                                </ul>)}
                        </div>

                        <div className="flex flex-col  w-full justify-center items-center m-5 ">
                        <button className="bg-red-400 w-30 p-2 text-white hover:bg-red-600 rounded-full flex " onClick={() => mostraDe ? setmostraDe(false):setmostraDe(true)}>Exit{mostraDe? IconEntrar:IconSair}</button>
                            {mostraDe&& dadosOnline?.despesas?.map((e) =>
                                <ul>
                                    <li className="text-gray-600"><span className="font-bold">{e.tirarDescr}</span> -  <span className="text-red-600">R${e.tirar}</span></li>
                                </ul>)}
                        </div>

                    </div>
                </div>


                <div className="flex flex-col     lg:flex-row ">
                    <div className="flex m-2  ">
                        <Chart
                            width={'350px'}
                            height={'300px'}
                            chartType="PieChart"
                            data={data}
                            options={options}
                        />


                    </div>

                    <div className=" m-2">
                        <Chart
                            width={'350px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={data}
                            options={options}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}

                        />

                    </div>




                </div>
            </div>
        </Layout>
    )
}