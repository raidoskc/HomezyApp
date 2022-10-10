const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();

const Product = require("../Models/Product.model");

router.get('/enoikiasi', async (req, res) => {
    const type = await Product.find({Sale: false});

    if(!type) {
        res.status(500).json({success: false})
    }
    res.send({type});

});

router.get('/polisi', async (req, res) => {
    const type = await Product.find({Sale: true});

    if(!type) {
        res.status(500).json({success: false})
    }
    res.send({type});

});

//search db with multiple parameters
router.get("/:query", async (req, res) => {

    const filter = await Product.find(req.query);

    if(!filter) {
        //throw createHttpError(404, "Product does not exist.")
        res.status(500).json({success: false})
    }
    res.send({filter});
});

module.exports = router;