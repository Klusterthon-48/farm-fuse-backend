const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5500;
const mongoose_URI = process.env.URI;

mongoose
  .connect(mongoose_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("mongoose connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const cors = require("cors");
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:4000",
};

app.use(cors(corsOptions));

const farmerRouter = require("./routes/farmer_account.route.js");
app.use("/farmer_account", farmerRouter);

const farmerModel = require("./models/farmer_account.model.js");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
