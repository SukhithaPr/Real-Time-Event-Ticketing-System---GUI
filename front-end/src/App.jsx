import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import EventPage from './components/EventPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />   
      <Route path="/EventPage" element={<EventPage />} />
    </Routes>
  )

}

export default App