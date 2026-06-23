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

  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'AI / ML', 'Full-Stack', 'Mobile'];

  const matchesTab = (proj: Project) => {
    if (activeTab === 'All') return true;
    const cat = proj.category.toLowerCase();
    const tags = proj.tags.map(t => t.toLowerCase());

    if (activeTab === 'AI / ML') {
      return cat.includes('research') || cat.includes('nlp') || cat.includes('workflow') || cat.includes('ai') || cat.includes('machine') || tags.includes('cv') || tags.includes('nlp') || tags.includes('tf') || tags.includes('tensorflow') || tags.includes('gemini api') || tags.includes('openai api');
    }
    if (activeTab === 'Full-Stack') {
      return cat.includes('full-stack') || cat.includes('web') || tags.includes('next.js') || tags.includes('react.js');
    }
    if (activeTab === 'Mobile') {
      return cat.includes('mobile') || cat.includes('app') || tags.includes('flutter') || tags.includes('dart') || tags.includes('mobile');
    }
    return true;
  };

  const getCardStyle = () => {
    return 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--accent-secondary)] rounded-2xl';
  };

  const getCardIcon = (num: string) => {
    const classStr = "w-10 h-10 stroke-[1.2] text-[var(--accent-secondary)] transition-transform duration-300 group-hover:scale-110";
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
    <section id="projects" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
      
      {/* Section Header */}
      <div className="text-center mb-10 select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-secondary)] font-bold bg-[var(--card-bg)] px-3.5 py-1.5 rounded-full border border-[var(--card-border)]">
          🚀 FEAST YOUR EYES ON MY BUILDS
        </span>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-4">
          Projects & Creations
        </h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-12 select-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-300 rounded-full cursor-pointer border ${
              activeTab === cat
                ? 'bg-[var(--accent-primary)] text-slate-900 border-[var(--accent-primary)] shadow-sm'
                : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-secondary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Poster-style Vertical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {projects.filter(matchesTab).map((p) => (
          <div
            key={p.num}
            onClick={() => setSelectedProj(p)}
            className={`border p-6 flex flex-col justify-between h-80 transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden group ${getCardStyle()} hover:-translate-y-1.5 hover:shadow-md`}
          >
            {/* Header info */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-bold block mb-2">
                {p.category}
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base leading-snug uppercase select-none text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                {p.title}
              </h3>
            </div>

            {/* Graphic Icon (Center-Bottom) */}
            <div className="flex justify-center items-center py-6">
              {getCardIcon(p.num)}
            </div>

            {/* Bottom: Massive Number Overlay */}
            <div className="flex justify-between items-end border-t border-[var(--card-border)] pt-3">
              <span className="font-mono text-[9px] font-bold text-[var(--accent-primary)]">
                {p.meta ? p.meta.toUpperCase() : 'EXPLORE'}
              </span>
              <span className="font-display font-black text-4xl leading-none text-[var(--accent-secondary)] opacity-10 select-none group-hover:opacity-25 transition-opacity">
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
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedProj(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-[var(--bg-color)] border-2 border-[var(--card-border)] p-6 md:p-8 rounded-2xl shadow-2xl z-10 animate-scale-up font-mono text-xs text-[var(--text-secondary)]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProj(null)}
              className="absolute top-4 right-4 p-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-colors rounded-full cursor-pointer bg-[var(--card-bg)]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category header */}
            <div className="border-b border-dashed border-[var(--card-border)] pb-2 mb-6 text-[10px]">
              <span className="text-[var(--accent-primary)] font-bold uppercase tracking-wider">
                PROJECT DATA CARD // CARD {selectedProj.num}
              </span>
            </div>

            {/* Title & Meta */}
            <div className="space-y-2 mb-6 font-sans">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] uppercase leading-tight">
                {selectedProj.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-[9px] font-mono">
                <span className="border border-[var(--card-border)] bg-[var(--card-bg)] px-2.5 py-0.5 rounded-full text-[var(--text-primary)] font-bold">
                  {selectedProj.category.toUpperCase()}
                </span>
                {selectedProj.meta && (
                  <span className="border border-[var(--accent-primary)]/35 text-[var(--accent-primary)] bg-[rgba(255,184,0,0.05)] px-2.5 py-0.5 rounded-full font-bold">
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
                  <span key={tag} className="border border-[var(--card-border)] bg-[var(--card-bg)] px-2.5 py-0.5 rounded-full text-[9px] text-[var(--text-secondary)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedProj.enterprise ? (
                <div className="flex-1 py-2.5 bg-[var(--card-border)] text-stone-500 rounded-full flex items-center justify-center gap-1.5 select-none font-bold uppercase text-[10px]">
                  <Lock className="w-3.5 h-3.5" /> Codebase is Private 🔒
                </div>
              ) : (
                <a
                  href={selectedProj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-[var(--text-primary)] text-[var(--bg-color)] font-bold rounded-full flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity text-center text-[10px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Check Out Code on GitHub 💻
                </a>
              )}
              <button
                onClick={() => setSelectedProj(null)}
                className="px-5 py-2.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-all font-bold rounded-full text-[10px] cursor-pointer"
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
