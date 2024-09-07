const express=require('express')
const mongoose=require('mongoose')
const {validate,User}=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const router=express.Router()

//routes


router.post('/',async(req,res)=>{
   const {error}=validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
   
   let user=await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('user already registered')
    // user=new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password})
    user=new User(_.pick(req.body,['name','email','password']))
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
    await user.save()
   
   res.send( _.pick(user,['_id','name','email']))
}) 



//export
module.exports=router 
