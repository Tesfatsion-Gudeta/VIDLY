const express=require('express')
const router=express.Router()

const genres=[{id:1,name:"action"},{id:2,name:"adventure"},{id:3,name:"romance"},{id:4,name:"horror"}]

//for get request of the list of genres

router.get('/',(req,res)=>{
    res.send(genres)
})

//for post request/adding a genre
router.post('/',(req,res)=>{
    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre={id:genres.length+1,name:req.body}
    genres.push(genre)

    res.send(genre)


})

//for put request/for updating the genres

router.put('/:id',(req,res)=>{

   const genre= genres.find(g=>g.id===parseInt(req.params.id))
   if(!genre) return res.status(404).send('genre with that specific id is not found')

   const {error}=validateGenre(req.body)
   if(error) return res.status(400).send(error.details[0].message)

    genre.name=req.body

})

//for delete request of the genres

router.delete('/:id',(req,res)=>{
    const genre= genres.find(g=>g.id===parseInt(req.params.id))
    if(!genre) return res.status(404).send('genre with that specific id is not found')
    
    const index=genres.indexOf(genre)
    genres.splice(index,1)
    res.send(genre)

})

//input validation

function validateGenre(genre){

    const schema=Joi.object({name:Joi.string().min(3).required()})

    return schema.validate(genre)

}

module.exports=router