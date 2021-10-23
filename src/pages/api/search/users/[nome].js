import connect from "../../../../utils/database"
    



export default async function  SearchUser(req, resp) {
    
    const nome  = req.query.nome

    if (req.method == 'GET') {
       
       
        
        const {db} = await connect()

        const response = await db.collection('users').find({nome:{$regex: new RegExp('^' + nome, 'i')}}).toArray()
       
        resp.status(200).json({response})

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}