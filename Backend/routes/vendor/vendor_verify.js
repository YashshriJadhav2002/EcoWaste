const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Buyer=require('../../models/buyerModel')

router.get('/', async (req, res) => {
    try {
        const token = req.query.token;
        console.log(token)
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded)
      // Update user's isVerified status
      const user=await Buyer.findOneAndUpdate({ Email: decoded.email }, { isVerified: true });
      console.log(user)
      if(!user)
      res.status(400).json({ message: 'Invalid Link.' });
      else
      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      res.status(400).json({ error:error});
    }
  });

module.exports=router;