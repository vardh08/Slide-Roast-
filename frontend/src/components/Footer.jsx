import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, Cpu, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0B0D14] text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                SLIDE <span className="text-orange-400">ROAST</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get roasted by three brutally honest AI judges before facing real investors, professors, or hackathon juries.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Storage Confidentiality</span>
            </div>
          </div>

          {/* Col 2: The Judges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">The AI Judges</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Marcus Vance (Skeptical Investor)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Prof. Finch (Bored Academic)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span>Alex Rivera (Confused Customer)</span>
              </li>
              <li className="text-gray-500 pt-1">
                Powered by official Google Gemini SDK
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/upload" className="hover:text-white transition-colors">Upload Pitch Deck</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">Report History</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Scoring Engine & Methodology</Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How AI Roasting Works</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Plans & Pricing</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Deck Privacy Guarantee</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Uploaded PDFs are never permanently archived or used for public model training. Files are temporarily processed for text extraction and instantly deleted.
            </p>
            <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Gemini 2.5 Multi-Judge Architecture</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Slide Roast Inc. Built for founders, students & hackers.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for killer pitch decks
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
