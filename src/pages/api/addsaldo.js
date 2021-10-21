import connect from "../../utils/database"
import { ObjectID } from 'mongodb'



export default async function Addsaldo(req, resp) {
    const { entrada, id, entradas, ultimaDataEntrada, } = req.body
    if (req.method == "POST") {


        if (!entrada || !id) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()


        const date = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: { ultima_entrada: entrada } })
        const data = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $inc: { total_conta: entrada } })
        const dataentradas = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $push: { entradas: entradas } })
        const ultimaData = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: { ultima_data: ultimaDataEntrada } })



        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}