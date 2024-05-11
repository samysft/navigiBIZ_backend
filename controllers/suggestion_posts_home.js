const CompanyPost = require('../models/Post');
const Company = require('../models/companyModel');

// Controller function to retrieve up to 5 company posts
const getCompanyPosts = async (req, res) => {
  try {
    // Retrieve up to 5 company posts from the database
    const posts = await CompanyPost.find().limit(5);

    // Send retrieved posts as JSON response
    res.json(posts);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error retrieving company posts', err);
    res.status(500).json({ error: 'Error retrieving company posts' });
  }
};


// Function to get random company profiles
const getRandomCompanyProfiles = async (req, res) => {
  try {
    // Retrieve 5 random companies from the database
    const companies = await Company.aggregate([{ $sample: { size: 5 } }]);

    // Extract relevant information (logo and name) from each company
    const companyProfiles = companies.map(company => ({
      logo: company.logo,
      name: company.username
    }));

    // Send the random company profiles as JSON response
    res.json(companyProfiles);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error retrieving random company profiles', err);
    res.status(500).json({ error: 'Error retrieving random company profiles' });
  }
};

module.exports = {
  getRandomCompanyProfiles ,
  getRandomCompanyProfiles ,
  getCompanyPosts
};

