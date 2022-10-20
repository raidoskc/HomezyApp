//const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const dialogflow = require("@google-cloud/dialogflow");

const { WebhookClient } = require('dialogflow-fulfillment');

router.post("/", (request, response) =>{
    const _agent = new WebhookClient({request: request, response: response});


    function respond(agent) {
        return agent.add("ok thats great you finished from back end");
    };

    let intents = new Map();

    intents.set("finalize-yes", respond);
    _agent.handleRequest(intents);
    
});

module.exports = router;

