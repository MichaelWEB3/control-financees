import connect from "../../../utils/database"
    



export default async function  users(req, resp) {
    
    const email  = req.query.id

    if (req.method == 'GET') {
       
       
        
        const {db} = await connect()

        const response = await db.collection('users').findOne({email})
       
        resp.status(200).json({response})

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}