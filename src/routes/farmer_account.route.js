import express from "express";

const {
  farmerSignIn,
  farmerSignUp,
  cropsAPI,
} = require("../controllers/farmer_account.controller");

const router = express.Router();

router.post("/signin", farmerSignIn);
router.post("/signup", farmerSignUp);
router.get("/crops", cropsAPI);

module.exports = router;
