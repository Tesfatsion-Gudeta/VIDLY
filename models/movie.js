const mongoose=require('mongoose')
const Joi=require('joi')
const {genreSchema}=require('./genre')


//schema
const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        required:true
    }
    ,
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255

    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255

    }
})

//model
const Movie=mongoose.model('Movie',movieSchema)

//input validation

function validateMovie(movie){
    const schema=Joi.object({
        title:Joi.string().required().min(3),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    })
    return schema.validate(movie)

}

exports.Movie=Movie
exports.validate=validateMovie
