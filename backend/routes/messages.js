const express = require('express');
const router = express.Router();
const authorize = require('../verifytoken');
const MessageController = require('../controllers/messagecontroller');
router.post('/register', MessageController.register);
router.post('/login', MessageController.login);
router.post('/createmessage/:username', MessageController.createMessage);
router.get('/getmessages/:username', authorize, MessageController.getMessages);
router.delete(
  '/deletemessage/:username/:_id',
  authorize,
  MessageController.deleteMessage
);
module.exports = router;
