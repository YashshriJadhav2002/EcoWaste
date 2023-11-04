const jwt=require('jsonwebtoken')


const fetchToken=(req,res,next)=>{

    const token=req.body.auth_token
    if(!token)
    return res.status(400).json({message:"Unauthorized Token"})

    try
    {
        const userid=jwt.verify(token,process.env.SECRET_KEY)
        req.user=userid.user
        next();
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
}

module.exports=fetchToken