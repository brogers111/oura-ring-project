const { OpenAI } = require("openai");

// Initialize OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORG,
});

// Function to send data to ChatGPT and receive responses
async function askChatGPT(data) {
  try {
    // Convert data to a JSON string
    const dataStr = JSON.stringify(data);

    // Send data to ChatGPT for processing
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Look through my Oura Ring data detailing my sleep and workout records and tell me what trends you notice that aren't easily identifiable to the human eye. Based on these trends, give me 10 concrete examples of ways I can improve my health in the future with specific references to the actual data. Return your response message content in HTML formatting with an h1 of 'Oura Ring Data Analysis' and h2's of 'Sleep Trends', 'Workout Trends', 'Tag Trends', and 'Recommendations for Improving Health'.",
        },
        { role: "user", content: dataStr },
      ],
    });

    // Log the API response
    console.log("OpenAI API Response:", response);

    // Extract assistant responses from choices
    const assistantMessages = response.choices
      .map((choice) => choice.message.content)
      .filter((content) => content !== undefined);

    return assistantMessages;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw new Error("Failed to get response from OpenAI API");
  }
}

module.exports = { askChatGPT };
