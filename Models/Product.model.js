var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Sheama της βάσης στο ATLAS.
var ProductScheama = new Schema({
  Name: {
    type: String,
    required: true
  },
  Description: {
    type: String
  },
  Price: {
    type: String,
    required: true
  },
  Sale: {
    type: Boolean,
    default: false
  },
  Photo: {
    type: String
  },
  ZipCode: {
    type: Number
  },
  Region: {
    type: String
  },
  Roof: {
    type: Number
  },
  Area: {
    type: Number
  },
  Bedrooms: {
    type: Number
  }
});


//Table=Collections ==> products
const Product = mongoose.model('product', ProductScheama);
module.exports = Product;