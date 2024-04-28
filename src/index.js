// // src/index.js
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/database');
// const userRoutes = require('./routes/userRoutes');
// const errorHandler = require('./middleware/errorMiddleware');
// const multer = require('multer');
// const userController = require('./controllers/usercontroller');
// const bodyParser = require('body-parser');
// dotenv.config({ path: '../.env' });
// require('dotenv').config();


// // Set up Multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.body.userName + file.originalname); // Use original filename for uploaded files
//     }
// });
// const upload = multer({ storage: storage });
// const app = express();


// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// // app.use(upload.array()); 
// // app.use(express.static('public'));
// app.post('/api/users/signup', 
// upload.single('photo'),
//  userController.signup); // signup api

//  app.post('/api/users/login', userController.login); // login api

// // Connect to MongoDB

// // Middleware


// // Routes
// app.use('/api/users', userRoutes);

// // Error Handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// connectDB();
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors"); // Import du middleware CORS
const userController = require("./controllers/usercontroller");
const multer = require("multer");
const bodyParser = require("body-parser");
dotenv.config({ path: "../.env" });
require("dotenv").config();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, req.body.userName + file.originalname); // Use original filename for uploaded files
  },
});
const upload = multer({ storage: storage });
const app = express();

// Ajout du middleware CORS pour autoriser les requêtes depuis localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users/signup", upload.single("photo"), userController.signup); // signup api
app.post("/api/users/login", userController.login); // login api


// Connect to MongoDB

// Middleware

// Routes
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
