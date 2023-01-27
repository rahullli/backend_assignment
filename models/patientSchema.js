// Schema of the Patient 

const mongoose = require("mongoose");
const validator = require("validator");
const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age : {

    type : Number,
    required: true,
  }, 

  dob: {
        type: String,
        required: true,
        match: /^\d{2}\/\d{2}\/\d{4}$/
  },

  gender: {
    type: String,
    required: true,
    trim: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Invalid email");
      }
    },
  },

  address: {
    type: String,
    required: true,
  },

  insurance: [{
    type: String,
    required: true,
  }],

  medicalHistory: [{
    
        type: String,
  }],

  maritalStatus: {
    type: String,
    required: true,
  },

  disease: [{
    type: String,
    required: true,
  }],

  consultedDoctor: [{
    type: String,
  }],

  datecreated: Date
  
});

const patients = mongoose.model('patients' , patientSchema);
module.exports = patients ;