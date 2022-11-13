const express = require("express");
const router = express.Router();
const cleanDeep = require("clean-deep");
const mongoose = require("mongoose");
const Product = require("../models/product");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const product = require("../models/product");

require("dotenv").config();

/*const dotenv = require("dotenv");
dotenv.config();*/

router.post("/", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  
  const  reqData = req.body.queryResult.outputContexts[1].parameters;

  function replacer(key, value) {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      key.includes("original") ||
      value === "null"
    ) {
      delete key;
    } else {
      return value;
    }
  }

  //console.log(JSON.stringify(reqData, replacer))

  //console.log("kk" + JSON.stringify(reqData))
  const dataString = JSON.stringify(reqData, replacer);
  var dataParsed = JSON.parse(dataString);

  //console.log(":" + JSON.stringify(reqData))
  const data = {
    Sale: reqData.type,
    Region: reqData.city,
    maxPrice: dataParsed.maxPrice,
    minPrice: dataParsed.minPrice,
    Roof: dataParsed.floor,
    sqMax: dataParsed.sqMax,
    sqMin: dataParsed.sqMin,
  };

  var finalData = {};
  finalData = cleanDeep(data);
  //console.log("finaldata: " + data.Sale)
  //console.log("finaldata: " + data.Region)

  //console.log(JSON.parse(data))

  var url = process.env.URL + "/Search?page=1";
  for (let i in finalData) {
    if (
      typeof finalData[i] == "object" &&
      finalData[i] != NaN &&
      finalData[i] != {} &&
      Object.keys(finalData[i]).length !== 0
    ) {
      for (let j in finalData[i]) {
        if (finalData[i][j] !== undefined) {
          //if (data[i][j] !== "") {
          url += "&" + i + "[" + j + "]" + "=" + finalData[i][j];
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
  console.log("kkkkk: " + finalData.Sale + " " + finalData.Region + " " +finalData.maxPrice + " " +finalData.minPrice + " " +finalData.Roof + " " +finalData.sqMin + " " + finalData.sqMax)
  console.log("url:   " + url);
  try {
    var houses = await product
      .find({ Roof: 4 })
      .select("_id")
      .limit(3)
      .sort("-Price");
  } catch (error) {
    console.log(error.message);
  }

  var returnedData = finalData.Sale + "&" + finalData.Region + "&" +finalData.minPrice + "&" +finalData.maxPrice 


  function findHome(agent) {
    /*agent.add(
      process.env.URL + process.env.PORT + "/Products/" + houses[0]._id
    );
    agent.add(
      process.env.URL + process.env.PORT + "/Products/" + houses[1]._id
    );
    agent.add(
      process.env.URL + process.env.PORT + "/Products/" + houses[2]._id
    );
    agent.add("For more...");*/
    agent.add(returnedData);
  }
  /*function Default(agent) {
    var data = {
      richContent: [
        [
          {
            type: "image",
            rawUrl:
              "https://archello.s3.eu-central-1.amazonaws.com/images/2018/10/11/Contemporary-Modern-House-Design-6.1539270983.8601.jpg",
            accessibilityText: "Dialogflow across platforms",
          },
          {
            type: "info",
            title: "Dialogflow",
            subtitle: "Build natural and rich conversational experiences",
            actionLink: "https://cloud.google.com/dialogflow/docs",
          },
          {
            type: "chips",
            options: [
              {
                text: "Case Studies",
                link: "https://cloud.google.com/dialogflow/case-studies",
              },
              {
                text: "Docs",
                link: "https://cloud.google.com/dialogflow/docs",
              },
            ],
          },
        ],
      ],
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, data, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  }*/

  var intentMap = new Map();
  //intentMap.set("Default Welcome Intent", Default);
  intentMap.set("price-range-finalize", findHome);
  intentMap.set("price-range-finalize", findHome);
  agent.handleRequest(intentMap);
});

module.exports = router;
