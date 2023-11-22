// model
import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const farmerModel = mongoose.model("farmer_collections", farmerSchema);
export default farmerModel;
