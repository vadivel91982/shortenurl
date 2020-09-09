"use strict";
const express = require("express");
const router = express.Router();

const shorturl = require("../app/modules/shorturl/routers/router");

router.use("/", shorturl);
module.exports = router;
