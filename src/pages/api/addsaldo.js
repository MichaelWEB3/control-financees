import connect from "../../utils/database"
import { ObjectID } from 'mongodb'



export default async function users(req, resp) {
    const { entrada, id } = req.body
    if (req.method == "POST") {
        console.log(entrada, id)

        if (!entrada || !id) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()



        const data = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $inc: { total_conta: entrada } })

      

        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}