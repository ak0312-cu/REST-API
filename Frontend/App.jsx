import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const API_URL = "https://your-backend-url.onrender.com/bfhl"; // Update with your backend URL

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        alert("Invalid JSON format. Ensure it has a 'data' array.");
        return;
      }

      const response = await axios.post(API_URL, parsedData);
      setResponseData(response.data);
    } catch (error) {
      alert("Error processing request. Check JSON format and try again.");
    }
  };

  const filteredData = () => {
    if (!responseData) return null;

    const selectedKeys = selectedOptions.map((opt) => opt.value);
    let filtered = {};

    selectedKeys.forEach((key) => {
      filtered[key] = responseData[key] || [];
    });

    return filtered;
  };

  return (
    <div className="container">
      <h1>{import.meta.env.VITE_ROLL_NUMBER}</h1>

      <textarea
        placeholder='Enter JSON e.g. { "data": ["A","C","z"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {responseData && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Select response categories..."
          />

          <div className="response">
            <h3>Filtered Response:</h3>
            <pre>{JSON.stringify(filteredData(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
