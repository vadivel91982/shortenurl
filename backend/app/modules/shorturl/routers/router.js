"use strict";
const express = require("express");
const router = express.Router();

//importing the controller
const generateurlController = require("../controller/generateurl");

router.post("/generate", generateurlController.generateurl);
router.get("/stats", generateurlController.getStats);
router.get("/:urlCode", generateurlController.getShortenUrl);

module.exports = router;
