import { useState, useEffect } from "react";
import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession } from "next-auth/react"
import axios from "axios";
import { Tabs } from 'antd';
import { Modal, Button, message } from 'antd';
import { IconeCash } from "../components/icons";


export default function Financas(props) {
    const { data: session } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    const [entrada, setentrada] = useState('')
    const [tirar, settirar] = useState('')
    const [tirarDescr, settirarDescr] = useState('')
    const { TabPane } = Tabs;

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {
            setdadosOnline(resp)
        })

    }, [dadosUsuario, session])


    const Data = new Date()
    const dataAtual = Data.toLocaleDateString('pt-br')

    async function add() {
        const data = await axios.post(`https://control-financees-mucqchbku-michaelweb3.vercel.app/api/addsaldo`, {
            entrada: parseFloat(entrada),
            id: dadosOnline?._id,
            entradas: parseFloat(entrada),
            ultimaDataEntrada: dataAtual
        }).then(() => {
            setvisibleEntrada(false)
            message.success('succes deposit account');
        }).catch((e) => {
            message.error('error transition deposit');
        })



        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })


    }

    async function remove() {

        if (dadosOnline?.total_conta <= 0 || dadosOnline?.total_conta < parseFloat(tirar)) {
            message.error('insufficient funds');
            return
        }
        const data = await axios.post(`https://control-financees-mucqchbku-michaelweb3.vercel.app/api/removerSaldo`, {
            saido: parseFloat(tirar),
            despesas: { tirarDescr, tirar: parseFloat(tirar) },
            id: dadosOnline?._id,
            ultimaDataSaida: dataAtual
        }).then(() => {
            message.success('succes account pay');
            setvisiblesaida(false)
        }).catch((e) => {
            message.error('error transiton pay');
        })
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })
    }


    //modal

    const [visibleEntrada, setvisibleEntrada] = useState(false)
    const [visiblesaida, setvisiblesaida] = useState(false)

    const [visible, setvisible] = useState(false)

    const showModalEntrada = () => {
        setvisibleEntrada(true)
    };
    const handleCancelEntrada = e => {
        console.log(e);
        setvisibleEntrada(false)
    };


    const showModalsaida = () => {
        setvisiblesaida(true)
    };
    const handleCancelsaida = e => {
        console.log(e);
        setvisiblesaida(false)
    };



    return (
        <Layout perfil={false} financas={true}>
            <div className=" m-5 flex flex-col w-full p-5   ">
                <div className={`w-full h-64 m-5 flex flex-col   ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}   p-2 rounded-3xl  `}>
                    <div className="flex flex-col   w-full justify-center items-center">
                        <span className="text-sm flex justify-between items-center w-20 "> {IconeCash} Balance  </span>
                        <span className="text-xl   font-bold flex items-center"> {dadosOnline?.total_conta?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}  </span>
                    </div>


                    <Tabs defaultActiveKey="1" className={`${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}     }`}>

                        <TabPane tab="Deposit" key="1" className="hover:text-gray-300 flex justify-center items-center p-2">



                            <Button type="primary" onClick={showModalEntrada} className="  bg-blue-400  text-gray-100 hover:bg-blue-500 hover:text-gray-100 border-0">
                                Deposit
                            </Button>
                            <Modal
                                title="deposit"
                                visible={visibleEntrada}
                                onOk={add}
                                onCancel={handleCancelEntrada}

                            >
                                <div className="flex flex-col">
                                    <span className="text-blue-700 text-sm">Deposite dinheiro em sua conta, </span>
                                    <span className="text-blue-700 text-sm"> dinheiro depositado ira diretamente para sua carteira</span>
                                    <span className="text-xl text-blue-700 m-1">+  <input type="number" value={entrada} onChange={(e) => setentrada(e.target.value)} className="w-1/2 border-1 border-solid h-10 bg-blue-200 text-gray-400 border-black p-2 rounded-xl m-2" placeholder="00,00"></input></span>

                                </div>

                            </Modal>
                        </TabPane>


                        <TabPane tab="Pay the bills" key="2" className="hover:text-gray-300 flex justify-center items-center">
                            <Button type="Pay" onClick={showModalsaida} className="  bg-blue-400  text-gray-100 hover:bg-blue-500 hover:text-gray-100 border-0">
                                Pay

                            </Button>
                            <Modal
                                title="Pay"
                                visible={visiblesaida}
                                onOk={remove}
                                onCancel={handleCancelsaida}


                            >
                                <div className="flex flex-col">
                                    <span className="text-red-700 text-sm">Pague suas contas, </span>
                                    <span className="text-red-700 text-sm"> digite descrição e valor</span>
                                    <input type="text" value={tirarDescr} onChange={(e) => settirarDescr(e.target.value)} className="w-1/2  border-1 border-solid bg-blue-200 text-gray-400  border-black p-2 rounded-xl m-1" placeholder="descrição"></input>
                                    <input type="number" value={tirar} onChange={(e) => settirar(e.target.value)} className="w-1/2  border-1 border-solid bg-blue-200 text-gray-400  border-black p-2 rounded-xl m-1" placeholder="00,00"></input>

                                </div>
                            </Modal>
                        </TabPane>

                    </Tabs>

                </div>
            </div>



        </Layout>
    )
}