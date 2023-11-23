import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { parse } from "csv-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataSets = [];

export const loadDataSets = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "../dataset/Crop_Data.csv"))
      .pipe(parse({ columns: true, delimiter: "," }))
      .on("data", (row) => {
        dataSets.push(row);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
