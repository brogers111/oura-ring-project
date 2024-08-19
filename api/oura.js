const fetch = require("node-fetch");

const startDate = "2024-02-01";
const endDate = "2024-03-30";

// Function to fetch data from the Oura Ring API
async function fetchDataFromOuraAPI() {
  const accessToken = process.env.OURA_API_KEY;
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    // Fetch sleep data
    const sleepResponse = await fetch(
      `https://api.ouraring.com/v2/usercollection/sleep?start_date=${startDate}&end_date=${endDate}`,
      requestOptions
    );
    const sleepData = await sleepResponse.json();

    // Fetch workout data
    const workoutResponse = await fetch(
      `https://api.ouraring.com/v2/usercollection/workout?start_date=${startDate}&end_date=${endDate}`,
      requestOptions
    );
    const workoutData = await workoutResponse.json();

    // Fetch tag data
    const tagResponse = await fetch(
      `https://api.ouraring.com/v2/usercollection/enhanced_tag?start_date=${startDate}&end_date=${endDate}`,
      requestOptions
    );
    const tagData = await tagResponse.json();

    // Add type field to sleep data entries
    const sleepDataWithType = sleepData.data.map((entry) => ({
      ...entry,
      type: "sleep",
    }));

    // Add type field to workout data entries
    const workoutDataWithType = workoutData.data.map((entry) => ({
      ...entry,
      type: "workout",
    }));

    // Add type field to tag data entries
    const tagDataWithType = tagData.data.map((entry) => ({
      ...entry,
      type: "tag",
    }));

    // Combine sleep, workout, and tag data into a single array
    const combinedData = [
      ...sleepDataWithType,
      ...workoutDataWithType,
      ...tagDataWithType,
    ];

    return combinedData;
  } catch (error) {
    console.error("Error fetching data from Oura API:", error);
    throw new Error("Failed to fetch data from Oura API");
  }
}

module.exports = { fetchDataFromOuraAPI };
