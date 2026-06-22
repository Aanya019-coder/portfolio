import React, { useEffect, useState } from 'react';
import { Leaf, Monitor, FileText, Smartphone, PenTool, X, ExternalLink, Lock } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  link: string;
  num: string;
  meta?: string;
  enterprise?: boolean;
}

export const Projects: React.FC = () => {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'nutriscan',
      title: 'NutriScan AI Crop Scan',
      category: 'Undergraduate Research',
      desc: 'Published undergraduate research targeting crop disease detection. Developed using EfficientNet-B3 with Dual Attention (SE + CBAM) modules, achieving 94.05% accuracy across 7 classes on a dataset of 14,000+ images. Visualised layers via Grad-CAM and integrated a Flask web gateway.',
      tags: ['TensorFlow', 'EfficientNet-B3', 'Grad-CAM', 'Flask', 'CV'],
      link: 'https://github.com/Aanya019-coder/Intelligent-nutrient-deficiency-analysis-for-precision-agriculture-using-ai-',
      num: '01',
      meta: '94.05% Accuracy'
    },
    {
      id: 'beyondcareer',
      title: 'AI Career Accelerator',
      category: 'Full-Stack Platform',
      desc: 'Full-stack career accelerator platform incorporating customized AI roadmaps via a RAG pipeline backed by FAISS vector search. Speeds up LLM generation to sub-2s.',
      tags: ['Next.js', 'Gemini API', 'RAG', 'FAISS', 'PostgreSQL'],
      link: 'https://beyondcareer.online',
      num: '02',
      meta: 'Sub-2s RAG Latency'
    },
    {
      id: 'resumeanalyzer',
      title: 'AI Resume ATS Analyzer',
      category: 'Natural Language Processing',
      desc: 'An intelligent NLP analyzer extracting text from resumes and matching it against job descriptions to suggest keyword improvements and generate ATS compatibility scores.',
      tags: ['FastAPI', 'React.js', 'OpenAI API', 'NLP'],
      link: 'https://github.com/Aanya019-coder',
      num: '03',
      meta: 'OpenAI Embeddings'
    },
    {
      id: 'lawxygen',
      title: 'Legal Doc Automation',
      category: 'Workflow Automation',
      desc: 'Engineered legal document automation workflows powered by LLMs and natural language processing. Successfully lowered manual document generation processing times by 60% at Lawxygen.',
      tags: ['Python', 'FastAPI', 'LLMs', 'NLP', 'Automation'],
      link: 'https://github.com/Aanya019-coder',
      num: '04',
      meta: '60% Processing Save'
    },
    {
      id: 'pwfeatures',
      title: 'PW Mobile Architecture',
      category: 'Mobile Development',
      desc: 'Integrated native mobile features, modular component libraries, and interactive assessment modules for the PhysicsWallah (PW) edtech platform servicing 100M+ users.',
      tags: ['Flutter', 'Dart', 'REST APIs', 'Agile', 'Mobile'],
      link: '#',
      num: '05',
      meta: '100M+ User Platform',
      enterprise: true
    }
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Map incoming API data to include card designs
            const mapped = data.map((item: any, idx: number) => {
              const nums = ['01', '02', '03', '04', '05'];
              return {
                id: item.title.toLowerCase().replace(/\s+/g, '-'),
                title: item.title,
                category: item.badge || item.category || 'Engineering',
                desc: item.desc,
                tags: item.tags || [],
                link: item.link || '#',
                num: nums[idx] || `0${idx + 1}`,
                meta: item.meta,
                enterprise: item.enterprise
              };
            });
            setProjects(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch projects API, using default fallbacks.", err);
      }
    };
    fetchProjects();
  }, []);

  // Card background styling based on index number
  const getCardStyle = (num: string) => {
    switch (num) {
      case '01':
        return 'bg-[#E2ECE9] hover:bg-[#D4E3DE] border-[#B9CFC8] text-[#2C4A3F] dark:bg-[#1A2D27] dark:hover:bg-[#1E362F] dark:border-[#27443C] dark:text-[#E2ECE9]';
      case '02':
        return 'bg-[#F5EFEB] hover:bg-[#EFE5DE] border-[#DFD1C7] text-[#5C4D43] dark:bg-[#2E241E] dark:hover:bg-[#362B24] dark:border-[#42342B] dark:text-[#F5EFEB]';
      case '03':
        return 'bg-[#E9EDF0] hover:bg-[#DDE3E8] border-[#CDD6DF] text-[#3D4F5E] dark:bg-[#202930] dark:hover:bg-[#27323C] dark:border-[#313E4A] dark:text-[#E9EDF0]';
      case '04':
        return 'bg-[#FBF6E9] hover:bg-[#F7EED2] border-[#ECE2C5] text-[#6A5A35] dark:bg-[#302A1A] dark:hover:bg-[#3A321E] dark:border-[#4A4027] dark:text-[#FBF6E9]';
      case '05':
      default:
        return 'bg-[#EAEFF5] hover:bg-[#DCE5EF] border-[#CAD6E5] text-[#3A4E68] dark:bg-[#1C2530] dark:hover:bg-[#232E3C] dark:border-[#2C3A4B] dark:text-[#EAEFF5]';
    }
  };

  const getCardIcon = (num: string) => {
    const classStr = "w-10 h-10 stroke-[1.2] opacity-80";
    switch (num) {
      case '01':
        return <Leaf className={classStr} />;
      case '02':
        return <Monitor className={classStr} />;
      case '03':
        return <FileText className={classStr} />;
      case '04':
        return <PenTool className={classStr} />;
      case '05':
      default:
        return <Smartphone className={classStr} />;
    }
  };

  return (
    <section id="projects" className="py-16 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10 select-none">
        <div className="text-center pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            SECTION II: INTELLECTUAL PROJECTS & PORTALS
          </span>
        </div>
        <h2 className="font-syne font-extrabold text-2xl md:text-4xl text-center w-full py-3 border-y border-[var(--card-border)] text-[var(--text-primary)]">
          CONTENT & VENTURES
        </h2>
      </div>

      {/* Grid of Poster-style Vertical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {projects.map((p) => (
          <div
            key={p.num}
            onClick={() => setSelectedProj(p)}
            className={`border rounded-lg p-5 flex flex-col justify-between h-80 transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden group ${getCardStyle(p.num)}`}
          >
            {/* Header info */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 block mb-3">
                {p.category}
              </span>
              <h3 className="font-syne font-extrabold text-sm sm:text-base leading-tight uppercase select-none group-hover:underline">
                {p.title}
              </h3>
            </div>

            {/* Graphic Icon (Center-Bottom) */}
            <div className="flex justify-center items-center py-6">
              {getCardIcon(p.num)}
            </div>

            {/* Bottom: Massive Number Overlay */}
            <div className="flex justify-between items-end border-t border-current/15 pt-3">
              <span className="font-mono text-[9px] font-bold">
                {p.meta ? p.meta.toUpperCase() : '[ EXPLORE ]'}
              </span>
              <span className="font-display font-black text-4xl leading-none opacity-40 select-none">
                {p.num}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED PROJECT MODAL OVERLAY */}
      {selectedProj && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedProj(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-[var(--bg-color)] border-2 border-[var(--card-border)] p-6 md:p-8 rounded-lg shadow-2xl z-10 animate-scale-up font-mono text-xs text-[var(--text-secondary)]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProj(null)}
              className="absolute top-4 right-4 p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-colors rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category header */}
            <div className="border-b border-dashed border-[var(--card-border)] pb-2 mb-6 text-[10px]">
              <span className="text-[var(--accent-primary)] font-bold uppercase tracking-wider">
                PROJECT REGISTRY // VENTURE {selectedProj.num}
              </span>
            </div>

            {/* Title & Meta */}
            <div className="space-y-2 mb-6">
              <h3 className="font-syne font-extrabold text-lg text-[var(--text-primary)] uppercase leading-tight">
                {selectedProj.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-[9px]">
                <span className="border border-[var(--card-border)] px-2 py-0.5 rounded text-[var(--text-primary)] font-bold">
                  {selectedProj.category.toUpperCase()}
                </span>
                {selectedProj.meta && (
                  <span className="border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] px-2 py-0.5 rounded font-bold">
                    {selectedProj.meta.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6 leading-relaxed font-sans text-xs">
              <p className="text-justify text-[var(--text-secondary)]">
                {selectedProj.desc}
              </p>
            </div>

            {/* Technology Tags */}
            <div className="border-t border-dashed border-[var(--card-border)] pt-4 mb-6">
              <span className="text-[9px] font-bold text-[var(--text-primary)] block mb-2 uppercase">STACK INTEGRATION</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProj.tags.map((tag) => (
                  <span key={tag} className="border border-[var(--card-border)] bg-black/10 px-2 py-0.5 rounded text-[9px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedProj.enterprise ? (
                <div className="flex-1 py-2.5 bg-[var(--card-border)] text-stone-500 rounded flex items-center justify-center gap-1.5 select-none font-bold uppercase text-[10px]">
                  <Lock className="w-3.5 h-3.5" /> Source Access Restricted
                </div>
              ) : (
                <a
                  href={selectedProj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-[var(--text-primary)] text-[var(--bg-color)] font-bold rounded flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity text-center text-[10px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> [ LAUNCH CODE REPOSITORY ]
                </a>
              )}
              <button
                onClick={() => setSelectedProj(null)}
                className="px-4 py-2.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-all font-bold rounded text-[10px] cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
