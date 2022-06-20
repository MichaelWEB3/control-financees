import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import useDados from "../../dados/userHooke";
import { useSession } from "next-auth/react"
import axios from "axios";
import useSWR from 'swr'
import api from "../../utils/api";
import router from "next/router"



export default function Financas(props) {

    const { data, error } = useSWR(`http://localhost:3000/api/users/${props?.response?.email}`, api)
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    const [email, setmail] = useState(props?.response?.email)
    const [nome, setnome] = useState(props?.response?.nome)
    const [idade, setidade] = useState(props?.response?.idade)

    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        if (props.response.email == session?.user.email) {
            date.then(resp => {
                console.log(data)
                console.log(error)
                setdadosOnline(resp)
            })
        } else {
            router.push('/')
        }

    }, [dadosOnline, props, dadosOnline, dadosUsuario, data, error, session])

    async function atualizar() {
        axios.post('/api/atualizar', {
            email,
            nome,
            idade
        })
    }
    return (
        <Layout perfil={false} financas={true}>
            <div className="flex w-full h-60 justify-center items-center m-5">

                <form className="flex flex-col justify-center items-center m-5">
                    <span>Perfil</span>
                    <div className="flex p-2 m-2 justify-center items-center"> Nome: <input className="m-1 p-1 text-gray-600" onChange={(e) => setnome(e.target.value)} value={nome}></input></div>
                    <div className="flex p-2 m-2 justify-center items-center"> Email: <input className="m-1 p-1 text-gray-600 " value={email}></input></div>
                    <div className="flex p-2 m-2 justify-center items-center"> Idade: <input className="m-1 p-1 text-gray-600" onChange={(e) => setidade(e.target.value)} value={idade}></input></div>
                    <button className="bg-blue-400 p-2" onClick={atualizar}>Atualizar</button>
                </form>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const email = context.query.id

    if (email) {
        const date = await axios.get(`http://localhost:3000/api/users/${email}`)
        const usuario = date.data

        return {
            props: usuario
        }
    }

}