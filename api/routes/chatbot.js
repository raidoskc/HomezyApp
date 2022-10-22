//const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const dialogflow = require("@google-cloud/dialogflow");

const { WebhookClient } = require('dialogflow-fulfillment');

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
    
});

module.exports = router;

