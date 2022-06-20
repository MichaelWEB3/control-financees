import connect from "../../utils/database"
    



export default async function  users(req, resp) {
    
    const {name,email,photo,idade,nome} = req.body
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

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