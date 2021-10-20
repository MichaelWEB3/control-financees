import { MongoClient, Db } from "mongodb";

const cliente = new MongoClient(process.env.DATABASE_URL,{
    useUnifiedTopology: true
})


export default async function connect(){
    await cliente.connect()
 
 
     const db = cliente.db('control')
     return {
         db,
         cliente
     }
    
 }
 
 