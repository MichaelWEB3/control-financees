import { useState, useEffect } from "react";
import Layout from "../components/layout";
import useDados from "../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios";


export default function Financas(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()

    const [saldo, setSaldo] = useState(dadosOnline?.total_conta || 0)
    const [entrada, setentrada] = useState('')

    const [tirar, settirar] = useState('')
    const [tirarDescr, settirarDescr] = useState('')





    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })

    }, [])


    const Data = new Date()
    const dataAtual = Data.toLocaleDateString('pt-br')

    async function add() {
        const data = await axios.post(`http://localhost:3000/api/addsaldo`, {
            entrada: parseFloat(entrada),
            id: dadosOnline?._id,
            entradas: parseFloat(entrada),
            ultimaDataEntrada: dataAtual
        })
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })


    }

    async function remove() {
        const data = await axios.post(`http://localhost:3000/api/removerSaldo`, {
            saido: parseFloat(tirar),
            despesas: { tirarDescr, tirar: parseFloat(tirar) },
            id: dadosOnline?._id,
            ultimaDataSaida: dataAtual
        })
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)
        })
    }

    return (
        <Layout perfil={false} financas={true}>
            <div className="w-8/12 h-2/6 m-5 bg-green-50  p-2 flex  flex-col  justify-center items-center rounded-3xl  ">
                <h1>Transação</h1>


                <div className=" w-full  flex flex-col sm:flex-row p-2 justify-center items-center ">
                    <div className="flex flex-col   w-full justify-center items-center">
                        <span className="text-sm text-gray-600">Saldo  </span>
                        <span className="text-xl text-gray-400">{dadosOnline?.total_conta}  </span>
                    </div>

                    <div className="flex flex-col  w-full justify-center items-center ">
                        <span className="text-xl text-green-700 m-1">Adicione Saldo</span>
                        <input type="number" value={entrada} onChange={(e) => setentrada(e.target.value)} className="w-25 border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="00,00"></input>
                        <button className="bg-green-400 w-40 text-white hover:bg-green-600 rounded-full " onClick={() => add()}>Adicionar</button>
                    </div>

                    <div className="flex flex-col  w-full justify-center items-center ">
                        <span className="text-xl text-red-400 m-1">Pagar conta</span>
                        <span><input type="text" value={tirarDescr} onChange={(e) => settirarDescr(e.target.value)} className="w-25 border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="descrição"></input></span>
                        <span><input type="number" value={tirar} onChange={(e) => settirar(e.target.value)} className="w-25 border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="00,00"></input></span>
                        <button className="bg-red-400 w-40 text-white hover:bg-red-600 rounded-full " onClick={() => remove()}>Adicionar</button>
                    </div>

                </div>
            </div>
        </Layout>
    )
}