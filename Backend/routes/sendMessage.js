const express=require('express')
const router=express.Router();
const Conversations=require(
'../models/Conversation'
)
const Messages=require('../models/Messages')

router.post('/', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) return res.status(400).send('Please fill all required fields')
        if (conversationId === 'new' && receiverId) {
            const newCoversation = new Conversations({senderId:senderId,receiverId:receiverId });
            await newCoversation.save();
            const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
            await newMessage.save();
            return res.status(200).send('Message sent successfully');

        } else if (!conversationId && !receiverId) {
            return res.status(400).send('Please fill all required fields')
        }
        
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log(error, 'Error')
    }
})

module.exports=router;