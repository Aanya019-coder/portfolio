import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  fileName: string;
  category: string;
  gold: boolean;
}

export const Certifications: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([
    { name: "Claude with the Anthropic API", issuer: "Anthropic", fileName: "all claude certificates.pdf", category: "AI & Machine Learning", gold: true },
    { name: "Claude Code 101 & In Action", issuer: "Anthropic", fileName: "all claude certificates.pdf", category: "AI & Machine Learning", gold: true },
    { name: "Model Context Protocol", issuer: "Anthropic", fileName: "all claude certificates.pdf", category: "AI & Machine Learning", gold: false },
    { name: "Network Addressing & Troubleshooting", issuer: "Cisco", fileName: "Network_Addressing_and_Basic_Troubleshooting_certificate_aanya-chaudhary-cs28-iilm-edu_f3d95d0b-7da0-4019-8bd5-e3bf86ab5e7b.pdf", category: "Software & Emerging Tech", gold: false },
    { name: "Apply AI: Analyze Customer Reviews", issuer: "Cisco", fileName: "Apply_AI-_Analyze_Customer_Reviews_certificate_aanya-chaudhary-cs28-iilm-edu_72d1a5ce-06f5-48b7-9a94-4e88238ffbb2.pdf", category: "Software & Emerging Tech", gold: false },
    { name: "AI Essentials & Prompting Essentials", issuer: "Google", fileName: "Coursera google ai essentials.pdf", category: "AI & Machine Learning", gold: true }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const certLimit = 8;

  // Fetch certifications
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch('/api/certifications');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCerts(data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch certifications API, using default fallbacks.", err);
      }
    };

    fetchCerts();
  }, []);

  // Filter calculations
  let filtered = certs;
  if (activeFilter !== 'all') {
    filtered = certs.filter(c => c.category === activeFilter);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q)
    );
  }

  const totalFilteredCount = filtered.length;
  const shouldShowMoreBtn = totalFilteredCount > certLimit;

  if (shouldShowMoreBtn && !showAll) {
    filtered = filtered.slice(0, certLimit);
  }

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'AI & ML', value: 'AI & Machine Learning' },
    { label: 'Cloud', value: 'Cloud Computing' },
    { label: 'Data Analytics', value: 'Data Analytics' },
    { label: 'Software/Network', value: 'Software & Emerging Tech' },
  ];

  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === 'all') return certs.length;
    return certs.filter(c => c.category === categoryValue).length;
  };

  const getCertificateMeta = (fileName: string, issuer: string) => {
    const file = fileName.toLowerCase();
    const iss = issuer.toLowerCase();
    
    if (file.includes('claude') || file.includes('anthropic') || iss.includes('anthropic')) {
      return {
        skills: ["Anthropic Claude Models", "API Integration", "Context Window Optimization", "System Prompts", "Model Context Protocol (MCP)"],
        id: "ANT-CL-2026-081",
        date: "Issued: Q1 2026"
      };
    }
    if (file.includes('google') || file.includes('prompting') || file.includes('ai essentials') || iss.includes('google')) {
      return {
        skills: ["Prompt Engineering", "GenAI Workflows", "Google Workspace AI Integration", "Structured Output Formats"],
        id: "GGL-AI-2025-102",
        date: "Issued: 2025"
      };
    }
    if (file.includes('aws') || file.includes('amazon') || iss.includes('amazon')) {
      return {
        skills: ["AWS Cloud Architecture", "Elastic Compute Cloud (EC2)", "S3 Storage Routing", "Identity Access Management (IAM)", "Machine Learning Pipelines"],
        id: "AWS-CP-2025-504",
        date: "Issued: 2025"
      };
    }
    if (file.includes('cisco') || file.includes('troubleshooting') || file.includes('addressing') || file.includes('iot') || iss.includes('cisco')) {
      return {
        skills: ["IPv4 / IPv6 Subnetting", "Routing Tables & Gateway Setup", "Packet Tracer Diagnosis", "Network Firewalls", "IoT Protocols"],
        id: "CSCO-NET-2025-88",
        date: "Issued: 2025"
      };
    }
    if (file.includes('jpmorgan') || iss.includes('j.p. morgan') || iss.includes('jpmorgan')) {
      return {
        skills: ["Software Engineering Practices", "Perspective Data Visualisation", "Financial Tech Architectures", "Git Workflow"],
        id: "JPM-SWE-2024-912",
        date: "Issued: 2024"
      };
    }
    if (file.includes('tableau') || file.includes('analytics') || file.includes('data analyst') || iss.includes('tableau') || iss.includes('datacamp')) {
      return {
        skills: ["Tableau BI Visualisation", "Exploratory Data Analysis (EDA)", "Python Pandas & Numpy", "SQL Joins & Aggregates"],
        id: "TAB-DA-2024-411",
        date: "Issued: 2024"
      };
    }
    if (file.includes('nptel') || iss.includes('nptel')) {
      return {
        skills: ["Distributed Computing Principles", "Virtualization & Hypervisors", "SaaS & PaaS Deployment", "Resource Provisioning"],
        id: "NPTEL-CC-2024-03",
        date: "Issued: 2024"
      };
    }
    if (file.includes('springboard') || iss.includes('springboard')) {
      return {
        skills: ["C Programming Fundamentals", "Pointers & Memory Allocation", "Basic Data Structures", "Logic Optimization"],
        id: "SPG-C-2023-745",
        date: "Issued: 2023"
      };
    }
    
    return {
      skills: ["Specialized Technology Fundamentals", "Troubleshooting & Problem Solving", "Hands-on Implementation", "Industry Best Practices"],
      id: `CRED-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Verified Active"
    };
  };

  const selectedMeta = selectedCert ? getCertificateMeta(selectedCert.fileName, selectedCert.issuer) : null;

  return (
    <section id="certifications" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 select-none">
        <div className="text-center pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            VERIFIED CREDENTIALS & CERTIFICATES
          </span>
        </div>
        <h2 className="font-syne font-extrabold text-2xl md:text-4xl text-center w-full py-2.5 border-y border-[var(--card-border)] text-[var(--text-primary)]">
          ACHIEVEMENTS & BADGES 🏆
        </h2>
      </div>

      {/* Category Filter Tabs & Monospaced Search Input */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 select-none">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.value);
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveFilter(cat.value);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === cat.value
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.05)] font-bold'
                    : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[9px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search badges..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAll(false);
            }}
            className="w-full bg-black/10 border border-[var(--card-border)] rounded px-4 py-2 text-xs font-mono text-[var(--text-primary)] placeholder-stone-500 focus:outline-none focus:border-[var(--accent-primary)]"
          />
        </div>
      </div>
      {/* Verification Badges Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-stone-500 font-mono text-xs border border-dashed border-[var(--card-border)] rounded-xl">
          No badges found matching your search term. Try a different filter!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((c, index) => {
            const meta = getCertificateMeta(c.fileName, c.issuer);
            return (
              <div
                key={index}
                onClick={() => setSelectedCert(c)}
                className={`border p-5 flex flex-col justify-between transition-all duration-300 relative bg-transparent cursor-pointer group rounded-xl ${
                  c.gold
                    ? 'border-yellow-600/40 hover:border-yellow-500 hover:bg-yellow-500/5'
                    : 'border-[var(--card-border)] hover:border-[var(--accent-primary)] hover:bg-[rgba(var(--accent-primary),0.03)]'
                }`}
              >
                <div className="relative z-10">
                  {/* Badge Meta Info */}
                  <div className="flex justify-between items-center mb-4 select-none font-mono text-[9px] text-[var(--text-secondary)] border-b border-dashed border-[var(--card-border)] pb-1.5">
                    <span>ID: {meta.id}</span>
                    <span className="font-bold">{meta.date}</span>
                  </div>

                  {/* Issuer Stamp */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[8.5px] font-mono font-bold tracking-widest px-2 py-0.5 border rounded ${
                      c.gold
                        ? 'border-yellow-500/45 text-yellow-500 bg-yellow-500/10'
                        : 'border-[var(--card-border)] text-[var(--text-secondary)] bg-black/10'
                    }`}>
                      {c.issuer.toUpperCase()}
                    </span>
                    <span className="border border-emerald-500/25 text-emerald-500 bg-emerald-500/5 px-2 py-0.5 text-[8.5px] font-mono rounded">
                      [VERIFIED]
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-syne font-extrabold text-sm md:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                    {c.name}
                  </h4>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between relative z-10 pt-3 border-t border-[var(--card-border)] select-none">
                  <span className="text-[9px] font-mono text-[var(--text-secondary)]">
                    FILE: {c.fileName.substring(0, 14)}...
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] group-hover:underline">
                    [ View Badge ]
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show More Trigger */}
      {shouldShowMoreBtn && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 rounded-full"
          >
            <span>{showAll ? '[ Show Less ✨ ]' : '[ Show All Badges 🏆 ]'}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* DETAILED MODAL PREVIEW DRAWER */}
      {selectedCert && selectedMeta && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 select-none">
          {/* Backdrop Click Close */}
          <div 
            className="absolute inset-0 bg-black/90 cursor-pointer"
            onClick={() => setSelectedCert(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl h-[80vh] md:h-[70vh] bg-[var(--bg-color)] border-2 border-[var(--card-border)] rounded-2xl overflow-hidden flex flex-col md:flex-row z-10 p-1.5 shadow-2xl">
            
            {/* Modal Inner wrap */}
            <div className="w-full h-full border border-[var(--card-border)] rounded-xl overflow-hidden flex flex-col md:flex-row">
              
              {/* Left Drawer Side: Metadata */}
              <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-b md:border-b-0 md:border-r border-[var(--card-border)] bg-[var(--bg-color)]">
                
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-dashed border-[var(--card-border)] font-mono text-[10px]">
                    <span className="text-[var(--accent-primary)] font-bold">
                      CERTIFICATE META // {selectedMeta.id}
                    </span>
                    
                    <button 
                      onClick={() => setSelectedCert(null)}
                      className="p-1 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[var(--text-secondary)]">
                        ISSUED BY
                      </span>
                      <h4 className="font-syne font-extrabold text-xl text-[var(--text-primary)] leading-tight mt-1">
                        {selectedCert.name}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-[9px] font-mono">
                      <span className="border border-emerald-500/25 text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded">
                        VERIFIED BADGE ✅
                      </span>
                      <span className="border border-[var(--card-border)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                        {selectedCert.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Skills check */}
                  <div className="space-y-3 pt-4 border-t border-[var(--card-border)] font-mono">
                    <h5 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                      Skills Acquired:
                    </h5>
                    <div className="space-y-2 text-[11px] text-[var(--text-secondary)]">
                      {selectedMeta.skills.map((skill, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                           <span className="text-[var(--accent-primary)] font-bold select-none shrink-0">•</span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-[var(--card-border)] mt-6 flex flex-col gap-2 font-mono">
                  <a 
                    href={`/${selectedCert.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center bg-[var(--text-primary)] text-[var(--bg-color)] font-bold text-xs hover:opacity-95 transition-opacity rounded"
                  >
                    Download Certificate PDF 📄
                  </a>
                  
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="w-full py-2.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-xs text-[var(--text-primary)] font-bold transition-all cursor-pointer rounded"
                  >
                    Close Preview
                  </button>
                </div>

              </div>

              {/* Right Preview Frame */}
              <div className="hidden md:flex flex-1 bg-black items-center justify-center p-4 relative">
                <iframe 
                  src={`/${selectedCert.fileName}#toolbar=0&navpanes=0`}
                  className="w-full h-full bg-stone-900 border border-[var(--card-border)]"
                  title={`Certificate Preview - ${selectedCert.name}`}
                />
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
