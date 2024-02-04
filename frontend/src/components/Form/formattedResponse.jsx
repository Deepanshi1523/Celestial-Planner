import React from "react";

const FormattedResponse = ({ apiResponse }) => {
  const formatResponseString = (responseString) => {
    const lines = responseString.split("\n");
    const formattedLines = [];

    let currentDay = "";

    for (const line of lines) {
      if (line.startsWith("Day")) {
        if (currentDay !== "") {
          formattedLines.push(""); // Add a new line before starting a new day
        }
        currentDay = line;
        formattedLines.push(`${currentDay}:`);
      } else if (line.trim() !== "") {
        const formattedLine = line.replace(/  /g, "\n  ").replace(/\n\n-/g, "\n\n\n ");
        formattedLines.push(`  ${formattedLine}`);
      }
    }

    return formattedLines.join("\n");
  };

  const formattedResponse = formatResponseString(apiResponse);

  return (
    <div>
      <pre>{formattedResponse}</pre>
    </div>
  );
};

export default FormattedResponse;