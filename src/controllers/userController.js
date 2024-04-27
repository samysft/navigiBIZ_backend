// src/controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    const { userName, email, password, phoneNumber, userType } = req.body;

    if(!userName || !email || !req.file){
      return res.status(400).json({
        "message":"please provide all fields"
      })
    }
    try {

        const hashedPassword = await bcrypt.hash(password,12); 

        // check if the email already exitst
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email or username already exists' });
        }
        // const userExist = await User.findOne({email:req.email});
        // console.log(userExist)
        // if so return that to the front end 
        // email already in use 
        let photoPath =    req.file.path;
        let newUser;

            // Handle consumer signup
            newUser = new User({
                userName,
                email,
                password : hashedPassword,
                phoneNumber,
                userType,
                photo: photoPath, // Assuming photo upload is handled by multer
            });
        if (userType === 'company') {
            // Handle company signup
            const { ceoName, location, websiteLink, description } = req.body;
            // add validation to ensure that this data is handed , 
            // do this here
            if(!ceoName || !location || !websiteLink){
                return res.status(400).json({
                  "message":"please provide all fields"
                })
              }

            newUser.ceoName = ceoName;
            newUser.location =  location;
            newUser.websiteLink=  websiteLink;
            newUser.description=  description;
        }

        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try{

    const { userName, email, password } = req.body;
    
    // Check if userName or email is present in the request body
    if (!userName && !email) {
        return res.status(400).json({ success: false, message: 'Username or email is required' });
    }
    
    console.log(req.body);

    // Find user by userName or email
    const identifier = userName || email;
    const user = await User.findOne({ $or: [{ userName: identifier }, { email: identifier }] });


    // Check if user exists
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email/username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid email/username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
} catch (err) {
    next(err);
}
};