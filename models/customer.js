const Joi=require('joi')
const mongoose=require('mongoose')

//schema for the database

const customerSchema=new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true
    },
    phone:String

})


//model class for db

const Customer=mongoose.model('Customer',customerSchema)

//input validation logic

function validateCustomer(customer){
    const schema=Joi.object({
        name:Joi.string().min(3).max(20).required(),
        phone:Joi.string().required(),
        isGold:Joi.boolean()})

    return schema.validate(customer)
    
}

exports.Customer=Customer
exports.validate=validateCustomer
