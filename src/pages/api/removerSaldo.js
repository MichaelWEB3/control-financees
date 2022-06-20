import connect from "../../utils/database"
import { ObjectID } from 'mongodb'



export default async function RemoverSaldo(req, resp) {
    const { saido, id, despesas,ultimaDataSaida } = req.body
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method == "POST") {
        console.log(saido, id)

        if (!saido || !id) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()


        const date = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: { ultima_saida: saido } })
        const dataultimaDataSaida = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: {ultima_data_saida: ultimaDataSaida } })
        const data = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $inc: { total_conta: - saido } })
        const datadespesas = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $push: { despesas: despesas } })


        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}