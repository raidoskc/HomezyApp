const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");

const Product = require("../Models/Product.model");

//http://127.0.0.1:3000/Products
//Getting a list of all products
router.get("/", async (req, res, next) => {
  try {
    const results = await Product.find({}, { 
      Name: 1, 
      Price: 1, 
      Description: 1,
      Sale: 1,
      Photo: 1,
      ZipCode: 1,
      Region: 1,
      Roof: 1,
      Area: 1,
      Bedrooms: 1 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
});

//POST a New Product in DB
router.post("/", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    if(error.name === 'validationError'){
      console.log(error.message);
      next(createError(422, error.message))
      return
    }
    next(error)
  }
});

//Return in JSON all the results from a specific Product με βάση το ID στην DB
//http://127.0.0.1:3000Products/ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    //findOne => {Query} {Attributes}
    const product = await Product.findOne({ _id: id }, { __v: 0 });

    if (!product) {
      throw createError(404, "Product does not exist.");
    }
    res.send(product);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product ID"));
      return;
    }
    //Call the error hundler in app.js for 404
    next(error);
  }
});

//Για update ένα Product με βάση το ID
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updates, options);
    if(!result){
      throw createError(404,'Product does not exist')
    }
    res.send(result);
  } catch (error) {
    console.log("Error ............ " + error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Product ID"));
    }
    next(error)
  }
});

//delete ένα PRODUCT με βάση το ID
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Product.findOneAndDelete({ _id: id });
    if (!result) {
      throw createError(404, "Product does not exist.");
    }
    res.send(result);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product ID"));
      return;
    }
    //Call the error hundler in app.js for 404
    next(error);
  }
});

module.exports = router;