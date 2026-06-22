import React, { useState } from 'react';
import { Sun, Moon, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  isLight: boolean;
  setIsLight: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLight, setIsLight }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#experience' },
    { name: 'Badges', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 w-full bg-[var(--bg-color)]/90 backdrop-blur-md z-[99] border-b border-[var(--card-border)] select-none">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left: Brand Monogram */}
        <a href="#hero" className="font-syne font-extrabold uppercase text-sm tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
          Aanya.dev <span className="text-[var(--accent-primary)]">✨</span>
        </a>

        {/* Center: Desktop Navigation (Monospace Braces Vibe) */}
        <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
          {navItems.map((item, idx) => (
            <React.Fragment key={item.name}>
              {idx > 0 && <span className="opacity-30">•</span>}
              <a
                href={item.href}
                className="px-2 py-1 hover:text-[var(--text-primary)] hover:underline transition-colors uppercase tracking-wider"
              >
                {item.name}
              </a>
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Theme Toggle & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-all cursor-pointer rounded"
            aria-label="Toggle Design Mode"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] text-xs font-mono transition-all rounded uppercase tracking-wider text-[var(--text-secondary)]"
          >
            <FileText className="w-3.5 h-3.5" /> Resume.pdf
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-[var(--text-primary)] p-1.5 border border-[var(--card-border)] rounded hover:border-[var(--accent-primary)]"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[var(--bg-color)] border-l border-[var(--card-border)] z-[100] transform transition-transform duration-300 p-6 flex flex-col justify-between ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-[var(--card-border)]">
            <span className="font-syne font-extrabold text-sm text-[var(--accent-primary)] uppercase tracking-widest">MENU</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--card-border)] p-1.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4 font-mono text-sm uppercase">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="hover:text-[var(--accent-primary)] transition-colors py-1.5"
              >
                [ {item.name} ]
              </a>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--card-border)]">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] flex items-center justify-center gap-2 font-mono font-bold transition-all text-xs rounded uppercase tracking-wider"
          >
            <FileText className="w-4 h-4" /> Download Resume
          </a>
        </div>
      </div>
    </header>
  );
};
