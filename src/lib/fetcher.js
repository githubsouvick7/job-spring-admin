import axios from "axios";

// Base URL Setup
// const BASE_URL = "http://localhost:1234";
const BASE_URL = "https://lionfish-app-msisk.ondigitalocean.app";

export const fetcher = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    // Build full URL
    const url = `${BASE_URL}${endpoint}`;

    // Configure axios options
    const config = {
      method,
      url,
      headers,
      ...(data && { data }), // Only include data if it's not null
    };

    // Make the API request
    const response = await axios(config);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors (return or rethrow as needed)
    console.error("API Call Error:", error);
    throw error.response?.data || error.message;
  }
};
