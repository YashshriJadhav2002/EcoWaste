const express=require('express')
const router=express.Router();
const Conversations=require('../models/Conversation')

router.post('/', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newCoversation = new Conversations({ senderId:senderId,receiverId:receiverId});
        await newCoversation.save();
        res.status(200).send('Conversation created successfully');
    } catch (error) {
        console.log(error, 'Error')
    }
})

module.exports=router;