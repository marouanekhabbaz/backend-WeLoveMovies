const reviews = require("../reviews/reviews.service")
 
async function exist(req , res , next){
  const   {reviewId} = req.params
  let data = await reviews.list(reviewId)
  
if(data){
    next()
} else{
    next({
        status:404,
        message:"Review cannot be found."
    })
}
}

async function destroy(req , res , next){
    const   {reviewId} = req.params
    let data = await reviews.delete(reviewId)
    res.sendStatus(204)
}

async function update(req , res , next){
    const   {reviewId} = req.params
    const review = {
        ...req.body.data,
        review_id: reviewId
    }
let updated = await  reviews.update(review)
let data = await reviews.readRev(reviewId)
res.json({data})
}

module.exports= {
    destroy:[exist , destroy],
    update:[exist, update]
}