const express=require('express')
const mongoose=require('mongoose')
const genres=require('./routes/genres')
const customers=require('./routes/customers')
const movies=require('./routes/movies')
const rentals=require('./routes/rentals')

const app=express()
app.use(express.json())
app.use('/api/genres',genres)
app.use('/api/customers',customers)
app.use('api/movies',movies)
app.use('/api/rentals',rentals)

//connecting to mongodb
mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('connected to mongodb...'))
.catch(e=>console.log(e))

//listing to a port
const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening to the port ${port}...`)}) 