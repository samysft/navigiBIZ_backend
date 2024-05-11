const express = require('express');
const router = express.Router();
const { getRatings, submitRating } = require('../models/companyRatingModel');

router.post('/company/:companyId/rate', (req, res) => {
  submitRating(req, res);
});

router.get('/company/:companyId/ratings', (req, res) => {
  getRatings(req, res);
});

module.exports = router;
