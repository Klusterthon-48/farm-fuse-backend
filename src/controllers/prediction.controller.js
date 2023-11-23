import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLib from "../utils/libs/tryCatch.libs.js";
import { dataSets } from "../models/predictionData.model.js";

/**
 * @description Get the prediction for a particular crop
 * @param {object} req
 * @param {object} res
 * @returns {object} JSON response
 */

export const getPrediction = tryCatchLib(async (req, res) => {
  let { crop, country } = req.body;

  const data = dataSets.filter((data) => {
    return data.label.toLowerCase() === crop.toLowerCase() && data.country.toLowerCase() === country.toLowerCase();
  });

  if (data.length === 0) {
    return errorResponse(res, "No data found", StatusCodes.NOT_FOUND);
  } else {
    const randomData = data[Math.floor(Math.random() * data.length)];
    return successResponse(res, "Success", randomData, StatusCodes.OK);
  }
});

// const crop = "rice";
// const country = "Kenya";

// const results = [];

// const fileStream = fs.createReadStream("../dataset/Crop_Data.csv");

// const parser = fileStream.pipe(parse({ columns: true, delimiter: "," }));

// parser.on("data", (data) => {
//   if (data.label.toLowerCase() === crop.toLowerCase() && data.country.toLowerCase() === country.toLowerCase()) {
//     results.push(data);
//   }
// });

// parser.on("end", () => {
//   // randomly select a data from the filtered data
//   if (results.length === 0) {
//     console.log("No data found");
//   } else {
//     const randomData = results[Math.floor(Math.random() * results.length)];
//     console.log(randomData);
//     console.log(randomData.temperature, randomData.ph, randomData.humidity, randomData.water_availability);
//   }
// });
