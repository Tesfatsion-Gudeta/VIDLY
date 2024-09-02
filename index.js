const Joi=require('joi')
const mongoose=require('mongoose')
const express=require('express')
const genres=require('./routes/genres')
const app=express()
app.use(express.json())
app.use('/api/generes',genres)

//connecting to mongodb
//connecting to the db
mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('db connected...'))
.catch(e=>console.log(e.message))

//listing to a port
const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening to the port ${port}...`)}) 