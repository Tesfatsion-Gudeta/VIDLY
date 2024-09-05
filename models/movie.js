const mongoose=require('mongoose')
const JOi=require('joi')


//schema
const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        id:String,
        name:String
    }
    ,
    numberInStock:number,
    dailyRentalRate:number
})

//model
const Movie=mongoose.model('Movie',movieSchema)

//input validation

function validateMovie(movie){
    const schema=JOi.object({name:Joi.String().required().min(3)})
    return schema.validate(movie)

}

exports.Movie=Movie
exports.validat=validateMovie
