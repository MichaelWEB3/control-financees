import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import useDados from "../../dados/userHooke";
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios";
import { GetServerSideProps } from "next";
import { IconCash, IconCoracao } from "../../components/icons";


export default function Financas(props) {
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    console.log(props.response.photo)


    return (
        <Layout perfil={false} financas={true}>
            <div className="w-full h-screen m-5 bg-green-50  p-2 flex-col w  justify-center items-center   items-col rounded-3xl  ">
                <div className="flex flex-row m-5 p-5 justify-around items-center">
                    <div> {props?.response?.photo ? <img className="rounded-full " src={`${props?.response?.photo}`} /> : <img className="rounded-full" src={'carregando.svg'} />}</div>
                    <div><span className="font-bold text-2xl ">{props.response?.nome}</span></div>
                    <div> <span className="font-bold text-xl ">{props.response?.idade}, anos</span></div>
                    <div className="text-gray-400 hover:text-red-600">{IconCoracao}</div>
                </div>
                <div className="flex flex-col justify-center items-center p-5 m-5 ">
                    <div className="flex flex-row text-xl font-bold justify-around items-baseline "> <span className="flex "> Saldo em conta:</span> <span className="text-green-500 text-xl ">  R${props.response?.total_conta}</span> </div>
                    <span className="text-sm text-gray-600 m-5">Enviar din din</span>
                    <input type="number"  className="w-1/2 border-1 border-solid bg-gray-500 text-white border-black p-2 rounded-xl m-1" placeholder="00,00"></input>
                    <button className="bg-green-400 w-20 p-1 text-white hover:bg-green-600 rounded-full ">+</button>

                </div>




            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const email = context.query.email

    const date = await axios.get(`http://localhost:3000/api/users/${email}`)

    const usuario = date.data

    console.log(usuario)
    return {
        props: usuario
    }
}