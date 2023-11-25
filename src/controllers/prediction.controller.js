import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLib from "../utils/libs/tryCatch.libs.js";
import { dataSets } from "../models/predictionData.model.js";
import axios from "axios";

/**
 * @description Get the prediction for a particular crop
 * @param {object} req
 * @param {object} res
 * @returns {object} JSON response
 */

export const getPrediction = tryCatchLib(async (req, res) => {
  let { label, country } = req.body;

  const data = dataSets.filter((data) => {
    return data.label.toLowerCase() === label.toLowerCase() && data.country.toLowerCase() === country.toLowerCase();
  });

  if (data.length === 0) {
    return errorResponse(res, "No data found", StatusCodes.NOT_FOUND);
  } else {
    const randomData = data[Math.floor(Math.random() * data.length)];

    const temperature = randomData.temperature;
    const ph = randomData.ph;
    const humidity = randomData.humidity;
    const water_availability = randomData.water_availability;
    const season = randomData.season;
    const label = randomData.label;
    const country = randomData.country;

    const input_data = {
      features: {
        categorical_features: [season, label, country],
        numeric_features: [temperature, ph, humidity, water_availability],
      },
    };

    // Make a request to the model API
    const response = await axios.post("https://drab-teal-armadillo.cyclic.app/predict", input_data);

    if (response.status !== 200) return errorResponse(res, "Prediction failed", StatusCodes.INTERNAL_SERVER_ERROR);

    const prediction = response.data;

    return successResponse(res, "Prediction successful", { prediction }, StatusCodes.OK);
  }
});
