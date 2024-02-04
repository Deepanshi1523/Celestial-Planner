import React from "react";
import "./formattedResponse.css";

const FormattedResponse = ({ apiResponse }) => {
  const replacedText = apiResponse.replace(/\\n/g, '\n');
  return (
    <div className="output-div">
      <pre className="output-text">{replacedText}</pre>
    </div>
  );
};

export default FormattedResponse;