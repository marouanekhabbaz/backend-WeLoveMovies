const movies = require("./movies.service")

async function readTheaters  (req, res , next){
    const {movieId} = req.params 
 let data = await movies.readTh(movieId)
res.json({ data })
}

async function readTReviews (req, res , next){
    const {movieId} = req.params 
 let data = await movies.readRev(movieId)
res.json({ data })
}


async function list (req, res , next){
    const  {is_showing} = req.query
 let data = await movies.list(is_showing)
 
res.json({ data })
}

async function movieExist(req , res , next){
    const {movieId} = req.params
    let movie = await movies.readData(movieId)
    if(movie){
        next()
    } else{
        next({
            status:404,
            message:"Movie cannot be found."
        })
    }
}

async function read(req, res , next){
    try{
    const {movieId} = req.params
let data = await movies.readData(movieId)
res.json({ data })
    }
    catch(err){
        console.log(err)
    }
}



module.exports = {
    list,
    read: [movieExist, read],
    readTheaters:[ movieExist,readTheaters],
    readTReviews:[ movieExist , readTReviews]
  };