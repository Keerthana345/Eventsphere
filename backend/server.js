const exp=require('express')
const app=exp()
const cors=require('cors')
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174']
}))
require('dotenv').config()

const {MongoClient}=require('mongodb')
let mClient=new MongoClient(process.env.DB_URL)

mClient.connect()
.then((connectionObj)=>{
    const fsddb=connectionObj.db('eventsphere')
    const managersCollection=fsddb.collection('eventmanagers')
    const eventsCollection=fsddb.collection('eventsadded')
    const usersCollection=fsddb.collection('registrations')
    app.set('managersCollection',managersCollection)
    app.set('eventsCollection',eventsCollection)
    app.set('usersCollection',usersCollection)

    console.log('DB connection successful')
    app.listen(process.env.PORT,()=>console.log('http server started on port 4000'))
})
.catch(err=>console.log("Error in DB connection",err))

const managerApp=require('./APIs/managerApi')
const eventApp=require('./APIs/eventApi')
const userApp=require('./APIs/userApi')

app.use('/manager-api',managerApp)
app.use('/event-api',eventApp)
app.use('/user-api',userApp)

app.use('*',(req,res,next)=>{
    res.send({message:`Invalid path`})
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",errorMessage:err.message})
})