const exp=require('express')
const eventApp=exp.Router()
eventApp.use(exp.json())
const {ObjectId} = require('mongodb')
const expressAsyncHandler=require('express-async-handler')
const tokenVerify=require('../middlewares/tokenVerify')

eventApp.get('/events',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    let events=await eventsCollection.find().toArray()
    if(events.length==0){
        res.send({message:"No events"})
    }
    else{
        res.send({message:"All events",payload:events})
    }
}))

eventApp.get('/eventlistings',expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    let events=await eventsCollection.find().toArray()
    if(events.length==0){
        res.send({message:"No events"})
    }
    else{
        res.send({message:"All events",payload:events})
    }
}))

eventApp.get('/events/:username',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    const nameOfUrl=req.params.username
    let event=await eventsCollection.find({username:{$eq:nameOfUrl}}).toArray()
    if(!event){
        res.send({message:"No events are added"})
    }
    else{
        res.send({message:"Events",payload:event})
    }
}))

eventApp.post('/event',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    const newEvent=req.body
    await eventsCollection.insertOne(newEvent)
    res.send({message:"event created"})
}))

eventApp.put('/event/:id',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    let eventId=new ObjectId(req.params.id)
    let modifiedEvent=req.body
    const result = await eventsCollection.updateOne(
        { _id: eventId },  
        { $set: { ...modifiedEvent } }
    );
    res.send({ message: "Event modified successfully",payload:modifiedEvent });
        
}))

eventApp.delete('/events/:id',tokenVerify,expressAsyncHandler(async(req,res)=>{
    const eventsCollection=req.app.get('eventsCollection')
    let eventId=new ObjectId(req.params.id)
    const result = await eventsCollection.deleteOne({ _id: eventId });
    res.send({ message: "Event deleted successfully" });
        
}))

module.exports=eventApp