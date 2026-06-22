import React, { useEffect, useState } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { Github } from './Icons';

interface Project {
  title: string;
  category: string;
  badge?: string;
  meta?: string;
  desc: string;
  tags: string[];
  link: string;
  emoji?: string;
  enterprise?: boolean;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'NutriScan AI',
      category: 'research',
      badge: 'Undergraduate Research',
      meta: '94.05% Accuracy',
      desc: 'Published undergraduate research targeting crop disease detection. Developed using EfficientNet-B3 with Dual Attention (SE + CBAM) modules, achieving 94.05% accuracy across 7 classes on a dataset of 14,000+ images. Visualised layers via Grad-CAM and integrated a Flask web gateway.',
      tags: ['TensorFlow', 'EfficientNet-B3', 'Grad-CAM', 'Flask', 'Computer Vision'],
      link: 'https://github.com/Aanya019-coder/Intelligent-nutrient-deficiency-analysis-for-precision-agriculture-using-ai-',
      emoji: '🌱'
    },
    {
      title: 'AI Career Platform',
      category: 'fullstack',
      desc: 'Full-stack career accelerator platform incorporating customized AI roadmaps via a RAG pipeline backed by FAISS vector search. Speeds up LLM generation to sub-2s.',
      tags: ['Next.js', 'Gemini API', 'RAG', 'FAISS', 'PostgreSQL'],
      link: 'https://beyondcareer.online',
      emoji: '🚀'
    },
    {
      title: 'AI Resume Analyzer',
      category: 'backend',
      desc: 'An intelligent NLP analyzer extracting text from resumes and matching it against job descriptions to suggest keyword improvements and generate ATS compatibility scores.',
      tags: ['FastAPI', 'React.js', 'OpenAI API', 'NLP'],
      link: 'https://github.com/Aanya019-coder',
      emoji: '📄'
    },
    {
      title: 'PhysicsWallah Features',
      category: 'mobile',
      desc: 'Integrated native mobile interfaces, modular component libraries, and interactive assessment modules for the PW edtech platform (100M+ users).',
      tags: ['Flutter', 'Dart', 'REST APIs', 'Agile'],
      link: '#',
      emoji: '📱',
      enterprise: true
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch projects API, using default projects fallback.", err);
      }
    };

    fetchProjects();
  }, []);

  const featured = projects.find(p => p.category === 'research');
  const others = projects.filter(p => p.category !== 'research');

  const filteredOthers = activeFilter === 'all'
    ? others
    : others.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)]">
      
      {/* Section Headline Banner */}
      <div className="flex flex-col items-center mb-12 select-none">
        <div className="text-center pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            SECTION II: BUSINESS, VENTURES & SYSTEMS DEVELOPMENT
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-black uppercase text-center w-full py-3 border-y border-[var(--card-border)] text-[var(--text-primary)]">
          The Venture Gazette
        </h2>
      </div>

      {/* Featured Research Card */}
      {featured && (
        <div className="mb-16 border border-[var(--card-border)] p-6 md:p-8 relative">
          {/* Newspaper Page Stamp */}
          <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[var(--bg-color)] border border-[var(--accent-primary)] text-[var(--accent-primary)] text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest select-none">
            FRONT PAGE FEATURED RESEARCH
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* The leaf visual scanner box */}
            <div className="w-full lg:w-1/2 min-h-64 rounded bg-black border border-[var(--card-border)] flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.08))]"></div>
              
              <svg className="w-full h-full max-h-56 z-10 opacity-75" viewBox="0 0 200 120" fill="none">
                {/* Neural connections */}
                <path d="M 30 20 L 70 40 L 110 20 L 150 50 L 170 30" stroke="rgba(197,160,89, 0.15)" strokeWidth="0.8" strokeDasharray="3" />
                <path d="M 40 80 L 80 60 L 130 90 L 170 60" stroke="rgba(197,160,89, 0.15)" strokeWidth="0.8" strokeDasharray="3" />

                {/* Grid crosshairs */}
                <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                {/* Bounding box overlay */}
                <rect x="55" y="15" width="90" height="90" rx="2" stroke="var(--accent-primary)" strokeDasharray="3 3" strokeWidth="1" />

                {/* Scanner target corners */}
                <path d="M 50 25 L 50 15 L 60 15" stroke="var(--text-primary)" strokeWidth="1.5" />
                <path d="M 150 25 L 150 15 L 140 15" stroke="var(--text-primary)" strokeWidth="1.5" />
                <path d="M 50 95 L 50 105 L 60 105" stroke="var(--text-primary)" strokeWidth="1.5" />
                <path d="M 150 95 L 150 105 L 140 105" stroke="var(--text-primary)" strokeWidth="1.5" />

                {/* The Leaf model path */}
                <path
                  d="M 100 20 C 120 40, 140 50, 140 70 C 140 90, 120 105, 100 105 C 80 105, 60 90, 60 70 C 60 50, 80 40, 100 20 Z"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  fill="rgba(197, 160, 89, 0.03)"
                  strokeLinecap="round"
                />

                {/* Leaf veins */}
                <path d="M 100 105 L 100 25" stroke="var(--accent-primary)" strokeWidth="1.2" />
                <path d="M 100 85 C 112 75, 128 72, 134 72" stroke="var(--accent-primary)" strokeWidth="0.8" />
                <path d="M 100 70 C 112 60, 125 58, 130 58" stroke="var(--accent-primary)" strokeWidth="0.8" />
                <path d="M 100 55 C 110 48, 120 45, 124 45" stroke="var(--accent-primary)" strokeWidth="0.8" />
                <path d="M 100 85 C 88 75, 72 72, 66 72" stroke="var(--accent-primary)" strokeWidth="0.8" />
                <path d="M 100 70 C 88 60, 75 58, 70 58" stroke="var(--accent-primary)" strokeWidth="0.8" />
                <path d="M 100 55 C 90 48, 80 45, 76 45" stroke="var(--accent-primary)" strokeWidth="0.8" />

                {/* Hotspots */}
                <circle cx="120" cy="50" r="2" fill="var(--accent-primary)" className="animate-pulse" />
                <circle cx="85" cy="75" r="2" fill="var(--accent-primary)" className="animate-pulse" />

                {/* HUD Overlay */}
                <text x="16" y="20" fontFamily="'Courier Prime', monospace" fontSize="5.5" fill="var(--accent-primary)">SYS.OK</text>
                <text x="16" y="27" fontFamily="'Courier Prime', monospace" fontSize="5.5" fill="var(--text-secondary)">ROI.FOUND</text>
                <text x="153" y="100" fontFamily="'Courier Prime', monospace" fontSize="6" fill="var(--accent-primary)" className="font-bold">94.05%</text>
                <text x="153" y="106" fontFamily="'Courier Prime', monospace" fontSize="4.5" fill="var(--text-secondary)">ACCURACY</text>
              </svg>

              <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-[var(--text-secondary)] bg-black/90 px-2 py-0.5 border border-[var(--card-border)]">
                CLASSIFIER: EFFICIENTNET_B3
              </div>
            </div>

            {/* Featured Project Info (Styled as Column Article) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2 text-[9px] font-mono text-[var(--text-secondary)]">
                  <span>CATEGORY: {featured.badge?.toUpperCase()}</span>
                  <span>•</span>
                  <span>METRIC: {featured.meta?.toUpperCase()}</span>
                </div>
                
                <h3 className="font-serif font-black text-xl md:text-2xl text-[var(--text-primary)] mb-3 leading-tight">
                  Intelligent Nutrient Scan Developed for Precision Agriculture
                </h3>
                
                <p className="editorial-text font-sans text-xs text-[var(--text-secondary)] mb-4">
                  {featured.desc}
                </p>

                {/* Footnote Tag ribbon */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dashed border-[var(--card-border)]">
                  {featured.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 border border-[var(--card-border)] text-[9px] font-mono text-[var(--text-secondary)]">
                      #{t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--card-border)] flex gap-4">
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] text-xs font-mono font-bold transition-all text-center flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> SOURCE CODE CODEBASE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs (Styled like clean typewriter tabs) */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 select-none">
        {['all', 'fullstack', 'backend', 'mobile'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === filter
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.05)] font-bold'
                : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            [{filter === 'all' ? 'Show All' : filter === 'fullstack' ? 'Full Stack' : filter}]
          </button>
        ))}
      </div>

      {/* Other Projects Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOthers.map((p, index) => (
          <article
            key={index}
            className="flex flex-col justify-between border-t border-[var(--card-border)] pt-4 relative group"
          >
            {/* Stamp indicator */}
            <div className="font-mono text-[9px] text-[var(--accent-primary)] uppercase tracking-wider mb-2">
              DISPATCH // {p.category.toUpperCase()}
            </div>

            <div>
              {/* Halftone Mini Image */}
              <div className="w-full h-32 border border-[var(--card-border)] flex items-center justify-center mb-4 relative overflow-hidden bg-black/35 select-none halftone-wrapper">
                <span className="text-3xl filter grayscale contrast-120 group-hover:scale-105 transition-transform duration-500 z-10">{p.emoji || '📰'}</span>
                <div className="halftone-overlay"></div>
              </div>

              {/* Serif Title Headline */}
              <h3 className="font-serif font-black text-lg text-[var(--text-primary)] mb-2 hover:text-[var(--accent-primary)] transition-colors leading-snug">
                {p.title}
              </h3>

              {/* Justified COPY */}
              <p className="editorial-text font-sans text-xs text-[var(--text-secondary)] mb-4">
                {p.desc}
              </p>

              {/* Footnote specs */}
              <div className="flex flex-wrap gap-1 mb-6">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] font-mono text-[var(--text-secondary)] border-b border-dotted border-[var(--card-border)] pb-0.5">
                    {t.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Citations Footer Links */}
            <div className="border-t border-dashed border-[var(--card-border)] pt-3 text-[10px] font-mono">
              {p.enterprise ? (
                <span className="text-[var(--text-secondary)] flex items-center gap-1">
                  [CLASSIFIED] ACCESS RESTRICTED <Lock className="w-3 h-3 text-[var(--accent-primary)]" />
                </span>
              ) : (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-primary)] flex items-center gap-1 hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  [SOURCE] VISIT SYSTEM LINK <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
