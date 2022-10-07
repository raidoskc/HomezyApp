var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Sheama της βάσης στο ATLAS.
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


//Table=Collections ==> products
const Product = mongoose.model('product', ProductScheama);
module.exports = Product;