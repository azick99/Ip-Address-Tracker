const axios = require('axios');

exports.handler = async (event) => {
  const { ipAddress } = event.queryStringParameters;
  const apiKey = process.env.REACT_APP_MAP_API_KEY; // Retrieve the API key from environment variables

  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  try {
    const response = await axios.get(API_URL);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data', code: 422 }),
    };
  }
};
