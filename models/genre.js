const Joi=require('joi')
const mongoose=require('mongoose')

//schema for the genres database
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    })

//model 
const Genre=mongoose.model('Genre',genreSchema)


//input validation

function validateGenre(genre){

    const schema=Joi.object({name:Joi.string().min(3).required()})
    return schema.validate(genre)

}

exports.Genre=Genre
exports.validate=validateGenre