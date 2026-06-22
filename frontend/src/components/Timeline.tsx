import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface ExperienceNode {
  role: string;
  company: string;
  duration: string;
  details: string;
  skills: string[];
}

export const Timeline: React.FC = () => {
  const [experience, setExperience] = useState<ExperienceNode[]>([
    {
      role: 'Tech Lead',
      company: 'Beyond Career',
      duration: 'Jul 2025 – Present',
      details: 'Architected beyondcareer.online on Next.js, Node.js, and Gemini API. Engineered RAG pipeline with FAISS vector search, reducing average response times to sub-2s. Managed 5 development engineers and decreased deployment pipeline cycles by 30% using Git, Docker, and CI/CD tools.',
      skills: ['Next.js', 'FastAPI', 'FAISS', 'Docker', 'CI/CD']
    },
    {
      role: "Founder's Office Intern",
      company: 'Lawxygen',
      duration: 'Feb 2026 – Present',
      details: 'Engineered legal document automation workflows powered by large language models and natural language processing. Successfully lowered manual document generation processing times by 60%.',
      skills: ['NLP', 'LLMs', 'Python', 'FastAPI']
    },
    {
      role: 'App Developer',
      company: 'PW (PhysicsWallah)',
      duration: 'Dec 2024 – Mar 2025',
      details: 'Integrated native mobile features using Flutter and Dart for an edtech platform servicing 100M+ users. Developed clean, high-performance modular components.',
      skills: ['Flutter', 'Dart', 'Firebase']
    },
    {
      role: 'COO, Frontend Developer & Designer',
      company: 'SGCA Technologies Pvt. Ltd.',
      duration: 'Dec 2023 – Jun 2025',
      details: 'Managed operational pipelines and client delivery schedules for 10+ software projects, reducing average lead times by 25%. Built reusable UI libraries in React, cutting layout styling times by 35%.',
      skills: ['React.js', 'Figma', 'Operations']
    }
  ]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeNodes, setActiveNodes] = useState<boolean[]>([]);

  // Fetch Experience from Backend API
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch('/api/experience');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setExperience(data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch experience API, using default timeline fallback.", err);
      }
    };

    fetchExperience();
  }, []);

  // Initialize active nodes state array
  useEffect(() => {
    setActiveNodes(new Array(experience.length).fill(false));
  }, [experience]);

  // Scroll Progress calculations for active states
  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const viewHeight = window.innerHeight;
      const startTrigger = viewHeight * 0.7; 
      
      const nodes = timeline.querySelectorAll('.timeline-node');
      const nextActiveNodes = [...activeNodes];

      nodes.forEach((node, index) => {
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.top < startTrigger - 40) {
          nextActiveNodes[index] = true;
        } else {
          nextActiveNodes[index] = false;
        }
      });

      // Simple array equality check
      let hasChanged = false;
      for (let i = 0; i < nextActiveNodes.length; i++) {
        if (nextActiveNodes[i] !== activeNodes[i]) {
          hasChanged = true;
          break;
        }
      }
      if (hasChanged) {
        setActiveNodes(nextActiveNodes);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeNodes, experience]);

  return (
    <section id="experience" className="py-20 max-w-5xl mx-auto px-6 relative border-t border-[var(--card-border)]">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 select-none">
        <div className="text-center pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            MY PROFESSIONAL ADVENTURE 🌟
          </span>
        </div>
        <h2 className="font-syne text-2xl md:text-4xl font-black uppercase text-center w-full py-2.5 border-y border-[var(--card-border)] text-[var(--text-primary)]">
          Where I've Made an Impact 💥
        </h2>
      </div>

      {/* Timeline Layout */}
      <div 
        ref={timelineRef} 
        id="experience-timeline" 
        className="relative border-l border-dashed border-[var(--card-border)] ml-6 md:ml-24 space-y-12 pb-8"
      >
        {experience.map((node, index) => {
          const isActive = activeNodes[index];
          
          return (
            <div key={index} className="relative pl-8 md:pl-12 group timeline-node">
              
              {/* Rounded Playful Marker */}
              <span
                className={`absolute -left-6 md:-left-8 top-1 px-2.5 py-0.5 border border-[var(--card-border)] bg-[var(--bg-color)] rounded-full flex items-center justify-center font-mono text-[10px] transition-all duration-300 font-bold ${
                  isActive 
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] font-black scale-105 shadow-sm' 
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Node Contents */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-3 pb-2 border-b border-dotted border-[var(--card-border)]">
                <div>
                  <h3 className="text-lg md:text-xl font-syne font-black text-[var(--text-primary)] leading-tight">
                    {node.role}
                  </h3>
                  <span className="text-[var(--accent-primary)] font-syne font-bold text-xs block md:inline md:mt-1">
                    {node.company}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider bg-black/10 px-2 py-0.5 border border-[var(--card-border)] rounded">
                  {node.duration}
                </span>
              </div>

              {/* Playful Details */}
              <p className="font-sans text-xs text-[var(--text-secondary)] mb-4">
                {node.details}
              </p>

              {/* Skill Badges footer */}
              <div className="flex flex-wrap gap-1.5">
                {node.skills.map((s, skillIdx) => (
                  <span 
                    key={skillIdx} 
                    className="px-2 py-0.5 border border-[var(--card-border)] text-[9px] font-mono text-[var(--text-secondary)] uppercase rounded-full bg-black/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Education Section */}
      <div className="mt-20 pt-10 border-t border-[var(--card-border)]">
        <h3 className="font-syne font-black text-xl text-center mb-8 flex items-center justify-center gap-2 text-[var(--text-primary)] uppercase select-none">
          <GraduationCap className="text-[var(--accent-primary)] w-5 h-5" /> My Education & Academic Journey 🎓
        </h3>
        
        <div className="max-w-2xl mx-auto border-2 border-[var(--card-border)] p-6 bg-black/5 rounded-2xl relative shadow-sm">
          <div className="border border-[var(--card-border)] rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--bg-color)]">
            <div>
              <h4 className="font-syne font-black text-lg text-[var(--text-primary)]">
                B.Tech in Mathematics & Computer Science
              </h4>
              <p className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                IILM UNIVERSITY · CLASS OF 2024 – 2028
              </p>
            </div>
            <div className="text-right">
              <span className="px-3.5 py-1.5 border border-[var(--accent-primary)] text-[var(--accent-primary)] font-mono font-bold text-xs rounded-full">
                CGPA: 8.54 / 10
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
