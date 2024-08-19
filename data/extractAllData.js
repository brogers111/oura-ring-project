// Function to extract specified types of data
function extractAllData(data) {
  // Initialize an array to store extracted data
  const extractedData = [];

  // Iterate over each day's sleep data
  data.forEach((entry) => {
    // Check if the entry is for sleep or workout
    if (entry.type === "sleep") {
      // Check if dayData is not null and average_hrv is not null
      if (
        entry &&
        typeof entry.average_hrv !== "undefined" &&
        entry.average_hrv !== null
      ) {
        // Extract desired fields for the current day and add them to extractedData
        extractedData.push({
          type: "sleep",
          day: entry.day,
          average_breath: entry.average_breath,
          average_heart_rate: entry.average_heart_rate,
          average_hrv: entry.average_hrv,
          bedtime_end: entry.bedtime_end,
          bedtime_start: entry.bedtime_start,
          deep_sleep_duration: entry.deep_sleep_duration,
          efficiency: entry.efficiency,
          light_sleep_duration: entry.light_sleep_duration,
          lowest_heart_rate: entry.lowest_heart_rate,
          body_temperature: entry.readiness.body_temperature,
          resting_heart_rate: entry.readiness.resting_heart_rate,
          readiness_score: entry.readiness.score,
          rem_sleep_duration: entry.rem_sleep_duration,
          time_in_bed: entry.time_in_bed,
          total_sleep_duration: entry.total_sleep_duration,
        });
      }
    } else if (entry.type === "workout") {
      // Check if activity is not undefined or null
      if (
        entry &&
        typeof entry.activity !== "undefined" &&
        entry.activity !== null
      ) {
        // Extract desired fields for the current day and add them to extractedData
        extractedData.push({
          type: "workout",
          day: entry.day,
          activity: entry.activity,
          calories: entry.calories,
          intensity: entry.intensity,
          label: entry.label,
        });
      }
    } else if (entry.type === "tag") {
      // Check if tag_type_code is not undefined or null
      if (
        entry &&
        typeof entry.tag_type_code !== "undefined" &&
        entry.tag_type_code !== null
      ) {
        // Extract desired fields for the current day and add them to extractedData
        extractedData.push({
          type: "tag",
          day: entry.start_day,
          tag_type_code: entry.tag_type_code,
          start_time: entry.start_time,
          end_time: entry.end_time,
          comment: entry.comment,
        });
      }
    }
  });

  return extractedData;
}

module.exports = { extractAllData };
