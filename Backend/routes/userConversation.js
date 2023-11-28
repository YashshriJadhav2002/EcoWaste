const express=require('express')
const router=express.Router();
const Conversations=require(
'../models/Conversation'
)
const Users=require('../models/sellerModel')

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(receiverId);
            return { user: { receiverId: user._id, email: user.Email, fullName: user.Name }, conversationId: conversation._id }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log(error, 'Error')
    }
})

module.exports=router;