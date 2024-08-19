const express = require("express");
const { fetchDataFromOuraAPI } = require("../api/oura");
const { askChatGPT } = require("../api/openai");
const { extractAllData } = require("../data/extractAllData");

const app = express();

app.use(express.json());

// Define a route handler for the root route
app.get("/", async (req, res) => {
  try {
    // Fetch data from the Oura Ring API
    const data = await fetchDataFromOuraAPI();

    // Extract daily data
    const extractedData = extractAllData(data);

    // Send the extracted data to ChatGPT for processing
    const responses = await askChatGPT(extractedData);

    // Convert the responses into styled HTML
    const htmlResponse = `
      <html>
      <head>
        <style>
          .response {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            margin: 20px;
          }
        </style>
      </head>
      <body>
        ${responses
          .map((response) => `<div class="response">${response}</div>`)
          .join("")}
      </body>
      </html>
    `;
    // Send the HTML response as the API response
    res.send(htmlResponse);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
