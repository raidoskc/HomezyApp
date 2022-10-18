const express = require("express");
const app = express();

const mongoose = require('mongoose');
const createError = require("http-errors")

const ProductRoute = require('./Routes/Product.route');
const testparams= require('./Routes/filteredProducts');


//For connection-Type in POST
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Connection to Database
//mongodb+srv://SKGTEAMA:<password>@cluster0.edcw4wv.mongodb.net/?retryWrites=true&w=majority
//User: SKGTEAMA
//pass: mmLU4bvWUCknpFRe
mongoose.connect('mongodb+srv://cluster0.edcw4wv.mongodb.net/',{
    dbName: 'RESTfulAPI_Homezy',
    user: 'SKGTEAMA',
    pass: 'mmLU4bvWUCknpFRe',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
.then(()=>{
    console.log('Connecting to Database....')
})

//Use Routes..localhost:3000/Products/  ==> go to ProductRoute
app.use('/Products', ProductRoute);

//Routes for search & filters
app.use('/search', testparams);


//Catch Errors about URI (404) and pass it to error hundler 
app.use((req,res,next)=>{
    //Create Manual the error 
    //const err = new Error('Not Found');
    //err.status = 404;
    //next(err);


    //or use the createError
    next(createError(404, 'Not found'))
});


//Error Hundler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

//find() filter get method

app.listen(3000, () => {
  console.log("Hello World..I am listening on port 3000");
});