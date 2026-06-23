import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  isLight: boolean;
  setIsLight: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLight, setIsLight }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About me', href: '#about' },
    { name: 'Services', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Badges', href: '#certifications' },
  ];

  return (
    <header className="sticky top-0 w-full bg-[var(--bg-color)]/90 backdrop-blur-md z-[99] border-b border-[var(--card-border)] select-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Monogram (Dual Circle Logo) */}
        <a href="#hero" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="flex -space-x-1.5 items-center select-none">
            <div className="w-4 h-4 rounded-full bg-[var(--accent-secondary)]"></div>
            <div className="w-4 h-4 rounded-full bg-[var(--accent-primary)]"></div>
          </div>
          <span className="font-sans font-extrabold text-base tracking-tight text-[var(--text-primary)]">
            Aanya Chaudhary
          </span>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-sans text-xs font-semibold text-[var(--text-secondary)]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-all cursor-pointer rounded-full"
            aria-label="Toggle Design Mode"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-block px-5 py-2 bg-[var(--accent-primary)] text-white hover:opacity-95 text-xs font-bold rounded-full transition-all tracking-wider uppercase shadow-sm"
          >
            Contact me
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
            <span className="font-sans font-bold text-sm text-[var(--accent-primary)] uppercase tracking-wider">Navigation</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--card-border)] p-1.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4 font-sans text-sm font-semibold uppercase">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="hover:text-[var(--accent-primary)] transition-colors py-1.5"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--card-border)]">
          <a
            href="#contact"
            onClick={() => setDrawerOpen(false)}
            className="w-full py-3 bg-[var(--accent-primary)] text-white hover:opacity-95 flex items-center justify-center gap-2 font-sans font-bold transition-all text-xs rounded-full uppercase tracking-wider shadow-sm"
          >
            <Mail className="w-4 h-4" /> Contact me
          </a>
        </div>
      </div>
    </header>
  );
};
