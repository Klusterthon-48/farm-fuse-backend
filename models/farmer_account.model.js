const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const farmerModel = mongoose.model("farmer_collection", farmerSchema);
module.exports = farmerModel;
