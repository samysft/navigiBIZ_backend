const CompanyRating = require('../models/companyRatingModel');

const submitRating = async (req, res) => {
    const { companyId, userId, rating } = req.body;

    try {
        await CompanyRating.create({ companyId, userId, rating });
        res.status(201).send('Rating saved successfully');
    } catch (error) {
        console.error('Error saving company rating:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getRatings = async (req, res) => {
    const { companyId } = req.params;

    try {
        const ratings = await CompanyRating.find({ companyId });
        res.json(ratings);
    } catch (error) {
        console.error('Error fetching company ratings:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {getRatings ,submitRating };