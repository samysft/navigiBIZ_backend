const CompanyPost = require('../models/companyPost');
const Company = require('../models/companyModel');

const getCompanyPosts = async (req, res) => {
  try {
    const posts = await CompanyPost.find().limit(5);

    res.json(posts);
  } catch (err) {
    console.error('Error retrieving company posts', err);
    res.status(500).json({ error: 'Error retrieving company posts' });
  }
};


const getRandomCompanyProfiles = async (req, res) => {
  try {
    const companies = await Company.aggregate([{ $sample: { size: 5 } }]);

    const companyProfiles = companies.map(company => ({
      logo: company.logo,
      name: company.username
    }));

    res.json(companyProfiles);
  } catch (err) {
    console.error('Error retrieving random company profiles', err);
    res.status(500).json({ error: 'Error retrieving random company profiles' });
  }
};

module.exports = {
  getRandomCompanyProfiles ,
  getRandomCompanyProfiles ,
  getCompanyPosts
};

