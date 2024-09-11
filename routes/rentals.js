const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()
const {Rental,validate}=require('../models/rental')
const { Customer } = require('../models/customer')
const {Movie}=require('../models/movie')
const auth=require('../middleware/auth')
// const Fawn=require('fawn')
// Fawn.init(mongoose)



//routes
router.get('/',async(req,res)=>{
    res.send(await Rental.find().sort('-dateOut'))
})

router.post('/',auth,async(req,res)=>{
   const {error}= validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
   
    const customer=await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('invalid customer')
    const movie=await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('invalid movie')

    if(movie.numberInStock===0) return res.status(400).send('movie not instock')
    
    const rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone

        },
        movie:{
            _id:movie._id,
            title: movie.title,
            dailyRentalRate:movie.dailyRentalRate

        }
    })
// try{
//     new Fawn.Task()
//         .save('rentals',rental)
//         .update('movies',{_id:movie._id},{
//             $inc:{numberInStock:-1}
//         })
//         .run()
//     res.send(rental)
// }
// catch(ex){res.status(500).send('something failed')
// }

movie.numberInStock--
movie.save()
res.send(await rental.save())

})

router.get('/:id',async(req,res)=>{

    res.send(await Rental.findById(req.params.id))

})


module.exports=router