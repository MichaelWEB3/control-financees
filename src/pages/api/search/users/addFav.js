import connect from "../../../../utils/database"

import { ObjectID } from 'mongodb'



export default async function addFav(req, resp) {
    const { id, fav } = req.body
    if (req.method == "POST") {

        console.log(fav)
        if (!fav || !id) {
            resp.status(400).json({ erro: "erro value" })
            return
        }


        const { db } = await connect()


        const date = await db.collection('users').updateOne({ _id: new ObjectID(id) }, { $push: { favs: fav } })




        resp.status(200).json({ certo: "post ok" })

    } else {
        resp.status(400).json({ erro: "erro requisition post" })
    }



}