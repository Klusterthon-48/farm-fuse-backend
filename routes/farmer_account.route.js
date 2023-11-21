const express = require("express");
const { farmerSignIn } = require("../controllers/farmer_account.controller");

const router = express.Router();

router.post("/signin", farmerSignIn);

module.exports = router;
