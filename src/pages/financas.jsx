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
        if(dadosOnline?.total_conta <= 0){
            alert("saldo negativo tansação recusada")
            return
        }
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
            <div className={`w-full h-screen m-5  ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100':' bg-green-50 text-gray-700'}   p-2 flex  justify-center items-col rounded-3xl  `}>
                <h1>Transação</h1>


                <div className=" w-full  flex flex-col sm:flex-col p-2 justify-center items-center ">
                    <div className="flex flex-col   w-full justify-center items-center">
                        <span className="text-sm  text-gray-600">Saldo  </span>
                        <span className="text-xl  text-gray-400 font-bold">R${dadosOnline?.total_conta}  </span>
                    </div>

                    <div className="flex flex-col  w-full justify-center items-center m-5">
                        <span className="text-xl text-green-700 m-1">Adicione Saldo</span>
                        <input type="number" value={entrada} onChange={(e) => setentrada(e.target.value)} className="w-1/2 border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="00,00"></input>
                        <button className="bg-green-400 w-20 p-1 text-white hover:bg-green-600 rounded-full " onClick={() => add()}>+</button>
                    </div>

                    <div className="flex flex-col  w-full justify-center items-center m-5 ">
                        <span className="text-xl text-red-400 m-1">Pagar conta</span>
                        <input type="text" value={tirarDescr} onChange={(e) => settirarDescr(e.target.value)} className="w-1/2  border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="descrição"></input>
                       <input type="number" value={tirar} onChange={(e) => settirar(e.target.value)} className="w-1/2  border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="00,00"></input>
                        <button className="bg-red-400 w-20 p-1 text-white hover:bg-red-600 rounded-full " onClick={() => remove()}>-</button>
                    </div>

                </div>
            </div>
        </Layout>
    )
}