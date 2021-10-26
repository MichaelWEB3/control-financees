import connect from "../../utils/database"
    



export default async function  users(req, resp) {
    
    const {name,email,photo,idade,nome} = req.body

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
            nome,
            total_conta:0,
            ultima_entrada:0,
            despesas:[],
            ultima_saida:0,
            total_gastos:0,
            idade,
            entradas:[],
            ultima_data:'',
            ultima_data_saida:'',
            favs:[]

        })
        resp.status(200).json({certo:"inserido no bd com sucesso"})

    } else {
        resp.status(400).json({ erro: "erro requisition" })
    }

}