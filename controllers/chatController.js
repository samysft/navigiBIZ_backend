const Message = require('../models/chatModel');

async function sendMessage(req, res) {
  const { sender, receiver, text } = req.body;

  try {
    const newMessage = await Message.create({ sender, receiver, text });
    res.status(201).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function disconnectUser(socket) {
  const disconnectedUserId = socket.user._id; // Assuming user information is stored in the socket

  socket.broadcast.emit('userDisconnected', { userId: disconnectedUserId });
}

async function startChat(senderSocket, receiverUserId, messageText) {
  const senderUserId = senderSocket.user._id; // Assuming user information is stored in the socket

  const message = {
    sender: senderUserId,
    receiver: receiverUserId,
    text: messageText
  };

  senderSocket.to(receiverUserId).emit('newMessage', message);
}

module.exports = { sendMessage, disconnectUser, startChat };
