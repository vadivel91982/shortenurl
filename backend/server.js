"use strict";
const express = require("express");
const compression = require("compression");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const APP_CONFIG = require("./config/appConfig");
// const modeconfig = require("./config/env_mode.json");

app.use(compression());
app.use(cors(APP_CONFIG.CROS_OPTIONS));
app.disable("x-powered-by");
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.text({
    limit: "50mb"
  })
);

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 1000000
  })
);

app.use(function (req, res, next) {
  try {
    if (typeof req.body == typeof "string") {
      req.body = JSON.parse(req.body);
    }
  } catch (err) {
    console.log(err);
  }
  next();
});

app.use(require("./middleware/custom"));

require("./app")(app);

const port = process.env.PORT || 3004;
app.listen(port, function () {
  console.log("Currently running in " + config.get("ENVMODE") + " Mode");
  console.log("Shorten URL api listening on port " + port + "!");
});
