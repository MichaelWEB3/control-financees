import connect from "../../utils/database"
    



export default async function  users(req, resp) {
    
    const {name,email,photo, total_conta,despesas, total_gastos} = req.body

    if (req.method == 'POST') {
       
       
        if(!name,!email){
            resp.status(400).json({erro:"erro paramentros"})
            return
        }
        const {db} = await connect()

        const response = await db.collection('users').insertOne({
            email,
            name,
            photo,
            total_conta,
            despesas:[],
            total_gastos,
            

        })
        resp.status(200).json({certo:"inserido no bd com sucesso"})

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}