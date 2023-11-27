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
        categorical_features: [label, country],
        numeric_features: [ph, temperature, humidity, water_availability],
      },
    };

    // Make a request to the model API
    const response = await axios.post("https://drab-teal-armadillo.cyclic.app/predict", input_data);

    if (response.status !== 200) return errorResponse(res, "Prediction failed", StatusCodes.INTERNAL_SERVER_ERROR);

    const prediction = response.data;
    const planting_season = `Predicted planting season for ${label} in ${country} is ${season} season`;

    const environmentalData = {
      temperature,
      ph,
      humidity,
      water_availability,
    };

    return successResponse(
      res,
      "Prediction successful",
      { environmentalData, planting_season, prediction },
      StatusCodes.OK
    );
  }
});

/**
 * @description Fetch weather data for a particular country using the OpenWeatherMap API
 * @param {object} req
 * @param {object} res
 * @returns {object} JSON response
 */

export const getWeatherData = tryCatchLib(async (req, res) => {
  // const country = ["Nigeria", "Sudan", "Kenya", "South Africa"];
  const { country } = req.body;

  // randomly select a country from the array
  // const randomCountry = country[Math.floor(Math.random() * country.length)];

  // convert the input to lowercase and trim any whitespace
  country.trim().toLowerCase();

  // Make a request to the OpenWeatherMap API
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
  );

  if (response.status !== 200)
    return errorResponse(res, "Weather data fetch failed", StatusCodes.INTERNAL_SERVER_ERROR);

  const data = response.data;

  //convert temperature to celsius
  data.main.temp = Math.round(data.main.temp - 273.15);

  const weatherData = {
    country: data.name,
    temperature: data.main.temp,
    weather: data.weather[0].main,
    description: data.weather[0].description,
  };

  // Set cors headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  return successResponse(res, "Weather data fetch successful", weatherData, StatusCodes.OK);
});
