// controller

// const farmerModel = require("../models/farmer_account.model");
import farmerModel from '../models/farmer_account.model'

const farmerSignIn = (req, res) => {
  console.log(req.body);
};
const farmerSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await farmerModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newFarmer = new farmerModel({ email, password });

//     await newFarmer.save();
// console.log(newFarmer);

    res.status(201).json({ message: "Account created successfully", newFarmer: newFarmer});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cropsAPI = (req, res) => {
  const crops = [
    {
      id: 1,
      name: "Tomato",
      type: "Vegetable",
      humidity: "High",
      plantingTime: "Spring",
      harvestingTime: "Summer",
    },
    {
      id: 2,
      name: "Wheat",
      type: "Grain",
      humidity: "Moderate",
      plantingTime: "Fall",
      harvestingTime: "Spring",
    },
    {
      id: 3,
      name: "Apple",
      type: "Fruit",
      humidity: "Moderate",
      plantingTime: "Spring",
      harvestingTime: "Fall",
    },
  ];

  res.send(crops);
};

module.exports = { farmerSignIn, farmerSignUp, cropsAPI };
