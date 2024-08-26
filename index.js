const Joi=require('joi')
const express=require('express')
const genres=require('./routes/genres')
const app=express()
app.use(express.json())
app.use('/api/generes',genres)

//listing to a port

const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening to the port ${port}...`)}) 