const jwt=require('jsonwebtoken')


const fetchRefurbishedProductToken=(req,res,next)=>{

    const RefurbishedProducttoken=req.body.refurbishedproduct_token
    console.log(RefurbishedProducttoken)
    if(!RefurbishedProducttoken)
    return res.status(400).json({message:"Unauthorized Token"})

    try
    {
        const refurbishedproductid=jwt.verify(RefurbishedProducttoken,process.env.SECRET_KEY)
        req.refurbishedproduct=refurbishedproductid.refurbishedproduct
        next();
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
}

module.exports=fetchRefurbishedProductToken