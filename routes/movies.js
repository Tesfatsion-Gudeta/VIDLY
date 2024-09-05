const express=require('express')
const {Movie,validate}=require('../models/movie')
const { Genre } = require('../models/genre')
const router=express.Router()



//routes
router.get('/',(req,res)=>{
    res.send(Movie.find())
})
router.post('/:id',async(req,res)=>{
    const genre=Genre.findById(req.params.id)
    if(!genre)return res.status(400).send('genre with that id is not found')
   const validateMovie= validate(req.body)
   if(!validateMovie) return res.status(400).send("could not add a movie")
    const movie=new Movie({
    title:req.body.title,
    genre:{id:req.params.id,name:req.body.name},
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
    })
    res.send(await movie.save())
})

router.put('/:id',(req,res)=>{})
router.delete('/:id',(req,res)=>{})

exports=router