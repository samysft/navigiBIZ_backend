const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/userModel');
const Company = require('../models/companyModel.js');

// Endpoint for user signup
//app.post('/signup',upload.single('logo') , async (req, res) => {
async function signup(req, res) {
  try {
    // Extract user data from request body
    const { username, email, password, userType, phoneNumber, ceoName, companyWebsite, location, description } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    if (ceoName) {
      // Create a new company
      newUser = new Company({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        ceoName,
        companyWebsite,
        location,
        description,
      });
    } else {
      // Create a new user
      newUser = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        userType,
      });
    }


    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint for user login
//app.post('/login', async (req, res) => {
async function login(req, res) {

  try {
    // Extract username and password from request body
    const { email, password } = req.body;

    // Findiw user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }
    //res.cookie('authenticated', true);

    // Send success response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: error.message });
  }
};


//------------------------------------------------


// Endpoint llediting user profile
//app.put('/profile/:userId', upload.single('photo'), async (req, res) => {
  async function updateProfile(req, res) {
    try {
      // Extract data from request body
      const { username, email, phoneNumber, ceoName, companyWebsite, location, description } = req.body;
      const { userId } = req.params;
  
      let user;
  
      // Check if the user is a company
      const isCompany = await Company.exists({ _id: userId });
  
      // Find the user by ID based on the user type
      if (isCompany) {
        user = await Company.findById(userId);
      } else {
        user = await User.findById(userId);
      }
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details
      user.username = username;
      user.email = email;
      user.phoneNumber = phoneNumber;
  
      // If the user is a company, update company details
      if (isCompany) {
        user.ceoName = ceoName;
        user.companyWebsite = companyWebsite;
        user.location = location;
        user.description = description;
      }
  
      // If a photo was uploaded, update the user's photo
      if (req.file) {
        user.photo = req.file.path;
      }
  
      // Save the updated user profile
      await user.save();
  
      // Send success response
      res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
      // Send error response
      res.status(500).json({ message: error.message });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user by ID and delete it
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const logout = async (req, res) => {
    try {
      // Clear the session cookie
      res.clearCookie('sessionID');
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
module.exports = { signup, login, updateProfile ,  logout , deleteUser};