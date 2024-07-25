const express = require("express");

const v1ApiRouters = require("./v1/index");

const router = express.Router();

router.use("/v1", v1ApiRouters);

module.exports = router;
