const Joi=require('joi')
const mongoose=require('mongoose')

//schema

const rentalSchema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minLength:3,
                maxLength:50},
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minLength:5,
                maxLength:50
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minLength:3,
                maxLength:50
            } ,
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date,
         
    },
    rentalFee:{
        type:Number,
        min:0
    }
})

//model

const Rental=mongoose.model('Rental',rentalSchema)

//validation

function validateRental(rental){
    const schema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(rental)
}

exports.Rental=Rental
exports.validate=validateRental