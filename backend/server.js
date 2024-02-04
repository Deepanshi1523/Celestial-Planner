const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this line to enable CORS
app.use(express.json());

app.post('/api/make-curl-request', async (req, res) => {
  try {
    const { planetName, numberOfDays } = req.body;
    console.log(planetName);
    const curlRequestData = {
      method: 'POST',
      url: 'https://api.getknit.ai/v1/router/run', // Example API endpoint
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTAxMjU5NDM2Nzg2MjkxMDM5MDMwIn0sImlhdCI6MTcwNzAwNTkwNywiZXhwIjoxNzA4MDg1OTA3fQ.ZKfiYfkiOmcjF9Yi2MGl31R45Aiq7_HbCXsDkCY4QTI',
        'Content-Type': 'application/json',
      },
      data: {
        "messages": [
          {
            "role": "system",
            "content": "Imagine you are the best travel planner in the universe, who has traveled all the celestial bodies and knows everything about popular places to go, hidden gems, the best time to go, celestial places, outdoor activities, romantic destinations and activities, planetary locations, and museums, galactic creatures attractions, cuisines to try and things and places to shop."
          },
          {
            "role": "user",
            "content": "I am planning to have a {{number_of_days}}-day trip to {{celestial_destination}}. I like to do space activity like Zero_Gravity_Experience , Alien_Encounter_Tour etc. Suggest me some good space accomodation with creative name and transportaion mode. Now plan my trip in more efficient way. Also tell me how much money and time i have spend on a particural activity, transportaion, accomodation, etc.\nFromat should me:\n1. Day (e.g., Day 1)\n2. Primary location for the day\n3. Up to 4 locations to be covered day-wise in the following format:\n- Location title\n- Time to spend\n- Opening hours\n- Amount\n- Distance from the previous location"
          }
        ],
        "model": {
          "name": "openai/gpt-3.5-turbo"
        },
        "variables": [
          {
            "name": "number_of_days",
            "value": numberOfDays
          },
          {
            "name": "celestial_destination",
            "value": planetName
          }
        ]
      },
    };

    const axiosResponse = await axios(curlRequestData);
    res.json(axiosResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/get-knit-prompt', async (req, res) => {
  try {
    const axiosResponse = await axios.get('https://api.getknit.ai/v1/chain/a837c23e-8e78-4e39-9168-a92b915a3b8d/prompt/71f022e0-16c0-405f-a374-1745020e48fc', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTAxMjU5NDM2Nzg2MjkxMDM5MDMwIn0sImlhdCI6MTcwNzAwNTkwNywiZXhwIjoxNzA4MDg1OTA3fQ.ZKfiYfkiOmcjF9Yi2MGl31R45Aiq7_HbCXsDkCY4QTI',
      },
    });
    res.json(axiosResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});