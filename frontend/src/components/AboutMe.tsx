import React, { useState } from 'react';

export const AboutMe: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const skills = [
    { name: 'AI & Deep Learning (CNNs, RAG)', value: 92 },
    { name: 'Full-Stack Web Development (React & Next)', value: 95 },
    { name: 'Mobile Application Dev (Flutter)', value: 90 },
    { name: 'Natural Language Processing (LLMs)', value: 88 }
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
    <section id="about" className="py-20 px-6 bg-[var(--bg-color)] border-t border-[var(--card-border)] select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Portrait image with Paint Splash */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            
            {/* Paint Splash SVG Background */}
            <svg viewBox="0 0 200 200" className="absolute w-[120%] h-[120%] z-0 text-[var(--accent-secondary)] fill-current opacity-85 scale-105 select-none pointer-events-none">
              <path d="M145.2,50.1C160.1,68,168.3,92,162.7,112.5C157.1,133,137.6,150,115.1,158C92.6,166,67.1,165,49.2,152.9C31.3,140.8,21,117.6,22.6,96.3C24.2,75,37.7,55.7,56.9,43.2C76.1,30.7,101,25,122.4,32.4C131.7,35.6,138.8,42.4,145.2,50.1Z" />
            </svg>
            
            {/* Circle portrait picture container */}
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[var(--bg-color)] shadow-xl bg-[var(--card-bg)]">
              <img
                src="/profile_pic.png"
                alt="Aanya Chaudhary - About"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio Copy & Sliders */}
        <div className="md:col-span-7 space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[var(--text-primary)]">
              About Me
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              I describe myself as an engineer with a creative mindset and a drive to achieve high-performance results. My primary research interests lie in full-stack engineering, machine learning architectures, and natural language processing. I enjoy building seamless end-to-end applications from vectors to pixels.
            </p>
          </div>

          {/* Skill progress bars */}
          <div className="space-y-5">
            {skills.map((s) => (
              <div key={s.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[var(--text-primary)] font-sans">
                  <span>{s.name}</span>
                  <span>{s.value}%</span>
                </div>
                <div className="relative w-full h-2 bg-[var(--card-border)] rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full bg-[var(--accent-primary)] rounded-full"
                    style={{ width: `${s.value}%` }}
                  ></div>
                  <div
                    className="absolute top-1/2 w-4 h-4 bg-white border-2 border-[var(--accent-primary)] rounded-full -translate-y-1/2 -translate-x-1/2 shadow-md cursor-default"
                    style={{ left: `${s.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Tools badges */}
          <div className="pt-6 border-t border-[var(--card-border)]">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                Favorite Tech & Tools
              </h3>
              <span className="font-mono text-[10px] text-[var(--accent-primary)] font-bold min-h-[15px]">
                {activeTool ? `[ ${activeTool} ]` : '[ hover tools ]'}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {tools.map((t, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveTool(t.name)}
                  onMouseLeave={() => setActiveTool(null)}
                  className="tool-key-badge cursor-default select-none rounded-md"
                  title={t.name}
                >
                  {t.key}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
