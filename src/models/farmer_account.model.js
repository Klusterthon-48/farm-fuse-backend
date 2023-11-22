// model
// const mongoose = require("mongoose");

import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const farmerModel = mongoose.model("farmer_collection", farmerSchema);
export default farmerModel;
