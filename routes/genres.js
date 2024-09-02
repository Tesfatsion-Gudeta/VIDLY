const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()



//schema for the genres database
const genreSchema=new mongoose.Schema({
    name:String
    })

//model 
const Genre=mongoose.model('Genre',genreSchema)



//for get request of the list of genres

router.get('/',async (req,res)=>{
    res.send(await Genre.find())
})

//for post request/adding a genre
router.post('/',async(req,res)=>{
    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //creating and saving a new genre
    let genre=new Genre({name:req.body})
    genre=await genre.save()
    res.send(genre)


})

//for put request/for updating the genres

router.put('/:id',async(req,res)=>{

    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body},{new:true})
    if(!genre) return res.status(404).send('genre with that specific id is not found')
    res.send(genre)
})

//for delete request of the genres

router.delete('/:id',async (req,res)=>{
    const genre= genres.find(g=>g.id===parseInt(req.params.id))
    if(!genre) return res.status(404).send('genre with that specific id is not found')
    
    const index=genres.indexOf(genre)
    genres.splice(index,1)

    const d=await Genre.deleteOne({id:id})
    res.send(genre)

})

//input validation

function validateGenre(genre){

    const schema=Joi.object({name:Joi.string().min(3).required()})

    return schema.validate(genre)

}

module.exports=router