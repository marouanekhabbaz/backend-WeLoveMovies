const theaters = require("./theaters.service")

async function list (req , res , next){
    const data = await theaters.list()
    res.json({data})
}

module.exports = {
    list
}