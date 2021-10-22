import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconeGoogle, IconEntrar, IconLupa, IconSair } from "../components/icons";
import { Chart } from "react-google-charts";




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


                <div className="w-12/12  md:w-7/12 h-2/6 p-2 m-5 bg-green-50  rounded-3xl  flex flex-col sm:flex-row justify-evenly items-center">
                    <img src="carteiraGif.gif" className="hidden md:flex flex w-40"/>
                    <div className=" flex flex-col">

                        <span className="text-sm text-gray-600">Saldo  </span>
                        <span className="text-sm sm:text-xl  text-gray-400">R${dadosOnline?.total_conta}  </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm sm:text-xl  text-green-800">{IconEntrar}</span>

                        <span className="text-sm sm:text-xl  text-green-800"> R${dadosOnline?.ultima_entrada}</span>
                        <span className="text-sm text-gray-600">Data: {dadosOnline?.ultima_data}  </span>


                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm sm:text-xl  text-red-800">{IconSair} R${dadosOnline?.ultima_saida}</span>
                        <span className="text-sm text-gray-600">Data: {dadosOnline?.ultima_data}  </span>
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