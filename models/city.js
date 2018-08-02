'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name:  {
    type: String,
    validate: {
      validator: (value) => {
        return /\b[A-Z]/.test(value);
      },
      message: '{VALUE} is not a valid!'
    },
    required: [true, 'Name of city is required']
  },
  country: String,
  capital: Boolean,
  location: {
    lat: {
      type: Number,
      min: -90,
      max: 90,
      required: true
    },
    long: {
      type: Number,
      min: -180,
      max: 180,
      required: true
    }
  },
  lastModifiedDate: Date
});

module.exports = mongoose.model('City', citySchema);
