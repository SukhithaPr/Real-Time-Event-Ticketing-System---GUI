import {Routes, Route} from 'react-router';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />   
    </Routes>
  )

}

export default App