import React, { useState, useEffect } from 'react';
import { Sun, Moon, FileText, Menu, X, CloudSun } from 'lucide-react';

interface NavbarProps {
  isLight: boolean;
  setIsLight: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLight, setIsLight }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setFormattedDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const navItems = [
    { name: 'Front Page', href: '#hero' },
    { name: 'Venture Gazette', href: '#projects' },
    { name: 'Field Reports', href: '#experience' },
    { name: 'Classifieds', href: '#skills' },
    { name: 'Academic Digest', href: '#certifications' },
    { name: 'Enquiries', href: '#contact' },
  ];

  const breakingNews = [
    "TECH LEAD INITIATIVE: Aanya Chaudhary launches FAISS-powered AI Career roadmap engine at beyondcareer.online (Response latency reduced to <2s)",
    "PRECISION AGRICULTURE SUCCESS: Undergraduate researcher publishes novel crop disease detection model achieving 94.05% validation accuracy using EfficientNet-B3 + Dual Attention",
    "ALGORITHM EFFICIENCY: Engineer maintains 93.52% acceptance rating across 87+ solved data structures and algorithms on LeetCode index",
    "LEGAL AUTOMATION PIPELINE: Automated document workflows built at Lawxygen lower manual lawyer processing labor times by 60%",
    "ACADEMIC ARCHIVES: B.Tech Mathematics & Computer Science candidate records strong 8.54/10 cumulative GPA at IILM University"
  ];

  return (
    <header className="w-full bg-transparent z-50 border-b border-[var(--card-border)] pb-2 pt-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col">
        
        {/* Top Masthead Row: Weather, Logo, Info */}
        <div className="grid grid-cols-3 items-center pb-4 text-xs font-mono text-[var(--text-secondary)]">
          {/* Weather (Left) */}
          <div className="hidden md:flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Viewport: Clear (72°F)</span>
          </div>
          <div className="md:hidden flex">
            <span>VOL. II NO. 19</span>
          </div>
          
          {/* Logo / Grand Title (Center) */}
          <div className="text-center col-span-1 md:col-span-1 flex justify-center">
            <a href="#hero" className="flex flex-col items-center select-none">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[var(--text-primary)]">
                The Chaudhary Times
              </h1>
              <span className="font-serif italic text-xs tracking-widest text-[var(--accent-primary)] mt-1 hidden md:inline">
                "All the Code That's Fit to Print"
              </span>
            </a>
          </div>
          
          {/* Price & Theme Toggle (Right) */}
          <div className="flex items-center justify-end gap-4">
            <span className="hidden md:inline font-bold">PRICE: PRICELESS (FREE)</span>
            
            <button
              onClick={() => setIsLight(!isLight)}
              className="p-1.5 rounded border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--accent-primary)] transition-all cursor-pointer"
              aria-label="Toggle Design Mode"
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded border border-[var(--card-border)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] text-xs transition-all font-mono"
            >
              <FileText className="w-3.5 h-3.5" /> RESUME
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden text-[var(--text-primary)] p-1 border border-[var(--card-border)] rounded"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Newspaper Info Banner (Double Border) */}
        <div className="news-border-double-y py-1.5 px-2 flex justify-between items-center text-[10px] md:text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
          <div className="text-left">NEW DELHI, INDIA</div>
          <div className="text-center font-bold text-[var(--text-primary)]">{formattedDate}</div>
          <div className="text-right hidden md:inline">ESTD. 2024 · VOL. II NO. 19</div>
          <div className="text-right md:hidden inline">PRICELESS</div>
        </div>

        {/* Nav Links Menu (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-10 py-3 border-b border-[var(--card-border)] font-serif text-sm font-bold select-none">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-[var(--accent-primary)] hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Breaking News Marquee Ticker */}
        <div className="news-border-single-y bg-transparent overflow-hidden py-1.5 flex items-center text-[11px] font-mono select-none">
          <div className="bg-[var(--accent-primary)] text-[var(--bg-color)] px-2.5 py-0.5 font-bold uppercase tracking-wider shrink-0 text-[10px] mr-4 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>EXTRA!</span>
          </div>
          <div className="w-full overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex gap-12">
              {breakingNews.concat(breakingNews).map((news, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[var(--text-primary)] font-bold">{news}</span>
                  <span className="text-[var(--accent-primary)]">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[var(--card-bg)] border-l border-[var(--card-border)] z-[100] transform transition-transform duration-300 p-6 flex flex-col justify-between ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-[var(--card-border)]">
            <span className="font-serif font-black text-lg text-[var(--accent-primary)] uppercase tracking-wider">INDEX</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--card-border)] p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-5 font-serif text-lg font-bold">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="hover:text-[var(--accent-primary)] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--card-border)]">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] flex items-center justify-center gap-2 font-mono font-bold transition-all text-xs"
          >
            <FileText className="w-4 h-4" /> DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </header>
  );
};
