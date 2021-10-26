import connect from "../../../../utils/database"
    
import { ObjectID } from 'mongodb'



export default async function RemoverSaldo(req, resp) {
    const { saido, id, despesas, ultimaDataSaida, idRecebidor } = req.body
    if (req.method == "POST") {
        console.log(saido, id)

        if (!saido || !id) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()


        const date = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: { ultima_saida: saido } })
        const dataultimaDataSaida = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: { ultima_data_saida: ultimaDataSaida } })
        const data = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $inc: { total_conta: - saido } })
        const datadespesas = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $push: { despesas: despesas } })


        //enviando saldo p usuario
        const dataRecebidor = await db.collection('users').updateOne({ _id: new ObjectID(idRecebidor) }, { $inc: { total_conta: saido } })
        const dataentradas = await db.collection('users').updateOne({ _id: new ObjectID(idRecebidor) }, { $push: { entradas: saido } })
        const ultimaData = await db.collection('users').updateOne({ _id: new ObjectID(idRecebidor) }, { $set: { ultima_entrada: ultimaDataSaida } })
        
        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}