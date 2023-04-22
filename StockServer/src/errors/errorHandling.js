function errorHandling(err,req,res,next){
    res.status(500).json({mensaje: err.message});
}

module.exports = errorHandling;