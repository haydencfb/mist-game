// import htts from 'https';
// import { URL } from 'url';
// import dotenv from 'dotenv';
// dotenv.config();


// const RAWGKEY = process.env.RAWGAPI_KEY;

// if (!RAWGKEY) throw new Error ('RAWGAPI_KEY NOT FOUND');

// export default function fetchGameData() {
//     return new Promise((resolve, reject) => {
//         const url = new URL('https://api.rawg.io/api/games');
//         url.searchParams.append('Game', '')
//     })
// }

import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
// console.log("API Key:", process.env.RAWGAPI_KEY); // Check if the API key is loaded


const app = express();
const port = process.env.PORT || 3000;

const API_URL = 'https://api.rawg.io/api/games';
const API_KEY = process.env.RAWGAPI_KEY;
console.log(process.env.API_KEY);
// console.log("MONGODB", process.env.MONGODB_URI);
// console.log(process.env);

app.get('/games', async (req, res) => {
  
  const searchQuery = req.query.search || '';  // Default to an empty string if no search param is passed
  // const page = req.query.page || 1;  // Default to page 1 if not provided
  // const pageSize = req.query.page_size || 10;  // Default to 10 results per page

  try {
    // Build the URL with query parameters for search, page, and page_size
    const apiUrl = `${API_URL}?key=${API_KEY}&search=${searchQuery}`;

    console.log(`Fetching data from: ${apiUrl}`); // Log the URL

    // Fetch games from the RAWG API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response status
    console.log('Response status:', response.status);

    // Check if response is successful
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch data from RAWG API, status: ${response.status}`,
      });
    }

    // Parse the JSON response
    const data = await response.json();

    // Send the games data as the response
    return res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error
    return res.status(500).json({ error: 'An error occurred while fetching games' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
