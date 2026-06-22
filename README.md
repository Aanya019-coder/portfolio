# 🚀 Aanya Chaudhary's Full-Stack AI Developer Portfolio

This is a premium, highly animated full-stack developer portfolio site designed to showcase frontend, backend, AI/ML research, and mobile capabilities.

## 🏗️ Project Architecture

- **Frontend (`index.html` & `aanya_portfolio.html`):** Beautifully styled single-page application utilizing vanilla CSS, responsive grids, advanced keyframes, and custom JavaScript mechanics:
  - Retro terminal progressive loading sequence.
  - Upward drifting code symbol particle systems.
  - Dynamic name scrambling glitch and automatic subtitle typist.
  - Interactive radar chart SVG switcher to display tech stack mastery.
  - 3D holographic certification cards that flip to expose verification links.
  - Matrix code rain easter egg triggered by typing the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`).
  - Active-section navigation pill tracker.
- **Backend (`server.js`):** Node.js and Express server that:
  - Dynamically scans the workspace directory for any `.pdf` certificate files and populates them on the front-end, parsing them into readable titles and associating them with their issuers.
  - Handles contact form POST submissions, securely saving queries to a local database file (`messages.json`).
  - Hosts a secure chatbot API endpoint (`/api/chat`) proxied to the Gemini 1.5 Flash model (protecting developer API credentials).
  - Hosts static content files including resume downloads and credential verifications.

---

## ⚙️ How to Setup & Run

### 1. Configure the Environment
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your Gemini API key:
```env
PORT=8080
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If no API Key is provided, the chatbot will gracefully run in smart fallback mode using predefined QA logic).*

### 2. Install Dependencies
Run the package installation:
```bash
npm install
```

### 3. Start the Server
Run the Express application:
```bash
npm start
```
Open your browser and navigate to:
**[http://localhost:8080](http://localhost:8080)**

---

## 📂 Key Files & Directories

- `index.html` / `aanya_portfolio.html` - Premium interactive frontend UI.
- `server.js` - Backend routes, scanning logic, secure chatbot proxy.
- `package.json` - Node dependencies and run scripts (`dev`, `start`).
- `Aanya_Chaudhary_Resume_Final (3).pdf` - Resume link target.
- `messages.json` - Automatically created local database for contact entries.
