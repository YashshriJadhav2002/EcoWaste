const jwt=require('jsonwebtoken')


const fetchProductToken=(req,res,next)=>{

    const token=req.body.product_token
    console.log(token)
    if(!token)
    return res.status(400).json({message:"Unauthorized Token"})

    try
    {
        const productid=jwt.verify(token,process.env.SECRET_KEY)
        req.product=productid.product
        next();
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
}

module.exports=fetchProductToken