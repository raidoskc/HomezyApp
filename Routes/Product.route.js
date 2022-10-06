const express = require("express");
const router = express.Router();

const Product = require("../Models/Product.model");

//http://127.0.0.1:3000Products
router.get("/", async (req, res, next) => {
  try {
    const results = await Product.find({}, { name: 1, price: 1 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
  //res.send("Getting a list of all products..");
});

router.post("/", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

//http://127.0.0.1:3000Products/ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    //const product = await Product.findById(id)
    const product = await Product.findOne({ _id: id }, { __v: 0 });
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", async(req, res, next) => {
  //res.send("Update a product..");
  console.log("nnnnnnnnnnnnnnnnnnnnnn");
  try {
    
    const id = req.params.id;
    const updates = req.body
    const options = {new: true}
    
    const result = await Product.findByIdAndUpdate(id, updates, options)
    res.send(result)
  
  } catch (error) {
    console.log("Error ............ " + error.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    //const product = await Product.findById(id)
    const result = await Product.findOneAndDelete({ _id: id });
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
