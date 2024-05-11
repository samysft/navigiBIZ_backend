const mongoose = require('mongoose');

const companyRatingSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

const CompanyRating = mongoose.model('CompanyRating', companyRatingSchema);

module.exports = CompanyRating;
