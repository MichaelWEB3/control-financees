import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import useDados from "../../dados/userHooke";
import { useSession } from "next-auth/react"
import axios from "axios";
import { IconCoracao, IconeCash } from "../../components/icons";
import useSWR from 'swr'
import api from "../../utils/api";
import { Modal, Button, message } from 'antd';
import Image from "next/image";
export default function Financas(props) {
    const { data, error } = useSWR(`http://https://control-financees-mucqchbku-michaelweb3.vercel.app/api/users/${props?.response?.email}`, api)
    const { data: session, status } = useSession()
    const [dadosOnline, setdadosOnline] = useState({})
    const dadosUsuario = useDados()
    const [enviar, setEnviar] = useState('')
    const [favorito, setFavorito] = useState(false)
    useEffect(() => {
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {
            setdadosOnline(resp)
            resp?.favs?.map((fav) => {
                console.log(props.response?._id)
                console.log(fav.id)
                console.log(status)
                console.log(error)
                if (fav.id == props.response?._id) {
                    setFavorito(true)
                }
            })
        })

    }, [dadosOnline, session, dadosUsuario, favorito, props, status, error])



    const Data = new Date()
    const dataAtual = Data.toLocaleDateString('pt-br')


    async function enviarSaldo() {

        if (dadosOnline?.total_conta <= 0 || dadosOnline?.total_conta < parseFloat(enviar)) {
            alert("negation")
            return
        }

        const data = await axios.post(`http://localhost:3000/api/search/users/enviarSaldo`, {
            saido: parseFloat(enviar),
            id: dadosOnline?._id,
            despesas: { tirarDescr: `tiranrferencia para ${props?.response?.nome} -  ID: ${props?.response?._id}`, tirar: parseFloat(enviar) },
            ultimaDataSaida: dataAtual,
            idRecebidor: props?.response?._id
        }).then(() => {
            message.success('money sent successfully');
            setvisiblesaida(false)
        })
        alert("money sent successfully")
        const date = dadosUsuario.sessao(session?.user.email)
        date.then(resp => {

            setdadosOnline(resp)

        })


    }


    async function fav() {
        if (favorito) {
            message.error('This user already exists in your favorites');
            return
        }

        const data = await axios.post(`http://localhost:3000/api/search/users/addFav`, {

            id: dadosOnline?._id,
            fav: {
                id: props.response?._id,
                nome: props.response?.nome,
                photo: props.response?.photo,
                email: props.response?.email,
                idade: props.response?.idade
            }
        }).then(() => {
            alert("favoritado com sucesso")
            message.success('succes forever favorite');


        })

        const date = dadosUsuario.sessao(session?.user?.email)
        date.then(resp => {

            setdadosOnline(resp)
        })
    }


    //modal

    const [visiblesaida, setvisiblesaida] = useState(false)
    const [visible, setvisible] = useState(false)



    const showModalsaida = () => {
        setvisiblesaida(true)
    };
    const handleCancelsaida = e => {
        console.log(e);
        setvisiblesaida(false)
    };

    return (
        <Layout perfil={false} financas={true}>
            <div className={`w-full h-96 m-5 heigue  ${dadosUsuario.dark == 'dark' ? 'bg-gray-400 text-gray-100' : ' bg-blue-50 text-gray-700'}   p-2 flex-col w  justify-center items-center   items-col rounded-3xl  `}>
                <div className="flex flex-row m-5 p-5 justify-around items-center">
                    <div> {props?.response?.photo ? <Image alt="img" className="rounded-full " src={`${props?.response?.photo}`} /> : <Image alt="img" className="rounded-full" src={'carregando.svg'} />}</div>
                    <div><span className="font-bold text-2xl ">{props.response?.nome}</span></div>
                    <div> <span className="font-bold text-xl ">{props.response?.idade}, anos</span></div>
                    <div className={`${favorito && 'text-red-600'}  hover:text-red-600 cursor-pointer  ${dadosUsuario?.dark == 'dark' ? 'text-gray-700 ' : ' text-blue-300 '}`} onClick={() => fav()}>{IconCoracao}</div>
                </div>
                <div className="flex flex-col justify-center items-center p-5 m-5 ">
                    <span className="text-sm flex justify-between items-center w-20 "> {IconeCash} Balance  </span>
                    <div className="flex flex-row text-xl font-bold justify-around items-baseline ">  <span className=" text-xl ">  {data?.data?.response?.total_conta?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span> </div>


                    <Button type="primary" onClick={showModalsaida} className=" m-5 bg-blue-400  text-gray-100 hover:bg-blue-500 hover:text-gray-100 border-0">
                        To send
                    </Button>
                    <Modal
                        title="Pay"
                        visible={visiblesaida}
                        onOk={enviarSaldo}
                        onCancel={handleCancelsaida}
                    >
                        <div className="flex flex-col">
                            <span className="text-red-700 text-sm ml-2">Deposite na carteira  de seu amigo </span>
                            <input type="number" className="w-1/2 border-1 border-solid bg-blue-200 border-black p-2 rounded-xl m-1" onChange={(e) => setEnviar(e.target.value)} placeholder="00,00"></input>
                        </div>

                    </Modal>

                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const email = context.query.email

    const date = await axios.get(`http://localhost:3000/api/users/${email}`)

    const usuario = date.data

    return {
        props: usuario
    }
}