const express = require("express");
const app = express();

const mongoose = require('mongoose');

const ProductRoute = require('./Routes/Product.route');

//For connection-Type in POST
app.use(express.json());
app.use(express.urlencoded({extended: true}))

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

app.use('/Products', ProductRoute);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});


/*app.use((req, res, next) => {
    res.status(404);
    res.send({
        error: 'Not Found'
    })
})*/

/*app.get("/", (req, res) => {
  console.log("Req URL: " + req.url);
  console.log("Req method: " + req.method);
  res.send("Home Route..I am listening on port 3000");
});

app.post("/", (req, res) => {});

app.delete("/", (req, res) => {});*/

app.listen(3000, () => {
  console.log("Hello World..I am listening on port 3000");
});
