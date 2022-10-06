var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductScheama = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});


const Product = mongoose.model('product', ProductScheama);
module.exports = Product;