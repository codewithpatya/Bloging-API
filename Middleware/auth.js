const jwt = require("jsonwebtoken")

async function auth(req,res,next) {
    try {
       const token = req.header("auth-token")
        
       const verifytoken = await jwt.verify(token,process.env.SEC)
       if(!verifytoken) return res.status(400).json({error:true,message:"Invalid Token"})


       next()
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

module.exports = auth