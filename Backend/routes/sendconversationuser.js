const express=require('express')
const router=express.Router();
const Conversations=require(
'../models/Conversation'
)
const Messages=require('../models/Messages')
const Users=require('../models/sellerModel')
const Vendor=require('../models/buyerModel')

router.get('/', async (req, res) => {
    try {
        const checkMessages = async (conversationId) => {
            const messages = await Messages.find({ conversationId });
            const messageUserData = Promise.all(messages.map(async (message) => {
                let user = await Users.findById(message.senderId);
                if(user)
                return { user: { id: user._id, Email: user.Email, Name: user.Name,Avatar:user.Avatar }, message: message.message }
                else
                {
                    user=await Vendor.findById(message.senderId)
                    return { user: { id: user._id, Email: user.Email, Name: user.Name,Avatar:user.Avatar }, message: message.message }

                }
            }));
            res.status(200).json(await messageUserData);
        }
        const conversationId = req.query.conversationId;
        if (conversationId === 'new') {
            const checkConversation = await Conversations.find({senderId:req.query.senderId, receiverId:req.query.receiverId} );
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