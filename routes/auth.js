const express=require('express')
const mongoose=require('mongoose')
const {User}=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const Joi=require('joi')
const router=express.Router()

//routes


router.post('/',async(req,res)=>{
   const {error}=validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
   
    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token=  user.generateAuthToken()
    res.send(token)
}) 

//validation
function validate(req){
    const schema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(6).max(255).required()
    })
       return schema.validate(req)
    
    }


//export
module.exports=router 

