import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import EventPage from './components/EventPage';

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/getData');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
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
