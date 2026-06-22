import React, { useEffect, useRef, useState } from 'react';
import { Download, BookOpen, Coffee } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayName, setDisplayName] = useState("Aanya Chaudhary");
  const glitchOriginal = "Aanya Chaudhary";

  // Glitch Effect on name hover
  const handleGlitch = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    let glitchInterval = window.setInterval(() => {
      setDisplayName((prev) =>
        prev
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return glitchOriginal[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= glitchOriginal.length) {
        clearInterval(glitchInterval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  // Moving ink particles canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Old print symbols
    const symbols = ["§", "¶", "†", "‡", "*", "a", "b", "c", "x", "y", "z", "0", "1"];
    const particles: Array<{
      x: number;
      y: number;
      text: string;
      fontSize: number;
      speed: number;
      opacity: number;
      drift: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: symbols[Math.floor(Math.random() * symbols.length)],
        fontSize: Math.random() * 10 + 9,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.12 + 0.03,
        drift: Math.random() * 0.2 - 0.1,
      });
    }

    let animationId: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw subtle paper background fibers/spots if light mode
      const isLight = document.documentElement.classList.contains('light-mode');
      ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.015)' : 'rgba(255, 255, 255, 0.01)';
      
      particles.forEach((p) => {
        ctx.font = `${p.fontSize}px 'Courier Prime', monospace`;
        ctx.fillStyle = isLight ? `rgba(30, 30, 30, ${p.opacity})` : `rgba(234, 220, 201, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);

        p.y += p.speed;
        p.x += p.drift;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="hero" className="relative px-6 pt-10 pb-20 overflow-hidden">
      {/* Background ink dust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Main Front Page Article Grid */}
      <div className="max-w-6xl mx-auto z-10 relative mt-4">
        
        {/* Banner Announcement */}
        <div className="text-center mb-10 pb-4 border-b border-[var(--card-border)] select-none">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            ★ ★ ★ Special Edition: The Engineering Chronicle ★ ★ ★
          </span>
        </div>

        {/* 3-Column Newspaper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1 (Col span 3): Editorial & Philosophy */}
          <div className="lg:col-span-3 lg:border-r border-[var(--card-border)] lg:pr-8 flex flex-col gap-6">
            <div className="pb-3 border-b border-dashed border-[var(--card-border)]">
              <h3 className="font-serif italic text-lg font-black text-[var(--text-primary)]">
                The Editorial Column
              </h3>
              <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase">
                OPINION · PERSPECTIVE
              </span>
            </div>
            
            <div className="editorial-text font-sans text-xs text-[var(--text-secondary)] space-y-4">
              <p className="news-dropcap text-[var(--text-primary)]">
                Bridges are built not just of steel, but of architectural clarity. As a developer, I believe the division between deep learning research and robust production systems is an artificial one. The true art lies in crafting software that is both elegant in design and performant in execution.
              </p>
              <p>
                In my recent work, this philosophy manifested in bringing next-generation web portals like <i>beyondcareer.online</i> to life—utilizing vector-search caches to accelerate LLM responses to sub-second metrics.
              </p>
              <p>
                Engineering is a continuous dialogue between pixels and pipelines; a dialogue that requires rigorous code standards, structured testing, and a relentless curiosity to explore the frontier of AI integrations.
              </p>
            </div>

            <div className="p-4 border border-[var(--card-border)] bg-[rgba(var(--accent-primary),0.02)] rounded font-mono text-[10px]">
              <div className="flex items-center gap-2 mb-2 text-[var(--accent-primary)] font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>QUICK INDEX</span>
              </div>
              <ul className="space-y-1.5 text-[var(--text-secondary)]">
                <li>• Specialty: Full-Stack AI/ML</li>
                <li>• B.Tech CGPA: 8.54 / 10</li>
                <li>• Research Accuracy: 94.05%</li>
                <li>• LeetCode Acceptance: 93.52%</li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2 (Col span 6): Main Story, Name & Halftone Portrait */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center px-2">
            
            {/* The Huge Headline */}
            <h2 className="font-serif font-black text-3xl md:text-5xl lg:text-5xl leading-tight text-[var(--text-primary)] mb-6 select-none">
              <span 
                onMouseOver={handleGlitch}
                className="cursor-default select-none transition-colors"
                title="Hover to disrupt frequency"
              >
                {displayName}
              </span>
              <br />
              <span className="text-xl md:text-2xl font-normal font-serif italic text-[var(--text-secondary)] block mt-2">
                Leads Technology Projects & Ships High-Performance Systems
              </span>
            </h2>

            {/* Halftone Portrait */}
            <div className="w-full max-w-sm mb-6 select-none">
              <div className="halftone-wrapper border border-[var(--card-border)] p-1.5 shadow-md">
                <img
                  src="/profile_pic.png"
                  alt="Aanya Chaudhary"
                  className="w-full h-80 object-cover halftone-image"
                />
                <div className="halftone-overlay"></div>
              </div>
              {/* Photo Caption */}
              <div className="text-left font-mono text-[9px] text-[var(--text-secondary)] italic mt-2 border-t border-dashed border-[var(--card-border)] pt-1.5">
                Fig. 1: Aanya Chaudhary, Full-Stack Engineer and researcher. Captured here at the console compiling custom RAG models.
              </div>
            </div>

            {/* Main Article Snippet */}
            <div className="editorial-text font-sans text-sm text-[var(--text-secondary)] mb-6 text-center max-w-xl">
              Currently specializing in Mathematics & Computer Science at IILM University. Actively managing developer pipelines as Tech Lead, authoring research on neural plant scans, and implementing workflow automations.
            </div>

            {/* Action Stamps */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-y border-[var(--card-border)] w-full font-mono text-xs select-none">
              <a
                href="#projects"
                className="px-4 py-2 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] font-bold transition-all text-[11px]"
              >
                [ VIEW VENTURES ]
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] font-bold transition-all text-[11px] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> DOWNLOAD CREDENTIALS
              </a>
              <a
                href="#contact"
                className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-85 font-bold transition-all text-[11px]"
              >
                [ LEAVE DISPATCH ]
              </a>
            </div>

          </div>

          {/* COLUMN 3 (Col span 3): Brief Chronicle, LeetCode / GH Digest */}
          <div className="lg:col-span-3 lg:border-l border-[var(--card-border)] lg:pl-8 flex flex-col gap-6">
            <div className="pb-3 border-b border-dashed border-[var(--card-border)]">
              <h3 className="font-serif italic text-lg font-black text-[var(--text-primary)]">
                The Daily Gazette
              </h3>
              <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase">
                REAL-TIME DATA INDEX
              </span>
            </div>

            {/* LeetCode & GitHub small print metrics */}
            <div className="space-y-4 font-mono text-[11px]">
              <div className="border border-[var(--card-border)] p-3 space-y-2">
                <div className="flex justify-between font-bold border-b border-[var(--card-border)] pb-1 text-[var(--accent-primary)]">
                  <span>METRIC</span>
                  <span>VALUE</span>
                </div>
                <div className="flex justify-between">
                  <span>DSA Solved</span>
                  <span className="text-[var(--text-primary)] font-bold">87</span>
                </div>
                <div className="flex justify-between">
                  <span>LC Acceptance</span>
                  <span className="text-[var(--text-primary)] font-bold">93.52%</span>
                </div>
                <div className="flex justify-between">
                  <span>GitHub Repos</span>
                  <span className="text-[var(--text-primary)] font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic Rank</span>
                  <span className="text-[var(--text-primary)] font-bold">Top Tier</span>
                </div>
              </div>

              <div className="editorial-text text-[10px] text-[var(--text-secondary)] font-sans italic">
                "Technical profiles indicate a highly efficient logic engine, with submissions displaying heavy emphasis on algorithms, data structures, and optimized vector logic."
              </div>

              {/* Social Index Links */}
              <div className="border-t border-[var(--card-border)] pt-4 space-y-2">
                <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">CIRCULATION NETWORKS:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/aanyachaudhary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] rounded transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Aanya019-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] rounded transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Coffee cup badge */}
            <div className="border border-[var(--card-border)] p-3 text-center mt-2 font-mono text-[9px] text-[var(--text-secondary)] flex flex-col items-center gap-1.5">
              <div className="relative w-6 h-6 flex justify-center items-end select-none">
                <span className="steam-line absolute w-0.5 h-2.5 bg-slate-400 rounded-full left-[8px] bottom-5"></span>
                <span className="steam-line absolute w-0.5 h-2 bg-slate-400 rounded-full left-[11px] bottom-5" style={{ animationDelay: '0.4s' }}></span>
                <Coffee className="w-5 h-5" />
              </div>
              <span>COMPILING VIA COFFEE</span>
            </div>

          </div>

        </div>

        {/* Stack Typewriter Footnote Banner */}
        <div className="w-full border-t border-[var(--card-border)] mt-12 pt-6 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-xs font-mono font-bold tracking-widest text-[var(--text-secondary)] select-none">
          <span className="hover:text-[var(--accent-primary)] transition-colors">&lt;NEXT.JS/&gt;</span>
          <span className="hover:text-[var(--accent-primary)] transition-colors">#FASTAPI</span>
          <span className="hover:text-[var(--accent-primary)] transition-colors">{"{}"} NODE.JS</span>
          <span className="hover:text-[var(--accent-primary)] transition-colors">[] TENSORFLOW</span>
          <span className="hover:text-[var(--accent-primary)] transition-colors">() FLUTTER</span>
          <span className="hover:text-[var(--accent-primary)] transition-colors">+= C++</span>
        </div>

      </div>
    </section>
  );
};
