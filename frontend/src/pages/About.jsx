import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ShieldCheck,
  Scale,
  Cpu,
  Briefcase,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Hero header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-purple-400" />
          <span>The Philosophy Behind Slide Roast</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Polite Feedback Kills Companies. Honest Criticism Builds Them.
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Slide Roast was founded on a simple observation: founders rarely get the truth until it’s too late. Our multi-agent AI panel gives you the merciless honesty of a tier-1 VC boardroom in 60 seconds.
        </p>
      </div>

      {/* The 3 Judges in Detail */}
      <section className="space-y-6">
        <div className="border-b border-white/5 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            The Three AI Personas
          </h2>
          <p className="text-xs text-gray-400">
            Each judge operates with a dedicated system prompt and evaluation lens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-orange-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Marcus Vance</h3>
                <span className="text-xs font-bold text-orange-400">The Skeptical Investor</span>
              </div>
            </div>
            <p className="text-xs italic text-gray-300">
              "I'm not here to appreciate your idea. I'm here to find out whether it can actually work."
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Trained to detect hand-wavy business models, unrealistic market sizing, missing unit economics, and weak competitive moats.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Prof. Finch</h3>
                <span className="text-xs font-bold text-purple-400">The Bored Academic</span>
              </div>
            </div>
            <p className="text-xs italic text-gray-300">
              "I have seen hundreds of presentations. Make me understand why this one deserves attention."
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Focuses on technical feasibility, methodology, causal structure, logical fallacies, and empirical claims without citations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Alex Rivera</h3>
                <span className="text-xs font-bold text-cyan-400">The Confused Customer</span>
              </div>
            </div>
            <p className="text-xs italic text-gray-300">
              "I don't care how complicated your technology is. Tell me what problem you solve for me."
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Represents end-users and buyers who hate acronyms and technical obfuscation. Evaluates clarity, immediate value proposition, and usability.
            </p>
          </div>

        </div>
      </section>

      {/* Scoring Engine Breakdown */}
      <section className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-8 space-y-6">
        <div className="border-b border-white/5 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-400" />
            Transparent 100-Point Scoring Methodology
          </h2>
          <p className="text-xs text-gray-400">
            Every score is mathematically calculated on the backend from category averages across valid judges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#111522] border border-white/5 space-y-1">
            <span className="text-2xl font-black font-mono text-cyan-400">25%</span>
            <p className="text-xs font-bold text-white">Clarity</p>
            <p className="text-[10px] text-gray-500">Simplicity & punch</p>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/5 space-y-1">
            <span className="text-2xl font-black font-mono text-purple-400">20%</span>
            <p className="text-xs font-bold text-white">Storytelling</p>
            <p className="text-[10px] text-gray-500">Narrative & hook</p>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/5 space-y-1">
            <span className="text-2xl font-black font-mono text-orange-400">25%</span>
            <p className="text-xs font-bold text-white">Business Viability</p>
            <p className="text-[10px] text-gray-500">Unit economics & TAM</p>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/5 space-y-1">
            <span className="text-2xl font-black font-mono text-emerald-400">20%</span>
            <p className="text-xs font-bold text-white">Innovation</p>
            <p className="text-[10px] text-gray-500">Defensible moat</p>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/5 space-y-1">
            <span className="text-2xl font-black font-mono text-rose-400">10%</span>
            <p className="text-xs font-bold text-white">Technical Feasibility</p>
            <p className="text-[10px] text-gray-500">Realistic execution</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Score Interpretation Brackets</h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
              <span className="font-bold block">0–39</span> Critical
            </div>
            <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300">
              <span className="font-bold block">40–59</span> Needs Major Work
            </div>
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
              <span className="font-bold block">60–74</span> Developing
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <span className="font-bold block">75–89</span> Strong
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <span className="font-bold block">90–100</span> Excellent
            </div>
          </div>
        </div>
      </section>

      {/* Security & Confidentiality */}
      <section className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Strict Privacy & Security Guarantee
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Your pitch deck represents your intellectual property. We implement strict in-memory parsing via <code className="text-purple-300">pdfjs-dist</code>. Temporary files are immediately deleted from disk after extraction. Your Gemini API requests are handled directly by your server without intermediate third-party brokers.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all shadow-xl shadow-orange-500/20"
        >
          <Flame className="w-5 h-5 fill-orange-200" />
          <span>Ready? Roast Your Deck Now</span>
        </Link>
      </div>

    </div>
  );
};

export default About;
