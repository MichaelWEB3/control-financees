import connect from "../../utils/database"
import { ObjectID } from 'mongodb'



export default async function Addsaldo(req, resp) {
    const { nome, email, idade } = req.body
    if (req.method == "POST") {


        if (  !nome, !idade) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()


        const datenome = await db.collection('users').updateOne({ email: email }, { $set: { nome: nome } })
        const dateidade = await db.collection('users').updateOne({ email: email }, { $set: { idade: idade } })


        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}