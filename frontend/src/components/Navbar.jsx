import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Sparkles, Clock, Info, Menu, X, Upload } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0D14]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-purple-600 to-cyan-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#111522] rounded-[10px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
              SLIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">ROAST</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 -mt-1">
              AI Pitch Deck Evaluation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#171C2C]/60 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive('/') 
                ? 'text-white bg-white/10 shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          <a
            href="/#how-it-works"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#features"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            Features
          </a>
          <Link
            to="/history"
            className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1.5 transition-colors ${
              isActive('/history') 
                ? 'text-white bg-white/10 shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-400" />
            History
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1.5 transition-colors ${
              isActive('/about') 
                ? 'text-white bg-white/10 shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info className="w-4 h-4 text-cyan-400" />
            About
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/upload"
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-orange-500 via-purple-600 to-purple-700 hover:from-orange-600 hover:via-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Flame className="w-4 h-4 text-orange-200 fill-orange-300" />
            Roast My Deck
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/upload"
            className="p-2 rounded-lg bg-orange-500 text-white"
          >
            <Upload className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#111522] px-6 py-6 space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-white py-1"
          >
            Home
          </Link>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-white py-1"
          >
            How It Works
          </a>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-white py-1"
          >
            Features
          </a>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-gray-200 hover:text-white py-1"
          >
            <Clock className="w-4 h-4 text-purple-400" />
            Report History
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-gray-200 hover:text-white py-1"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            About Slide Roast
          </Link>
          <div className="pt-2">
            <Link
              to="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 shadow-md"
            >
              <Flame className="w-5 h-5 fill-orange-200" />
              Start Roasting Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
