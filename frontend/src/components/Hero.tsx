import React, { useState } from 'react';
import { Download, ExternalLink, Code } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const Hero: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const experiences = [
    {
      company: 'Beyond Career',
      role: 'Tech Lead',
      period: 'Jul 2025 – Present',
      desc: 'Architected AI roadmap platform on Next.js, Node.js, and Gemini API. Engineered RAG search lowering response times to <2s.'
    },
    {
      company: 'Lawxygen',
      role: "Founder's Office Intern",
      period: 'Feb 2026 – Present',
      desc: 'Engineered legal document automation workflows powered by LLMs and NLP, reducing manual processing time by 60%.'
    },
    {
      company: 'PW (PhysicsWallah)',
      role: 'App Developer',
      period: 'Dec 2024 – Mar 2025',
      desc: 'Integrated native mobile features using Flutter and Dart for an edtech platform servicing 100M+ users.'
    },
    {
      company: 'SGCA Technologies',
      role: 'COO & Frontend Developer',
      period: 'Dec 2023 – Jun 2025',
      desc: 'Managed operations for 10+ software projects, reducing lead times by 25%. Built reusable UI libraries in React.'
    }
  ];

  const tools = [
    { key: 'Py', name: 'Python' },
    { key: 'Js', name: 'JavaScript' },
    { key: 'Re', name: 'React.js' },
    { key: 'Nx', name: 'Next.js' },
    { key: 'TF', name: 'TensorFlow' },
    { key: 'Fl', name: 'Flutter' },
    { key: 'C+', name: 'C++ (DSA)' },
    { key: 'Nd', name: 'Node.js' },
    { key: 'Fa', name: 'FastAPI' },
    { key: 'Dk', name: 'Docker' },
    { key: 'Tb', name: 'Tableau BI' },
  ];

  return (
    <section id="hero" className="relative px-6 pt-8 pb-16 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Main Poster Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[var(--card-border)] pb-12">
          
          {/* Left Column: Huge Header & Intro (Col span 7) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            {/* Header / Brand Title */}
            <div className="mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-bold block mb-1">
                AANYA CHAUDHARY
              </span>
              
              <div className="relative inline-block">
                <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-none text-[var(--text-primary)] uppercase select-none">
                  Portfolio
                </h1>
                <span className="absolute -top-3 -right-8 font-display font-bold text-lg sm:text-2xl text-[var(--accent-primary)] rotate-12 select-none">
                  '26
                </span>
              </div>
            </div>

            {/* Intro Header */}
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight mt-6 mb-4">
              Hi, I'm Aanya
            </h2>

            {/* Intro Body Description */}
            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justify max-w-lg mb-6">
              I describe myself as a person with a creative mindset and a drive to achieve high-performance results. My passion lies in full-stack architecture, machine learning research, and natural language processing. Beyond that, I also have a strong knack for engineering clean developer interfaces.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 font-mono text-[10px] select-none">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> DOWNLOAD RESUME
              </a>
              <a
                href="#contact"
                className="px-3.5 py-2 bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-90 font-bold transition-all uppercase"
              >
                [ Leave Message ]
              </a>
            </div>

          </div>

          {/* Right Column: Arched Profile Picture Frame (Col span 5) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-64 h-80 pfp-arch-bg p-1.5 shadow-xl border-2 border-[var(--card-border)]">
              <div className="profile-arch-frame w-full h-full relative">
                <img
                  src="/profile_pic.png"
                  alt="Aanya Chaudhary"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Poster Section: Dual Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10">
          
          {/* Left Block: Experience (Col span 7) */}
          <div className="md:col-span-7 flex flex-col gap-6 md:border-r border-[var(--card-border)] md:pr-8">
            <h3 className="font-syne font-extrabold text-xs uppercase tracking-widest text-[var(--accent-primary)] mb-2">
              EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="group relative">
                  {/* Ledger lines */}
                  <div className="flex justify-between items-baseline mb-1 border-b border-dashed border-[var(--card-border)] pb-1">
                    <span className="font-syne font-bold text-sm text-[var(--text-primary)]">
                      {exp.company}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--text-secondary)] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--accent-primary)] mb-1.5 uppercase tracking-wider">
                    <span>{exp.role}</span>
                  </div>
                  
                  <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed text-justify">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Socials & Tools (Col span 5) */}
          <div className="md:col-span-5 flex flex-col gap-8 md:pl-4">
            
            {/* Socials Link List */}
            <div>
              <h3 className="font-syne font-extrabold text-xs uppercase tracking-widest text-[var(--accent-primary)] mb-4">
                SOCIALS
              </h3>
              
              <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                <a
                  href="https://www.linkedin.com/in/aanyachaudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--card-border)] pb-2 hover:text-[var(--text-primary)] group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>LinkedIn</span>
                  </span>
                  <span className="text-[10px] opacity-50 group-hover:opacity-100 flex items-center gap-1">
                    in/aanyachaudhary <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>

                <a
                  href="https://github.com/Aanya019-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--card-border)] pb-2 hover:text-[var(--text-primary)] group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>GitHub</span>
                  </span>
                  <span className="text-[10px] opacity-50 group-hover:opacity-100 flex items-center gap-1">
                    github/Aanya019-coder <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>

                <a
                  href="https://leetcode.com/u/Aanya_019/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[var(--card-border)] pb-2 hover:text-[var(--text-primary)] group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>LeetCode</span>
                  </span>
                  <span className="text-[10px] opacity-50 group-hover:opacity-100 flex items-center gap-1">
                    u/Aanya_019 <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>
              </div>
            </div>

            {/* Retro Tool Keycaps Badges */}
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-syne font-extrabold text-xs uppercase tracking-widest text-[var(--accent-primary)]">
                  TOOLS & TECH
                </h3>
                <span className="font-mono text-[9px] text-[var(--accent-primary)] font-bold min-h-[14px]">
                  {activeTool ? `[ ${activeTool} ]` : '[ hover keys ]'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {tools.map((t, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveTool(t.name)}
                    onMouseLeave={() => setActiveTool(null)}
                    className="tool-key-badge cursor-default select-none"
                    title={t.name}
                  >
                    {t.key}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
