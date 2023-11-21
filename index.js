const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 2500;
const mongoose_URI = process.env.URI;

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
