const Joi=require('joi')
const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()

//schema for the genres database
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    })

//model 
const Genre=mongoose.model('Genre',genreSchema)


//for get request of the list of genres

router.get('/',async (req,res)=>{
    res.send(await Genre.find().sort('name'))
})

//for post request/adding a genre
router.post('/', async (req,res)=>{
    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //creating and saving a new genre
    let genre=new Genre({name:req.body.name})
    genre=await genre.save()
    res.send(genre)

})

//for put request/for updating the genres

router.put('/:id',async(req,res)=>{

    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
        //updating on the database
    const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    if(!genre) return res.status(404).send('genre with that specific id is not found')
    res.send(genre)
})

//for delete request of the genres

router.delete('/:id',async (req,res)=>{

    //deleting genre with the specific id 
    const genre= await Genre.findByIdAndDelete(req.params.id)
    if(!genre) return res.status(404).send('genre with that specific id is not found')
    res.send(genre)

})

//for getting a single genre

router.get('/:id',async(req,res)=>{
    const genre= await Genre.findById(req.params.id)
    if(!genre)return res.status(404).send("couldn't find genre with that specific id")
    res.send(genre)

})

//input validation

function validateGenre(genre){

    const schema=Joi.object({name:Joi.string().min(3).required()})

    return schema.validate(genre)

}

module.exports=router