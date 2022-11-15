const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Product = require("../models/product");
require("dotenv").config();

const checkAuth = require("../CheckAuth/checkAuth");

//Upload Image
//Location to store
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  //replace to filename with correct filename
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

//Only jpeg and png images
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//with this size
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//View all Products in pagianation
router.get("/", (req, res, next) => {
  const options = {
    page: req.params.page,
    select: "_id Name Price Photo Area Region Description",
    page: req.query.page,
    limit: 70,
    sort: { Price: 1 },
  };
  Product.paginate({}, options)
    .then((result) => {
      const response = {
        //count: docs.length,

        products: result.docs.map((doc) => {
          return {
            Name: doc.Name,
            Price: doc.Price,
            Photo: doc.Photo,
            Area: doc.Area,
            Region: doc.Region,
            Description: doc.Description,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.URL + "/products/" + doc._id,
            },
          };
        }),
        info: {
          totalDocs: result.totalDocs,
          limit: result.limit,
          page: result.page,
          totalPages: result.totalPages,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          nextPage: result.nextPage,
          prevPage: result.prevPage,
          pagingCounter: result.pagingCounter,
        },
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//POST new Product House with photo
router.post("/", upload.single("Photo"), (req, res, next) => {
  const product = new Product({
    Name: req.body.Name,
    Description: req.body.Description,
    Price: req.body.Price,
    Photo: req.file.path,
    ZipCode: req.body.ZipCode,
    Sale: req.body.Sale,
    Region: req.body.Region,
    Roof: req.body.Roof,
    Area: req.body.Area,
    Bedrooms: req.body.Bedrooms,
  });
  //if (!req.file) return res.send('Please upload a file')
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        _id: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error 500",
      });
    });
});

//View one Product only with all fields
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select()
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: process.env.URL + "/products",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Update Product..No image
router.patch("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  /*const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }*/
  Product.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: process.env.URL  + "/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Delete a Product
router.delete("/:productId", checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: process.env.URL + "/products",
          body: { name: result.Name, price: result.Price },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
