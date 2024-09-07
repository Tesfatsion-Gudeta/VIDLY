const express=require('express')
const {Movie,validate}=require('../models/movie')
const { Genre } = require('../models/genre')
const router=express.Router()


//routes

router.get('/',async(req,res)=>{
    res.send(await Movie.find().sort('title'))
})

router.post('/',async(req,res)=>{
   const {error}= validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
   
    const genre=await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('could not find genre')
    const movie=new Movie({
    title:req.body.title,
    genre:{
        _id:genre._id,
        name:genre.name},
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
    })
    res.send(await movie.save())
})

router.put('/:id',async(req,res)=>{
    let movie= await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('could not find movie what that id')
    const{error}=validate(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    
    const genre=Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send('could not find genre')
    
    movie= movie.updateOne({
        title:req.body.title,
        genre:{
           _id:genre.id,
           name:genre.name},
         numberInStock:req.body.numberInStock,
         dailyRentalRate:req.body.dailyRentalRate
    },{new:true})

    res.send(movie)
})

router.delete('/:id',async(req,res)=>{
    const movie= await Movie.findByIdAndDelete(req.params.id)
    if(!movie) return res.status(404).send('movie with that specific id is not found')
    res.send(movie)

})

module.exports=router