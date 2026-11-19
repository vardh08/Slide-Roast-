import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Users,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileCheck2,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/20 via-purple-600/20 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold backdrop-blur-md animate-fade-in shadow-inner">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>AI Pitch Deck Evaluation Platform</span>
            <span className="text-white/20">|</span>
            <span className="text-gray-300">Powered by Gemini AI</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans'] leading-[1.1]">
            Your Pitch Deserves Better Than{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400">
              Polite Feedback.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            Upload your pitch deck. Face three brutally honest AI judges. Discover what's wrong, fix your weaknesses and pitch with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/upload"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-purple-600 to-purple-700 hover:from-orange-600 hover:to-purple-800 transition-all duration-300 shadow-xl shadow-orange-500/20 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <Flame className="w-5 h-5 fill-orange-200 group-hover:scale-110 transition-transform" />
              <span>Roast My Deck</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-gray-200 bg-[#171C2C] hover:bg-[#1E2538] border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-gray-400 border-t border-white/5 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Genuine AI Evaluations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>3 Specialized AI Personas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Instant AI Slide Rewrites</span>
            </div>
          </div>

        </div>

        {/* SAMPLE REPORT DASHBOARD PREVIEW */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16">
          <div className="relative rounded-2xl border border-white/10 bg-[#171C2C]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
            
            {/* Window header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-[11px] text-gray-500">slide-roast-dashboard.ai</span>
              </div>
              <span className="text-purple-400 font-semibold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Live Sample Roast
              </span>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Judge 1 Preview */}
              <div className="rounded-xl bg-[#111522] border border-orange-500/30 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-wider">Skeptical Investor</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-white">62/100</span>
                </div>
                <p className="text-xs italic text-gray-300">
                  "I'm not here to appreciate your idea. I'm here to find out whether it can actually work."
                </p>
                <div className="text-[11px] p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  ⚠️ Slide 3: No customer acquisition cost (CAC) or payback period listed.
                </div>
              </div>

              {/* Judge 2 Preview */}
              <div className="rounded-xl bg-[#111522] border border-purple-500/30 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-wider">Bored Professor</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-white">58/100</span>
                </div>
                <p className="text-xs italic text-gray-300">
                  "I have seen hundreds of presentations. Make me understand why this one deserves attention."
                </p>
                <div className="text-[11px] p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  🔬 Slide 5: Unsupported claims of 99% accuracy without architectural benchmarks.
                </div>
              </div>

              {/* Judge 3 Preview */}
              <div className="rounded-xl bg-[#111522] border border-cyan-500/30 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Users className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-wider">Confused Customer</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-white">70/100</span>
                </div>
                <p className="text-xs italic text-gray-300">
                  "I don't care how complicated your technology is. Tell me what problem you solve for me."
                </p>
                <div className="text-[11px] p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  💡 Slide 2: Value proposition is buried in 4 lines of technical jargon.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* THE PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why 90% of Pitch Decks Fail In The First 60 Seconds
          </h3>
          <p className="text-sm text-gray-400">
            Polite feedback gives founders false confidence. Harsh reality happens when investors silently delete your deck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#171C2C]/70 border border-white/5 space-y-3 hover:border-rose-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
              01
            </div>
            <h4 className="text-base font-bold text-white">Friends Are Too Polite</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your colleagues and friends don't want to hurt your feelings. They nod and say "Great idea!", while investors will pass in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/70 border border-white/5 space-y-3 hover:border-amber-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              02
            </div>
            <h4 className="text-base font-bold text-white">Mentors Are Unavailable</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              High-caliber venture partners and industry advisors have packed schedules. Getting a thorough, slide-by-slide review takes weeks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/70 border border-white/5 space-y-3 hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              03
            </div>
            <h4 className="text-base font-bold text-white">Lost Opportunities</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              You only get one chance at demo days, accelerator pitches, or university competitions. A weak deck burns irreplaceable bridges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/70 border border-white/5 space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              04
            </div>
            <h4 className="text-base font-bold text-white">Students Lack Guidance</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Hackathon participants and university students build amazing engineering projects but lose because their storytelling and market logic are flawed.
            </p>
          </div>

        </div>
      </section>


      {/* THE THREE AI JUDGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">The Solution</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Your Three Brutally Honest AI Judges
          </h3>
          <p className="text-sm text-gray-400">
            Three distinct perspectives. Zero fluff. Genuine Gemini AI models prompt-engineered to emulate real boardroom skepticism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Judge 1 */}
          <div className="rounded-2xl border border-orange-500/30 bg-[#171C2C]/80 p-8 space-y-6 flex flex-col justify-between hover:border-orange-500/60 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Marcus Vance</h4>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Skeptical Investor</span>
                </div>
              </div>
              <p className="text-xs italic text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                "I'm not here to appreciate your idea. I'm here to find out whether it can actually work."
              </p>
              <div className="space-y-2 text-xs text-gray-300">
                <p className="font-semibold text-white">Evaluates:</p>
                <p>• Market opportunity & realistic TAM</p>
                <p>• Monetization & unit economics</p>
                <p>• Defensible moat vs incumbents</p>
                <p>• Scalability & customer acquisition</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 text-[11px] text-gray-400">
              Asks: <span className="text-orange-300 italic">"Who actually pays for this and why wouldn't Google crush you?"</span>
            </div>
          </div>

          {/* Judge 2 */}
          <div className="rounded-2xl border border-purple-500/30 bg-[#171C2C]/80 p-8 space-y-6 flex flex-col justify-between hover:border-purple-500/60 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Prof. Alistair Finch</h4>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Bored Professor</span>
                </div>
              </div>
              <p className="text-xs italic text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                "I have seen hundreds of presentations. Make me understand why this one deserves attention."
              </p>
              <div className="space-y-2 text-xs text-gray-300">
                <p className="font-semibold text-white">Evaluates:</p>
                <p>• Problem-solution causality</p>
                <p>• Technical feasibility & architecture</p>
                <p>• Logical structure & flow</p>
                <p>• Empirical evidence & citations</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 text-[11px] text-gray-400">
              Asks: <span className="text-purple-300 italic">"Where is the proof for these claims and what are the system boundaries?"</span>
            </div>
          </div>

          {/* Judge 3 */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#171C2C]/80 p-8 space-y-6 flex flex-col justify-between hover:border-cyan-500/60 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Alex Rivera</h4>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Confused Customer</span>
                </div>
              </div>
              <p className="text-xs italic text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                "I don't care how complicated your technology is. Tell me what problem you solve for me."
              </p>
              <div className="space-y-2 text-xs text-gray-300">
                <p className="font-semibold text-white">Evaluates:</p>
                <p>• Jargon-free clarity & ease of comprehension</p>
                <p>• Immediate value proposition</p>
                <p>• Practical utility for end-users</p>
                <p>• Friction and adoption barriers</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 text-[11px] text-gray-400">
              Asks: <span className="text-cyan-300 italic">"Why would I spend money on this when I already have a working solution?"</span>
            </div>
          </div>

        </div>
      </section>


      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Simple 6-Step Workflow</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Upload to Investor-Ready Deck
          </h3>
          <p className="text-sm text-gray-400">
            A frictionless cycle designed to sharpen your pitch in minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-orange-400 font-mono">STEP 01</span>
            <h5 className="text-xs font-bold text-white">Upload PDF</h5>
            <p className="text-[11px] text-gray-400">Drag & drop your presentation (up to 15 slides).</p>
          </div>

          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-purple-400 font-mono">STEP 02</span>
            <h5 className="text-xs font-bold text-white">Choose Audience</h5>
            <p className="text-[11px] text-gray-400">Investors, Hackathon, Professors, or Recruiters.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-cyan-400 font-mono">STEP 03</span>
            <h5 className="text-xs font-bold text-white">AI Judges Roast</h5>
            <p className="text-[11px] text-gray-400">3 independent Gemini judges critique each slide.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-emerald-400 font-mono">STEP 04</span>
            <h5 className="text-xs font-bold text-white">Roast Report</h5>
            <p className="text-[11px] text-gray-400">View overall score out of 100 & radar metrics.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-rose-400 font-mono">STEP 05</span>
            <h5 className="text-xs font-bold text-white">AI Slide Fixer</h5>
            <p className="text-[11px] text-gray-400">One-click revamp weak headlines and body copy.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#171C2C] border border-white/5 text-center space-y-2">
            <span className="text-xs font-black text-purple-400 font-mono">STEP 06</span>
            <h5 className="text-xs font-bold text-white">Re-evaluate</h5>
            <p className="text-[11px] text-gray-400">Upload revised deck and track before-and-after score.</p>
          </div>

        </div>
      </section>


      {/* FEATURES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-400">Core Features</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered For Founders Who Want The Truth
          </h3>
          <p className="text-sm text-gray-400">
            Everything you need to turn a mediocre slide deck into an undeniable pitch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <Cpu className="w-6 h-6 text-orange-400" />
            <h4 className="text-base font-bold text-white">Three Independent AI Judges</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Never get a homogenized single-opinion critique. See how commercial, academic, and customer lenses view your claims differently.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h4 className="text-base font-bold text-white">Weighted 100-Point Scoring Engine</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Transparent algorithm weighting Clarity (25%), Storytelling (20%), Business (25%), Innovation (20%), and Technical (10%).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <Layers className="w-6 h-6 text-cyan-400" />
            <h4 className="text-base font-bold text-white">Slide-by-Slide Criticism</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Exact quotes from your slides paired with severity tags and concrete fixes. No vague high-level generalities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h4 className="text-base font-bold text-white">AI Slide Fixer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Don't just get roasted—get solutions. AI ghostwrites punchy headlines and rewrites confusing bullet points with one click.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <h4 className="text-base font-bold text-white">Q&A Grilling Questions</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Anticipate the most brutal questions you will be asked during live Q&A, along with preparation tips to defend your thesis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-white/5 space-y-3">
            <FileCheck2 className="w-6 h-6 text-rose-400" />
            <h4 className="text-base font-bold text-white">Before-and-After Tracking</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upload revised presentations to calculate delta scores, verified resolved flaws, and newly introduced issues.
            </p>
          </div>

        </div>
      </section>


      {/* PRICING SECTION (Section 5 requirement) */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">Proposed Business Model</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent, Founder-Friendly Pricing
          </h3>
          <p className="text-xs text-gray-400">
            Note: These tiers reflect our proposed launch pricing structure. Payments are not enabled during current beta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Tier 1 */}
          <div className="p-6 rounded-2xl bg-[#171C2C] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Trial</span>
              <h4 className="text-2xl font-black text-white">₹0</h4>
              <p className="text-xs text-gray-400">1 Full 3-Judge Deck Roast</p>
              <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
                <li>✓ 3 AI Judges</li>
                <li>✓ Overall 100-pt Score</li>
                <li>✓ Slide-by-slide criticism</li>
                <li>✓ Up to 15 slides</li>
              </ul>
            </div>
            <Link to="/upload" className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-colors">
              Try Free Now
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-900/30 to-[#171C2C] border border-purple-500/40 space-y-4 flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] uppercase font-bold px-3 py-0.5 rounded-full">
              Most Popular
            </div>
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Pay Per Roast</span>
              <h4 className="text-2xl font-black text-white">₹199 <span className="text-xs text-gray-400 font-normal">/ deck</span></h4>
              <p className="text-xs text-gray-400">For active founders raising a round</p>
              <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
                <li>✓ Everything in Free</li>
                <li>✓ AI Slide Fixer (Unlimited)</li>
                <li>✓ Before-and-after comparison</li>
                <li>✓ Detailed Q&A prep sheets</li>
              </ul>
            </div>
            <Link to="/upload" className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold text-center block transition-colors shadow-lg shadow-purple-600/30">
              Roast a Deck
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="p-6 rounded-2xl bg-[#171C2C] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Monthly Pass</span>
              <h4 className="text-2xl font-black text-white">₹999 <span className="text-xs text-gray-400 font-normal">/ month</span></h4>
              <p className="text-xs text-gray-400">For serial entrepreneurs & studios</p>
              <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
                <li>✓ Unlimited Deck Analyses</li>
                <li>✓ Multi-revision history</li>
                <li>✓ Priority Gemini 2.5 processing</li>
                <li>✓ Custom audience personas</li>
              </ul>
            </div>
            <Link to="/upload" className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-colors">
              Get Started
            </Link>
          </div>

          {/* Tier 4 */}
          <div className="p-6 rounded-2xl bg-[#171C2C] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Incubators & Colleges</span>
              <h4 className="text-2xl font-black text-white">Custom</h4>
              <p className="text-xs text-gray-400">For university cohorts & hackathons</p>
              <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
                <li>✓ Bulk student deck roasting</li>
                <li>✓ Faculty cohort dashboard</li>
                <li>✓ Live leaderboards</li>
                <li>✓ Dedicated API rate limits</li>
              </ul>
            </div>
            <Link to="/about" className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center block transition-colors">
              Contact Team
            </Link>
          </div>

        </div>
      </section>


      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/20 via-purple-600/20 to-cyan-500/20 p-8 sm:p-14 text-center space-y-6 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready To Put Your Pitch Deck To The Test?
            </h2>
            <p className="text-sm text-gray-300">
              Stop guessing what judges and investors think. Upload your PDF now and face the roast before the real stakes begin.
            </p>
            <div className="pt-2">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all shadow-xl shadow-orange-500/20 hover:scale-105"
              >
                <Flame className="w-5 h-5 fill-orange-200" />
                <span>Roast My Deck For Free</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
