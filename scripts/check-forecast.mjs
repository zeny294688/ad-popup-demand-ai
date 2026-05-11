import { popups, responses } from "../src/data.js";
import { createForecast } from "../src/forecast.js";

const forecast = createForecast(popups, responses);

if (!forecast.totals.responses) {
  throw new Error("Expected seed responses to produce forecast totals.");
}

if (!forecast.peak || !forecast.topProduct) {
  throw new Error("Expected peak time slot and top product recommendations.");
}

console.log("Forecast check passed", {
  responses: forecast.totals.responses,
  expectedVisitors: forecast.totals.expectedVisitors,
  peak: forecast.peak.label,
  topProduct: forecast.topProduct.product
});
