const express = require("express");
const router = express.Router();
const Product = require("../models/product");

require("dotenv").config();

//Search and filters
router.get("/", (req, res, next) => {
  //Options for the paginate and find
  const options = {
    //page: req.params.page,
    select: "_id Name Price Photo Area Region Roof",
    sort: { Roof: 1 },
    page: req.query.page,
  };

  Product.paginate(req.query, options)
    .then((result) => {
      const response = {
        products: result.docs.map((doc) => {
          return {
            Name: doc.Name,
            Price: doc.Price,
            Photo: doc.Photo,
            Area: doc.Area,
            Region: doc.Region,
            _id: doc._id,
            Roof: doc.Roof,
            request: {
              type: "GET",
              url: process.env.URL + process.env.PORT + "/products/" + doc._id,
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
    /**/

    .catch((err) => {
      res
        .status(500)
        .json({ error: true, message: "Sorry!..Internal Server Error" });
    });
});

module.exports = router;
