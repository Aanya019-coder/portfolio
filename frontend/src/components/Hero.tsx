import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative px-6 pt-16 pb-20 md:py-24 overflow-hidden select-none bg-[var(--bg-color)]">
      <div className="max-w-6xl mx-auto z-10 relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bio & Actions */}
        <div className="md:col-span-7 space-y-6 text-left order-2 md:order-1">
          <div className="space-y-2">
            <span className="font-sans font-semibold text-base md:text-lg text-[var(--text-primary)]">
              Hi I am
            </span>
            <h2 className="font-sans font-bold text-lg md:text-xl text-[var(--accent-secondary)] tracking-wide">
              Aanya Chaudhary
            </h2>
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl leading-tight text-[var(--text-primary)] tracking-tight">
              Full-Stack AI <br />
              <span className="text-[var(--accent-primary)]">Engineer</span>
            </h1>
          </div>
          
          <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
            I am a full-stack engineer and AI researcher passionate about building high-performance systems from pixels to pipelines. My work bridges advanced deep learning systems, custom natural language processing workflows, and high-quality, responsive developer interfaces.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-2.5 bg-[var(--accent-primary)] text-white hover:opacity-95 font-bold rounded-full transition-all tracking-wider text-xs uppercase shadow-sm"
            >
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white font-bold rounded-full transition-all tracking-wider text-xs uppercase"
            >
              <Download className="w-3.5 h-3.5 inline mr-1" /> Grab Resume
            </a>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-4 pt-4">
            <a href="https://github.com/Aanya019-coder" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/aanyachaudhary" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="mailto:aanyachaudhary024@gmail.com" className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Arched Profile Picture with Paint Splash */}
        <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            
            {/* Artistic Paint Splash Background Shape */}
            <svg viewBox="0 0 200 200" className="absolute w-[120%] h-[120%] z-0 text-[var(--accent-secondary)] fill-current opacity-85 scale-105 select-none pointer-events-none">
              <path d="M145.2,50.1C160.1,68,168.3,92,162.7,112.5C157.1,133,137.6,150,115.1,158C92.6,166,67.1,165,49.2,152.9C31.3,140.8,21,117.6,22.6,96.3C24.2,75,37.7,55.7,56.9,43.2C76.1,30.7,101,25,122.4,32.4C131.7,35.6,138.8,42.4,145.2,50.1Z" />
            </svg>
            
            {/* Circle portrait picture container */}
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[var(--bg-color)] shadow-xl bg-[var(--card-bg)]">
              <img
                src="/profile_pic.png"
                alt="Aanya Chaudhary"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
