import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import { CodingStats } from './components/CodingStats';
import { Timeline } from './components/Timeline';
import { Certifications } from './components/Certifications';
import { InlineChat } from './components/InlineChat';
import { FloatChat } from './components/FloatChat';
import { MatrixRain } from './components/MatrixRain';
import { Mail, Code as CodeIcon, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from './components/Icons';

function App() {
  // Theme Configuration
  const [isLight, setIsLight] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Loading Screen State
  const [loading, setLoading] = useState(true);
  const [loadingCmd, setLoadingCmd] = useState('');
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Custom Cursor Refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Interactive Cursor Lag
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const updateCursorRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX}px`;
        cursorRingRef.current.style.top = `${ringY}px`;
      }
      animationId = requestAnimationFrame(updateCursorRing);
    };
    updateCursorRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Loading Terminal Simulation
  useEffect(() => {
    const commands = [
      { text: "npm install dependencies --silent", logs: ["✓ Loaded Lucide React & Icons", "✓ Connected to Three.js canvas engines", "✓ Resolved Tailwind configurations"] },
      { text: "npm run build-production", logs: ["✓ Staging visual design systems assets", "✓ Initializing full stack responsive grids", "✓ System compiled successfully in 1.45s"] },
      { text: "npm run portfolio", logs: ["✓ Loaded! Ready to review."] }
    ];

    let cmdIdx = 0;

    const typeCommand = () => {
      if (cmdIdx >= commands.length) {
        setTimeout(() => {
          setLoading(false);
        }, 800);
        return;
      }

      const current = commands[cmdIdx];
      let charIdx = 0;
      setLoadingCmd('');

      const interval = setInterval(() => {
        setLoadingCmd((prev) => prev + current.text[charIdx]);
        charIdx++;

        if (charIdx === current.text.length) {
          clearInterval(interval);

          current.logs.forEach((logLine, logIdx) => {
            setTimeout(() => {
              setLoadingLogs((prev) => [...prev, logLine]);
            }, logIdx * 120);
          });

          setTimeout(() => {
            cmdIdx++;
            setLoadingProgress((cmdIdx / commands.length) * 100);
            setTimeout(typeCommand, 600);
          }, current.logs.length * 120 + 350);
        }
      }, 30);
    };

    const initialTimeout = setTimeout(typeCommand, 300);
    return () => clearTimeout(initialTimeout);
  }, []);

  // Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setFormStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }

    setTimeout(() => {
      setFormStatus('idle');
    }, 4000);
  };

  return (
    <div className="bg-spacebg text-white font-sans overflow-x-hidden gradient-mesh select-none relative min-h-screen">
      {/* Blueprint Grid Overlay */}
      <div className="grid-background"></div>

      {/* Ambient Glow Blobs */}
      <div className="blur-blob blob-purple top-[10%] left-[-10%]"></div>
      <div className="blur-blob blob-cyan top-[40%] right-[-10%]"></div>
      <div className="blur-blob blob-orange top-[75%] left-[5%]"></div>

      {/* Custom Mouse Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block"></div>

      {/* Matrix Easter Egg canvas streams */}
      <MatrixRain />

      {/* LOADING SCREEN TERMINAL */}
      {loading && (
        <div className="fixed inset-0 bg-spacebg z-[9999] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg glass rounded-xl p-6 border border-purple-500/30 neon-glow-violet">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-400 font-mono ml-2">bash - visitor@aanya-portfolio</span>
            </div>
            <div className="font-mono text-sm space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-green-500">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">{loadingCmd}</span>
              </div>
              <div className="space-y-1 text-xs text-slate-400">
                {loadingLogs.map((log, idx) => (
                  <div key={idx} className="text-slate-500 font-mono text-[11px]">
                    {log}
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <Navbar isLight={isLight} setIsLight={setIsLight} />

      {/* CORE SECTIONS */}
      <main className="relative z-10">
        <Hero />
        <AboutMe />
        <Projects />
        <CodingStats isLight={isLight} />
        <Timeline />
        <Certifications />
        <InlineChat />
        {/* CONTACT FORM SECTION */}
        <section id="contact" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-12 select-none">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-center text-[var(--text-primary)]">
              Say Hello! ✉️
            </h2>
            <p className="font-sans text-xs text-[var(--text-secondary)] tracking-wider mt-2 uppercase">
              LET'S BUILD SOMETHING COOL TOGETHER
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-syne font-black text-xl text-[var(--text-primary)] leading-tight">
                Let's Build Something Awesome! 🚀
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)]">
                I'm always open to talking about new projects, creative ideas, or opportunities to be part of your vision. Drop me a line, and let's get talking!
              </p>

              <div className="space-y-4 pt-4 font-mono text-xs">
                <a href="mailto:aanyachaudhary024@gmail.com" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded border border-[var(--card-border)] group-hover:border-[var(--accent-primary)] flex items-center justify-center transition-colors text-[var(--accent-primary)]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    aanyachaudhary024@gmail.com
                  </span>
                </a>

                <a href="https://www.linkedin.com/in/aanyachaudhary" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded border border-[var(--card-border)] group-hover:border-[var(--accent-primary)] flex items-center justify-center transition-colors text-[var(--accent-primary)]">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    linkedin.com/in/aanyachaudhary
                  </span>
                </a>

                <a href="https://github.com/Aanya019-coder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded border border-[var(--card-border)] group-hover:border-[var(--accent-primary)] flex items-center justify-center transition-colors text-[var(--accent-primary)]">
                    <Github className="w-4 h-4" />
                  </span>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    github.com/Aanya019-coder
                  </span>
                </a>

                <a href="https://leetcode.com/u/Aanya_019/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded border border-[var(--card-border)] group-hover:border-[var(--accent-primary)] flex items-center justify-center transition-colors text-[var(--accent-primary)]">
                    <CodeIcon className="w-4 h-4" />
                  </span>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    leetcode.com/u/Aanya_019
                  </span>
                </a>
              </div>
            </div>

            {/* Right Form box */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="border border-[var(--card-border)] p-6 md:p-8 space-y-6 bg-black/5 font-mono text-xs">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder=" "
                    className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-3 text-[var(--text-primary)] rounded-xl focus:outline-none focus:border-[var(--accent-primary)] peer"
                  />
                  <label className="absolute left-4 top-3.5 text-stone-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[var(--accent-primary)] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[var(--accent-primary)] font-sans text-xs">
                    YOUR NAME
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder=" "
                    className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-3 text-[var(--text-primary)] rounded-xl focus:outline-none focus:border-[var(--accent-primary)] peer"
                  />
                  <label className="absolute left-4 top-3.5 text-stone-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[var(--accent-primary)] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[var(--accent-primary)] font-sans text-xs">
                    YOUR EMAIL ADDRESS
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value.substring(0, 500))}
                    placeholder=" "
                    rows={4}
                    className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-3 text-[var(--text-primary)] rounded-xl focus:outline-none focus:border-[var(--accent-primary)] peer resize-none"
                  ></textarea>
                  <label className="absolute left-4 top-3.5 text-stone-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[var(--accent-primary)] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[var(--accent-primary)] font-sans text-xs">
                    YOUR MESSAGE
                  </label>
                  <div className="text-right text-[9px] text-stone-500 mt-1">
                    <span>{contactMessage.length}</span> / 500 characters
                  </div>
                </div>

                {formStatus === 'sending' && (
                  <button type="button" disabled className="w-full py-3 bg-[var(--card-border)] text-stone-400 flex items-center justify-center gap-2 rounded-full">
                    <span>SENDING MESSAGE...</span>
                  </button>
                )}

                {formStatus === 'success' && (
                  <button type="button" disabled className="w-full py-3 bg-emerald-700/25 border border-emerald-500 text-emerald-400 flex items-center justify-center gap-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span>MESSAGE SENT SUCCESSFULLY! 🎉</span>
                  </button>
                )}

                {formStatus === 'error' && (
                  <button type="button" disabled className="w-full py-3 bg-red-950/20 border border-red-500 text-red-400 flex items-center justify-center gap-2 rounded-full">
                    <span>SENDING FAILED. TRY AGAIN. ❌</span>
                  </button>
                )}

                {formStatus === 'idle' && (
                  <button type="submit" className="w-full py-3 bg-[var(--accent-primary)] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer uppercase rounded-full shadow-sm">
                    <span>Send Message 🚀</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--card-border)] bg-[var(--bg-color)] py-12 relative overflow-hidden z-10 select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left select-none">
            <a href="#hero" className="font-syne font-extrabold text-xl text-[var(--accent-primary)] uppercase tracking-wider">
              Aanya Chaudhary
            </a>
            <p className="text-stone-500 text-[10px] mt-2 font-mono uppercase tracking-widest">
              DESIGNED & CODED BY AANYA CHAUDHARY · © 2026 · ALL RIGHTS RESERVED
            </p>
          </div>

          <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-stone-500">
            <a href="#hero" className="hover:text-[var(--text-primary)] transition-colors">[ TOP ]</a>
            <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">[ PROJECTS ]</a>
            <a href="#experience" className="hover:text-[var(--text-primary)] transition-colors">[ TIMELINE ]</a>
            <a href="#skills" className="hover:text-[var(--text-primary)] transition-colors">[ SKILLS ]</a>
          </div>
        </div>
      </footer>

      {/* Floating Persisted Chat Drawer */}
      <FloatChat />
    </div>
  );
}

export default App;
