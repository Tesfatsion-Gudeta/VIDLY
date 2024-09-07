const mongoose=require('mongoose')
const Joi=require('joi')

const User=mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:50,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
        maxLength:255
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:1024
    }
}))

//input validation

function validateUser(user){
const schema=Joi.object({
    name:Joi.string().min(3).max(50).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(6).max(255).required()
})
   return schema.validate(user)

}

//export

exports.User=User
exports.validate=validateUser