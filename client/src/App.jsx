import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import EventPage from './components/EventPage';

function App() {
  // useState hook to create a state variable 'data' to store the fetched data
  const [data, setData] = useState("");

  // Async function to fetch data from the backend API
  const getData = async () => {
    try {
      // Sending GET request to the backend server
      const response = await Axios.get('http://localhost:5000/getData');
      // Storing the response data into the 'data' state
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // useEffect hook to call 'getData' when the component is mounted
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this only runs once when the component is first mounted

  return (
    <div>
      {/* Display fetched data (initially empty until API response is received) */}
      <p>{data}</p>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/eventpage" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;
