const Joi=require('joi')
const express=require('express')
const app=express()
app.use(express.json())


const genres=[{id:1,name:"action"},{id:2,name:"adventure"},{id:3,name:"romance"},{id:4,name:"horror"}]

//for get request of the list of genres

app.get('/api/genres',(req,res)=>{
    res.send(genres)
})

//for post request/adding a genre
app.post('/api/genre',(req,res)=>{
    const {error}=validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre={id:genres.length+1,name:req.body}
    genres.push(genre)

    res.send(genre)


})

//for put request/for updating the genres

app.put('/api/genre/:id',(req,res)=>{

   const genre= genres.find(g=>g.id===parseInt(req.params.id))
   if(!genre) return res.status(404).send('genre with that specific id is not found')

   const {error}=validateGenre(req.body)
   if(error) return res.status(400).send(error.details[0].message)

    genre.name=req.body

})

//for delete request of the genres

app.delete('/api/genre/:id',(req,res)=>{
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

//listing to a port

const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening to the port ${port}...`)})