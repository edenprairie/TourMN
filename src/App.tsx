import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import LocalBrands from './pages/LocalBrands';
import Itineraries from './pages/Itineraries';
import FoodDrink from './pages/FoodDrink';
import Events from './pages/Events';
import Redwing from './pages/Redwing';
import Unh from './pages/Unh';
import './i18n';

const AppContent: React.FC = () => {
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace(/\/$/, '') || '/';
  const isHiddenGalleryPage = normalizedPathname === '/redwing' || normalizedPathname === '/unh';

  return (
    <div className="app-container">
      {!isHiddenGalleryPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/food-drink" element={<FoodDrink />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/brands" element={<LocalBrands />} />
          <Route path="/redwing" element={<Redwing />} />
          <Route path="/unh" element={<Unh />} />
        </Routes>
      </main>
      {!isHiddenGalleryPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
