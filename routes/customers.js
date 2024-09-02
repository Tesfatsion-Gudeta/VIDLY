const Joi=require('joi')
const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()

//schema for the database

const customerSchema=new mongoose.Schema({
    isGold:Boolean,
    name:{
        type:String,
        required:true
    },
    phone:String

})


//model class for db

const Customer=mongoose.model('Customer',customerSchema)


//for getting all the customers

router.get('/',async(req,res)=>{
    const customers=await Customer.find().sort('name')
    res.send(customers)



})
//for adding new customer
router.post('/',async(req,res)=>{
    const customer=new Customer({isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })

res.send(await customer.save())
    
})

//for updating customer
router.put('/:id',async(req,res)=>{
    const customer=Customer.findByIdAndUpdate(req.params.id,{new:true})
    if(!customer)return res.status(404).send("couldn't find the customer with that specific id")
    res.send(customer)

    
})


//for deleting customer
router.delete('/:id',(req,res)=>{
    const customer=Customer.findByIdAndDelete(req.params.id)
    if(!customer)return res.status(404).send("couldn't find the customer with that specific id")
    res.send(customer)

    
})

//input validation logic





module.exports =router

