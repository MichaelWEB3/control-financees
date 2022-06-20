import connect from "../../utils/database"
import { ObjectID } from 'mongodb'



export default async function Addsaldo(req, resp) {
    const { nome, email, idade } = req.body
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