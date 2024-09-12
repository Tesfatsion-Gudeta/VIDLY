const winston=require('winston')
module.exports=function(err,req,res,next){
    //logging error
    winston.error(err.message,err)

    res.status(500).send('Something Failed.')
}