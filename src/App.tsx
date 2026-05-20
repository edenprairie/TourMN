import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import LocalBrands from './pages/LocalBrands';
import Itineraries from './pages/Itineraries';
import FoodDrink from './pages/FoodDrink';
import Events from './pages/Events';
import './i18n';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/food-drink" element={<FoodDrink />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/brands" element={<LocalBrands />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
