const exp=require('express')
const {ObjectId} = require('mongodb')
const managerApp=exp.Router()
managerApp.use(exp.json())
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const tokenVerify=require('../middlewares/tokenVerify')
require('dotenv').config()


managerApp.post('/managers',expressAsyncHandler(async(req,res)=>{
    const managersCollection=req.app.get('managersCollection')
    const newUser=req.body
    let existingUser=await managersCollection.findOne({username:newUser.username})
    if(existingUser!==null){
        res.send({message:"Username already exists"})
    }
    else{
        let hashedpassword=await bcryptjs.hash(newUser.password,7)
        let hashedpassword2=await bcryptjs.hash(newUser.confirmPassword,7)
        newUser.password=hashedpassword
        newUser.confirmPassword=hashedpassword2
        await managersCollection.insertOne(newUser)
        res.send({message:"user created"})
    }
}))

managerApp.put('/manager/:id',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const managersCollection=req.app.get('managersCollection')
    let managerId=new ObjectId(req.params.id)
    let modifiedUser=req.body
    let hashedpassword=await bcryptjs.hash(modifiedUser.password,7)
    let hashedpassword2=await bcryptjs.hash(modifiedUser.confirmPassword,7)
    modifiedUser.password=hashedpassword
    modifiedUser.confirmPassword=hashedpassword2
    const result = await managersCollection.updateOne(
        { _id: managerId },  
        { $set: { ...modifiedUser } }
    );
    res.send({ message: "Manager modified successfully" });
        
}))

managerApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const managersCollection=req.app.get('managersCollection')
    const userCred=req.body
    let dbUser=await managersCollection.findOne({username:userCred.username})
    if(dbUser===null){
        res.send({message:"*Invalid username*"})
    }
    else{
        let result=await bcryptjs.compare(userCred.password,dbUser.password)
        if(result===false){
            res.send({message:"*Invalid password*"})
        }
        else{
            let signedtoken=jwt.sign({username:userCred.username},process.env.SECRET_KEY,{expiresIn:'7d'})
            res.send({message:"login success",token:signedtoken,user:dbUser})
        }
    }
}))


module.exports=managerApp