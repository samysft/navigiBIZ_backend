
const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  
  password:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  photo: String , 
  userType: { type: String },
  ceoName:{
    type: String,
    required: true
  },
  companyWebsite:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
    logo: String  
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;