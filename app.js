const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const dotenv = require('dotenv').config(); // No need for destructuring
const cookieParser = require('cookie-parser');


const chatController = require('./controllers/chatController');
const companyPost = require('./models/companyPost');
const companyPostController = require('./controllers/companyPostController');
const User = require('./models/userModel');
const userController = require('./controllers/userController');
const Comment = require('./models/commentModel');
const commentController = require('./controllers/commentController');
const Message = require('./models/chatModel');
const chatRouter = require('./routers/chatRouter');
const commentRoute = require('./routers/commentRoute');
const PostRouter = require('./routers/PostRouter');
const userRouter = require('./routers/userRouter')


mongoose.connect("mongodb+srv://samysaffarbatti:7xRay2ara@navigibiz.brdx1by.mongodb.net/navigiBIZ"
  , {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

//--------

// Routes
app.use('/chat', chatRouter);
app.use('/home', PostRouter);
app.use('/user', userRouter);
app.use('/login', userRouter); // Add login route
app.use('/updateProfile', userRouter); // Add profile route
//app.use('/addComment', commentController.addComment);
app.use('/signup', userRouter);
app.use('/comment', commentRoute);
// app.use('/company/:companyId', PostRouter);

const isAuthenticated = (req, res, next) => {
  const sessionID = req.cookies.sessionID;
  if (sessionID) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};
app.get('/profile', isAuthenticated, (req, res) => {
  res.send('Profile page');
});

// Socket.io setup (assuming you're using Socket.io)
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
    chatController.disconnectUser(socket);
  });



  
  socket.on('startChat', ({ senderSocket, receiverUserId, messageText }) => {
    console.log('Start chat request received');
    chatController.startChat(senderSocket, receiverUserId, messageText);
  });
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file);
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/profile', upload.single('file'), function (req, res, next) {
//   // req.file is the `avatar` file
//   res.send("uploaded successfuly");

//   // req.body will hold the text fields, if there were any
// });



module.exports = app;


const PORT = 3000;

// Start the Express server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
