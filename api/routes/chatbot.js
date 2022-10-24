const express = require("express");
const router = express.Router();
const cleanDeep = require('clean-deep');
const mongoose = require("mongoose");
const Product = require("../models/product");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const product = require("../models/product");

/*const dotenv = require("dotenv");
dotenv.config();*/

<<<<<<< HEAD
router.post("/", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });


  const reqData = req.body.queryResult.outputContexts[0].parameters;

function replacer (key, value) {
  if (value === "" || value===null || value===undefined || key.includes("original") || value==="null"){
    delete key
  }else{
    return value
  }
}

console.log("fffffffff:  " + JSON.stringify(reqData, replacer))

const dataString = JSON.stringify(reqData, replacer)
var dataParsed = JSON.parse(dataString)

  //console.log("dd:" + JSON.stringify(reqData))
  const data = {
    Sale: false,
    Region: reqData.city,
    Price: {
      "$lte": dataParsed.maxPrice,
      "$gte": dataParsed.minPrice,
    },
    Roof: dataParsed.floor,
    Area: {
      "$lte": dataParsed.sqMax,
      "$gte": dataParsed.sqMin,
    },
  };
  

  var finalData  = {}
  finalData = cleanDeep(data) 
  console.log("finaldata: " + JSON.stringify(cleanDeep(data)))



  //console.log("kkk:  " +JSON.parse(data))

  
  var url = "http://localhost:3000/Search?page=1";
  for (let i in finalData) {
    if (typeof finalData[i] == "object" && finalData[i]!=NaN && finalData[i]!={} && Object.keys(finalData[i]).length!==0) {
      for (let j in finalData[i]) {
        if (finalData[i][j] !== undefined) {
          //if (data[i][j] !== "") {
            //console.log("ddddddddd: " + finalData[i][j])
            url += "&" + i + j + "=" + finalData[i][j];
          //}
        }
      }
      
    } else {
      if (finalData[i] != undefined) {
        //if (data[i] !== "") {
          url += "&" + i + "=" + finalData[i];
          
        //}
      }
    }
  }

  
  //console.log("ggggg:  " + Object.values(data))
  //const queryParsed = JSON.parse(query)
  //console.log("qqqqq: " + JSON.stringify(queryParsed, replacer))
  //console.log("data:   " + JSON.stringify(data, replacer));
  console.log("url:   " + url);


try {
 var houses = await product.find({"Roof": 4}).select('_id').limit(3).sort('-Price')  
} catch (error) {
  console.log(error.message)
}

console.log (JSON.stringify(houses))

  function findHome(agent) {
    agent.add("http://localhost:3000/Products/"+houses[0]._id)
    agent.add("http://localhost:3000/Products/"+houses[1]._id)
    agent.add("http://localhost:3000/Products/"+houses[2]._id)
    agent.add("For more...")
    agent.add(url)
  }


  var intentMap = new Map();
  //intentMap.set("Default Welcome Intent", Default);
  intentMap.set("finalize-yes", findHome);
  intentMap.set("optional filters", findHome);
  agent.handleRequest(intentMap);
=======
router.post("/", (request, response) =>{
    const agent = new WebhookClient({ request: req, response: res });


  const reqData = req.body.queryResult.outputContexts[0].parameters;
  //console.log("dd:" + JSON.stringify(reqData))
  const data = {
    sale: false,
    region: reqData.city,
    price: {
      "[$lte]": reqData.maxPrice,
      "[$gte]": reqData.minPrice,
    },
    Roof: reqData.floor,
    Area: {
      "[$lte]": reqData.sqMax,
      "[$gte]": reqData.sqMin,
    },
  };

  var url = "http://localhost:3000/Search?page=1";
  for (let i in data) {
    if (typeof data[i] == "object") {
      for (let j in data[i]) {
        if (data[i][j] != undefined) {
          if (data[i][j] !== "") {
            url += "&" + i + j + "=" + data[i][j];
          }
        }
      }
    } else {
      if (data[i] != undefined) {
        if (data[i] !== "") {
          url += "&" + i + "=" + data[i];
        }
      }
    }
  }

 
  console.log("data:   " + JSON.stringify(data));
  function findHome(agent) {
    agent.add("Webhook answer!  ==>  " + url);
  }
  

  var intentMap = new Map();
  intentMap.set("Default Welcome Intent", Default);
  intentMap.set("finalize-yes", findHome);
  intentMap.set("optional filters", findHome);
  agent.handleRequest(intentMap);
    
>>>>>>> 0781dfb1effd64417d042fdba37ff1363a61c4fb
});

module.exports = router;