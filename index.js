require('express-async-errors')
const winston=require('winston')
const error=require('./middleware/error')
const express=require('express')
const mongoose=require('mongoose')
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const config=require('config')
const genres=require('./routes/genres')
const customers=require('./routes/customers')
const movies=require('./routes/movies')
const rentals=require('./routes/rentals')
const users=require('./routes/users')
const auth=require('./routes/auth')
const app=express()


winston.add(new winston.transports.File({ filename: 'logfile.log' }));

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined')
    process.exit(1)
}

app.use(express.json())
app.use('/api/genres',genres)
app.use('/api/customers',customers)
app.use('/api/movies',movies)
app.use('/api/rentals',rentals)
app.use('/api/users',users)
app.use('/api/auth',auth)
require('./prod')(app)

//for errors
app.use(error)



//connecting to mongodb
mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('connected to mongodb...'))
.catch(e=>console.log(e))

//listing to a port
const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening to the port ${port}...`)}) 