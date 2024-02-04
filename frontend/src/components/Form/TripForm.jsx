import React, { useState } from 'react';
import './TripFormModule.css'; // Create a CSS file for styling
import axios from 'axios';

const TripForm = () => {
  const [showOutput, setShowOutput] = useState(false);
  const [outputData, setOutputData] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const [planetName, setPlanetName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');


  const makeCurlRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/make-curl-request', {
        planetName,
        numberOfDays,
      });
      setApiResponse(JSON.stringify(response.data.responseText, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="trip-form-container">
        <form onSubmit={(e) => { e.preventDefault(); makeCurlRequest(); }}>
          <label>
            Celestial Body:
            <input
              type="text"
              name="celestialBody"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
            />
          </label>
          <label>
            Number of Days:
            <input
              type="number"
              name="numberOfDays"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {planetName && numberOfDays && (
        <div className="output-box">
          <p>Creating your celestial trip to {planetName}</p>
          {showOutput && <p>{outputData}</p>}
        </div>
      )}
      {apiResponse && <pre>{apiResponse}</pre>}
    </div>
  );
};
export default TripForm;
