import React, { useState } from 'react';
import './TripFormModule.css'; // Create a CSS file for styling
import axios from 'axios';
import FormattedResponse from './formattedResponse';
import CycleAlien from "./cycleAlien.gif";
// import Loading from "./loader.gif";

const TripForm = () => {
  const [apiResponse, setApiResponse] = useState('');
  const [planetName, setPlanetName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [loading,setLoading]=useState(false);


  const makeCurlRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://celestial-backend.onrender.com/api/make-curl-request', {
        planetName,
        numberOfDays,
      });
      setApiResponse(JSON.stringify(response.data.responseText, null, 2));
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
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
        {loading?(<div className='loader'><img src={CycleAlien} className='loader-img'/></div>):(apiResponse && <FormattedResponse apiResponse={apiResponse} />)}
      </div>
    </div>
  );
};
export default TripForm;
