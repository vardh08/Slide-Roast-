import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Upload from './pages/Upload';
import Analyzing from './pages/Analyzing';
import Report from './pages/Report';
import History from './pages/History';
import Comparison from './pages/Comparison';
import About from './pages/About';

// Helper to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0B0D14] text-[#F8FAFC]">
        {/* Toast notification provider */}
        <Toaster position="top-right" theme="dark" richColors closeButton />
        
        {/* Persistent Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analyzing/:id" element={<Analyzing />} />
            <Route path="/report/:id" element={<Report />} />
            <Route path="/history" element={<History />} />
            <Route path="/compare/:id" element={<Comparison />} />
            <Route path="/about" element={<About />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
