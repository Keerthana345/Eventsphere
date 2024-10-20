const exp=require('express')
const userApp=exp.Router()
userApp.use(exp.json())
const {ObjectId} = require('mongodb')
const expressAsyncHandler=require('express-async-handler')
const tokenVerify=require('../middlewares/tokenVerify')

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const usersCollection=req.app.get('usersCollection')
    const newUser=req.body
    await usersCollection.insertOne(newUser)
    res.send({message:"User registered"})
}))

userApp.get('/users',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const usersCollection=req.app.get('usersCollection')
    let users=await usersCollection.find().toArray()
    if(users.length==0){
        res.send({message:"No users registered"})
    }
    else{
        res.send({message:"All users",payload:users})
    }
}))

module.exports=userApp