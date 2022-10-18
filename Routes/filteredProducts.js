const express = require("express");
const router = express.Router();

const Product = require("../Models/Product.model");

router.get('/', async (req, res) => {

    const filter = new filters(Product.find(req.query));

    const params = await filter.query;

    if(!params) {
        res.status(500).json({success: false})
    } 
    res.json({
        params
        });
});

class filters {
    constructor(query){
        this.query = query;
    }

    parameters() {
        const param = this.query;
        this.query = this.query.find(param)
        return this;
    }
}

module.exports = router;