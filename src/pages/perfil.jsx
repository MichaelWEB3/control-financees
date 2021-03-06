import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { IconEntrar, IconSair } from "../components/icons";
import Seach from "../components/layout/seach";
import Dark from "../components/layout/dark";
import { Pier, Liner, Barchar } from "../components/Barchar/idex";
import { motion } from "framer-motion";
import pdfmake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Image from "next/image";
import Carregando from '../../public/carregando.svg'
import CarteiraGif from '../../public/carteiraGif.gif'

export default function Perfil(props) {
    const { data: session } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    const [total, setTotal] = useState(null)
    const [totalEntrada, settotalEntrada] = useState(null)
    const [data, setData] = useState(null)
    const [mostraDe, setmostraDe] = useState(false)
    const [mostraEnt, setmostraEnt] = useState(false)

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })

    }, [dadosUsuario, session])

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

    //gerador ped
    function generatePDF() {
        if (dadosOnline) {
            pdfmake.vfs = pdfFonts.pdfMake.vfs

            const titulos = [
                {
                    text: 'Clientes',
                    fontSize: 15,
                    bold: true,
                    margin: [15, 20, 0, 45]
                },
            ]

            const juncao = [...dadosOnline?.entradas, ...dadosOnline?.despesas]
            const dataa = juncao?.map((e) => {
                return [
                    {
                        text: e || '-',
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: e.tirarDescr ? e.tirarDescr + " - " + e.tirar : '',
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                ]
            }

            )
            const detalhes = [
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*'],
                        body: [
                            [
                                {
                                    text: 'Depositos',
                                    style: 'tableHeader',
                                    fontSize: 10
                                },
                                {
                                    text: 'Saidas e transferencias',
                                    style: 'tableHeader',
                                    fontSize: 10
                                },
                            ],
                            ...dataa
                        ]
                    },
                    layout: 'headerLineOnly'
                }
            ]
            function rodape(currentPage, pageCounf) {
                console.log(pageCounf)
                console.log(total)
                console.log(totalEntrada)
                return [
                    {
                        text: currentPage.toLocaleString(),
                        aligment: 'right',
                        fontSize: 9,
                        bold: true,
                        margin: [15, 10, 20, 0]
                    }
                ]
            }

            const docDefi = {
                pageSize: 'A4',
                pageMargins: [15, 50, 15, 40],
                header: [titulos],
                content: [detalhes],
                footer: rodape
            }

            pdfmake.createPdf(docDefi).download()
        }

    }


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

                        {dadosOnline?.photo ?' <img alt="img" className="rounded-full m-2" src={`${dadosOnline?.photo}`} />' : <Image alt="img" className="rounded-full" src={Carregando} />}

                    </div>
                </div>

                <motion.div whileHover={{ scale: 1.1 }}  >
                    <div className={`w-12/12  md:w-11/12 h-50 p-2 m-5     ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}  rounded-3xl  flex flex-col sm:flex-row justify-evenly items-center `}>
                        <Image alt="img" src={CarteiraGif} className={`hidden md:flex flex w-40`} width="45px" height="45px" />
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
                        <button className="bg-gray-500 h-16 rounded-lg" onClick={generatePDF}>Download relatorio em PDF</button>
                        <div className="flex flex-col lg:flex-row w-11/12  justify-around" >
                            <div className="">
                                <button className="bg-blue-400 w-30 p-1 text-white hover:bg-blue-600 rounded-lg  flex" onClick={() => mostraEnt ? setmostraEnt(false) : setmostraEnt(true)} >Prohibited {mostraEnt ? IconEntrar : IconSair}</button>
                                {mostraEnt && dadosOnline?.entradas?.map((e) => {
                                    <ul key={i}>
                                        <li className="text-blue-600">{e?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
                                    </ul>
                                }
                                )}

                            </div>
                            <div className="">
                                <button className="bg-red-400 w-30 p-2 text-white hover:bg-red-600 rounded-lg flex " onClick={() => mostraDe ? setmostraDe(false) : setmostraDe(true)}>Exit{mostraDe ? IconEntrar : IconSair}</button>
                                {mostraDe && dadosOnline?.despesas?.map((e, i) => {
                                    <ul key={i}>
                                        <li className="" key={i}><span className="font-bold">{e.tirarDescr}</span> -  <span className="text-red-600">{e.tirar?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></li>
                                    </ul>
                                })}
                            </div>
                            <Pier legendas={['Total', 'saidas', 'entradas']} dates={data}></Pier>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}


