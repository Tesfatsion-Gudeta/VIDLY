const express=require('express')
const router=express.Router()
const {Customer,validate}=require('../models/customer')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')

//for getting all the customers

router.get('/',async(req,res)=>{
    const customers=await Customer.find().sort('name')
    res.send(customers)
})

//for adding new customer
router.post('/',auth,async(req,res)=>{

    const{error}=validate(req.body)
    if(error)return res.status(400).send(error.details.message)
    const customer=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })

res.send(await customer.save())
    
})

//for updating customer
router.put('/:id',auth,async(req,res)=>{
    const{error}=validate(req.body)
    if(error)return res.status(400).send(error.details.message)
    const customer=Customer.findByIdAndUpdate(req.params.id,{new:true})
    if(!customer)return res.status(404).send("couldn't find the customer with that specific id")
    res.send(customer)  
})


//for deleting customer
router.delete('/:id',[auth,admin],(req,res)=>{
    const customer=Customer.findByIdAndDelete(req.params.id)
    if(!customer)return res.status(404).send("couldn't find the customer with that specific id")
    res.send(customer)

    
})

//for getting a single customer

router.get('/:id',async(req,res)=>{
    const customer= await Customer.findById(req.params.id)
    if(!customer)return res.status(404).send("couldn't find customer with that specific id")
    res.send(customer)

})

module.exports =router

