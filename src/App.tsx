/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Noise from './components/Noise';
import Services from './pages/Services';
import About from './pages/About';
import Connect from './pages/Connect';
import PortfolioMap from './components/map/PortfolioMap';

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <PortfolioMap />
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="bg-[#1C1512] min-h-screen text-[#FEFEFD] selection:bg-[#A35A3A] selection:text-[#FEFEFD]">
        <Cursor />
        <Noise />
        <AnimatePresence mode="wait">
          {loading && <Loader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navigation />
            <AnimatedRoutes />
          </>
        )}
      </div>
    </Router>
  );
}
