const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//Schema of the database
const ProductSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    default: "No Data for this House..",
  },
  Price: {
    type: Number,
    required: true,
  },
  Sale: {
    type: Boolean,
    default: false,
  },
  Photo: {
    type: String,
    Default: null,
  },
  ZipCode: {
    type: Number,
    required: true,
  },
  Region: {
    type: String,
    required: true,
  },
  Roof: {
    type: Number,
    default: -1,
  },
  Area: {
    type: Number,
    default: -1,
  },
  Bedrooms: {
    type: Number,
    default: -1,
  },
});

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("product", ProductSchema);
