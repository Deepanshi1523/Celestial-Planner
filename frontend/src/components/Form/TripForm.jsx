import React, { useState } from 'react';
import './TripFormModule.css'; // Create a CSS file for styling
import axios from 'axios';
import FormattedResponse from './formattedResponse';

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
  
  const handleNumberOfDaysChange = (e) => {
    const inputValue = e.target.value;

    if (/^[1-9]\d*$/.test(inputValue) || inputValue === '') {
      setNumberOfDays(inputValue);
    }
    else if (inputValue === '0') {
      setNumberOfDays('');
    }
  };

  return (
    <div className="trip-form-container">
        <form onSubmit={(e) => { e.preventDefault(); makeCurlRequest(); }}>
          <label>
            Celestial Body:
            <input
              type="text"
              placeholder='Your celestial destination'
              name="celestialBody"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
            />
          </label>
          <label>
            Number of Days:
            <input
              type="number"
              placeholder='Duration'
              name="numberOfDays"
              value={numberOfDays}
              onChange={(e) => {
                handleNumberOfDaysChange(e);
                setNumberOfDays(e.target.value);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      <div className='responseDiv'>
        {apiResponse && <FormattedResponse apiResponse={apiResponse} />}
      </div>
    </div>
  );
};
export default TripForm;
