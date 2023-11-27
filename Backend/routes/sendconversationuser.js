const express=require('express')
const router=express.Router();
const Conversations=require(
'../models/Conversation'
)
const Messages=require('../models/Messages')
const Users=require('../models/sellerModel')


router.get('/', async (req, res) => {
    try {
        const checkMessages = async (conversationId) => {
            console.log(conversationId, 'conversationId')
            const messages = await Messages.find({ conversationId });
            const messageUserData = Promise.all(messages.map(async (message) => {
                const user = await Users.findById(message.senderId);
                return { user: { id: user._id, email: user.Email, fullName: user.Name }, message: message.message }
            }));
            res.status(200).json(await messageUserData);
        }
        const conversationId = req.query.conversationId;
        if (conversationId === 'new') {
            const checkConversation = await Conversations.find({ members: { $all: [req.query.senderId, req.query.receiverId] } });
            if (checkConversation.length > 0) {
                checkMessages(checkConversation[0]._id);
            } else {
                return res.status(200).json([])
            }
        } else {
            checkMessages(conversationId);
        }
    } catch (error) {
        console.log('Error', error)
    }
})

module.exports=router;