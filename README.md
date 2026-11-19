# 🔥 SLIDE ROAST

> **"Get roasted by AI judges before the real ones do."**

**Slide Roast** is an AI-powered pitch deck evaluation platform. Upload your pitch deck in PDF format and face three independent, brutally honest AI judges who evaluate your presentation from commercial, academic, and user perspectives.

Identify fatal flaws, answer hard questions, improve weak slides with an AI slide rewriter, and compare before-and-after presentations before stepping into real boardrooms, demo days, or hackathons.

---

## 🌟 KEY FEATURES

- **PDF Upload & Validation:** In-memory PDF text extraction via `pdfjs-dist` with signature validation, page limits (max 15 slides), and max 10 MB limits.
- **Three Independent AI Judges:**
  - 💼 **Marcus Vance (The Skeptical Investor):** Ruthlessly examines monetization, unit economics, TAM, competitive moats, and financial realism.
  - 🎓 **Prof. Alistair Finch (The Bored Academic):** Demands logical structure, technical feasibility, methodology, and empirical evidence.
  - 👤 **Alex Rivera (The Confused Customer):** Allergic to jargon and complexity; evaluates plain-English clarity and real-world value propositions.
- **Weighted 100-Point Scoring Engine:**
  - Clarity: **25%**
  - Storytelling: **20%**
  - Business Viability: **25%**
  - Innovation: **20%**
  - Technical Feasibility: **10%**
- **Slide-by-Slide Criticism:** Pinpoint evidence quotes, severity tags (Critical, High, Medium, Low), and actionable fixes.
- **AI Slide Fixer:** Select any flagged slide and click **"Fix This Slide with AI"** to generate punchy headlines, rewritten body copy, and layout recommendations.
- **Real-Time Live Progress:** Visual timeline tracking each judge's analysis and score calculation.
- **Before-and-After Comparison:** Upload a revised presentation to calculate delta scores, verified improvements, remaining flaws, and newly introduced issues.
- **Report History:** Stored in MongoDB (with resilient in-memory fallback) to review, share, or delete previous analyses.
- **Confidentiality by Design:** Pitch decks are processed in memory and deleted immediately after text extraction.

---

## 🛠️ TECH STACK

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Dark SaaS Theme)
- **Routing:** React Router DOM
- **Charts:** Recharts (Radar charts & category breakdowns)
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Animation:** Framer Motion + Canvas Confetti
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose (with automatic in-memory fallback)
- **AI SDK:** Official Google GenAI SDK (`@google/genai`)
- **PDF Extraction:** `pdfjs-dist`
- **Uploads:** Multer
- **Validation:** Zod
- **Security:** Helmet, CORS, Express-Rate-Limit

---

## 🚀 QUICK START GUIDE (WINDOWS 11 POWERSHELL)

### 1. Prerequisites
Ensure you have installed:
- **Node.js** (v18+ or v22+)
- **npm** (v9+)
- (Optional) **MongoDB** installed locally or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI.
- **Google Gemini API Key** (Get free at [Google AI Studio](https://aistudio.google.com/)).

---

### 2. Configure Backend Environment
Open Windows 11 PowerShell and navigate to the backend directory:

```powershell
cd E:\Downloads\SR\slide-roast\backend
```

Open `.env` in VS Code or your text editor and add your Gemini API key:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/slide-roast
GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
CLIENT_URL=http://localhost:5173
```

> **Note:** If you don't have MongoDB running locally, the backend automatically activates an in-memory session store so you can test all features immediately without any database setup!

---

### 3. Run Backend Server
In PowerShell Terminal 1:

```powershell
cd E:\Downloads\SR\slide-roast\backend
npm run dev
```

The backend server starts on `http://localhost:5000`.

---

### 4. Run Frontend Client
In PowerShell Terminal 2:

```powershell
cd E:\Downloads\SR\slide-roast\frontend
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🧪 SAMPLE DECKS FOR IMMEDIATE TESTING

Two sample pitch deck PDFs have been pre-generated for you in `sample_decks/`:

1. `sample_decks/campus_barter_pitch_v1.pdf`: Initial draft with missing unit economics and vague monetization.
2. `sample_decks/campus_barter_pitch_v2_revised.pdf`: Revised draft with CAC/LTV, 3 concrete revenue streams, and traction.

### Step-by-Step Demo Sequence:
1. Open `http://localhost:5173` and click **"Roast My Deck"**.
2. Drag and drop `sample_decks/campus_barter_pitch_v1.pdf`.
3. Choose **Startup Investors** as your target audience and click **"START ROASTING"**.
4. Watch the live 7-step analysis pipeline as the 3 AI judges roast the deck.
5. Review the circular score gauge, radar chart, and the 3 distinct Judge Cards.
6. Open **Slide-by-Slide Criticism**, pick Slide 2 or Slide 5, and click **"Fix This Slide with AI"**.
7. Click **"Upload Revised Deck"** at the top right, upload `campus_barter_pitch_v2_revised.pdf`, and see the **Before-and-After Comparison** dashboard!

---

## 📡 BACKEND API REFERENCE

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health & Gemini configuration status |
| `POST` | `/api/analysis` | Upload pitch deck PDF & start AI evaluation |
| `GET` | `/api/analysis/:id` | Fetch complete roast report |
| `GET` | `/api/analysis/:id/status` | Fast polling endpoint for analysis progress |
| `POST` | `/api/analysis/compare` | Compare revised deck with previous deck |
| `POST` | `/api/fixer` | AI Slide Fixer: rewrite weak headlines & content |
| `GET` | `/api/history` | List all saved roast reports |
| `DELETE` | `/api/history/:id` | Delete a roast report |

---

## 🔒 SECURITY & PRIVACY

1. **Zero Permanent Storage of Presentations:** Uploaded PDFs are temporarily placed in a protected directory, parsed into structured text tokens in memory, and immediately deleted via `fs.unlinkSync`.
2. **Strict MIME & Magic Byte Validation:** File headers are verified for the standard `%PDF` signature to prevent malicious file disguises.
3. **API Key Isolation:** The Gemini API key is strictly maintained in backend `.env` and never leaked to frontend browser bundles.
4. **Prompt Injection Defense:** Slide contents are treated as untrusted strings wrapped in markdown blocks; judge system prompts instruct models to disregard embedded override attempts.

---

## ⚖️ SCORING INTERPRETATION

| Score Range | Classification | Verdict Meaning |
|---|---|---|
| **90 – 100** | 🌟 Excellent | Investor/competition-ready. Tight thesis, clear unit economics, high defensibility. |
| **75 – 89** | 🚀 Strong | Compelling narrative with minor technical or market clarity gaps. |
| **60 – 74** | 📈 Developing | Promising core idea hindered by buzzwords, unclear TAM, or missing business model. |
| **40 – 59** | ⚠️ Needs Major Work | Serious structural or commercial flaws flagged by 2+ judges. |
| **0 – 39** | 🚨 Critical | Fundamental value proposition unclear; requires ground-up rethink. |

---

Developed with ❤️ for founders, hackers, and students worldwide.
