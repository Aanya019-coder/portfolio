import React, { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, BarChart2 } from 'lucide-react';

interface CodingStatsProps {
  isLight: boolean;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number | string;
  totalSubmissions: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
}

export const CodingStats: React.FC<CodingStatsProps> = ({ isLight }) => {
  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    totalSolved: 87,
    easySolved: 28,
    mediumSolved: 48,
    hardSolved: 11,
    acceptanceRate: 93.52,
    ranking: 'Top 8.5%',
    totalSubmissions: 108,
    totalEasy: 950,
    totalMedium: 2069,
    totalHard: 943,
  });

  const [ghStats, setGhStats] = useState<GitHubStats>({
    repos: 18,
    followers: 14,
    stars: 12,
  });

  const [skillsView, setSkillsView] = useState<'grid' | 'radar'>('grid');

  // Fetch LeetCode Stats
  useEffect(() => {
    let fetched = false;

    const fetchHeroku = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/Aanya_019');
        if (response.ok) {
          const data = await response.json();
          if (data && data.status === 'success') {
            const easy = data.easySolved ?? lcStats.easySolved;
            const medium = data.mediumSolved ?? lcStats.mediumSolved;
            const hard = data.hardSolved ?? lcStats.hardSolved;
            setLcStats({
              totalSolved: data.totalSolved ?? (easy + medium + hard),
              easySolved: easy,
              mediumSolved: medium,
              hardSolved: hard,
              acceptanceRate: data.acceptanceRate ?? lcStats.acceptanceRate,
              ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : lcStats.ranking,
              totalSubmissions: data.totalSubmissions || Math.round((data.totalSolved || 87) / ((data.acceptanceRate || 93.52) / 100)) || 108,
              totalEasy: data.totalEasy ?? lcStats.totalEasy,
              totalMedium: data.totalMedium ?? lcStats.totalMedium,
              totalHard: data.totalHard ?? lcStats.totalHard,
            });
            fetched = true;
          }
        }
      } catch (err) {
        console.warn("Failed to fetch LeetCode Heroku API, trying Render fallback...", err);
      }

      if (!fetched) {
        try {
          const response = await fetch('https://alfa-leetcode-api.onrender.com/Aanya_019');
          if (response.ok) {
            const data = await response.json();
            if (data && !data.errors) {
              const easy = data.easySolved ?? lcStats.easySolved;
              const medium = data.mediumSolved ?? lcStats.mediumSolved;
              const hard = data.hardSolved ?? lcStats.hardSolved;
              setLcStats({
                totalSolved: data.totalSolved ?? (easy + medium + hard),
                easySolved: easy,
                mediumSolved: medium,
                hardSolved: hard,
                acceptanceRate: data.acceptanceRate ?? lcStats.acceptanceRate,
                ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : lcStats.ranking,
                totalSubmissions: data.totalSubmissions || Math.round((data.totalSolved || 87) / ((data.acceptanceRate || 93.52) / 100)) || 108,
                totalEasy: data.totalEasy ?? lcStats.totalEasy,
                totalMedium: data.totalMedium ?? lcStats.totalMedium,
                totalHard: data.totalHard ?? lcStats.totalHard,
              });
            }
          }
        } catch (err) {
          console.warn("Failed to fetch LeetCode Render API, using local fallbacks:", err);
        }
      }
    };

    fetchHeroku();
  }, []);

  // Fetch GitHub Stats
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Aanya019-coder');
        if (response.ok) {
          const data = await response.json();
          if (data && data.public_repos !== undefined) {
            const followers = data.followers;
            const reposCount = data.public_repos;

            // Fetch stars from repos API
            const reposRes = await fetch('https://api.github.com/users/Aanya019-coder/repos?per_page=100');
            let starsCount = 0;
            if (reposRes.ok) {
              const repos = await reposRes.json();
              if (Array.isArray(repos)) {
                starsCount = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
              }
            }
            setGhStats({
              repos: reposCount,
              followers: followers,
              stars: starsCount || 12,
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live GitHub stats, using local fallbacks.", err);
      }
    };

    fetchGitHub();
  }, []);

  const statsTheme = isLight
    ? "theme=transparent&title_color=A88C52&text_color=605B55&icon_color=A88C52&border_color=A88C52"
    : "theme=transparent&title_color=D4AF37&text_color=A09B90&icon_color=D4AF37&border_color=2D2C2A";

  const streakTheme = isLight
    ? "currStreakNum=A88C52&sideNums=605B55&sideLabels=605B55&currStreakLabel=A88C52&ring=A88C52&fire=A88C52&border=A88C52"
    : "background=141312&currStreakNum=D4AF37&sideNums=A09B90&sideLabels=A09B90&currStreakLabel=D4AF37&ring=D4AF37&fire=D4AF37&border=2D2C2A";

  const statsCardSrc = `https://github-readme-stats.vercel.app/api?username=Aanya019-coder&show_icons=true&${statsTheme}`;
  const streakCardSrc = `https://github-readme-streak-stats.herokuapp.com/?user=Aanya019-coder&theme=transparent&${streakTheme}`;

  // Acceptance Rate math
  const acceptanceVal = lcStats.acceptanceRate || 93.52;
  const acceptanceStr = acceptanceVal.toFixed(2);
  const parts = acceptanceStr.split('.');
  const mainPart = parts[0];
  const subPart = '.' + parts[1] + '%';

  return (
    <>
      {/* CODES & METRICS REPORT SECTION (Financial Market Style) */}
      <section id="coding-stats" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)]">
        
        {/* Banner Header */}
        <div className="flex flex-col items-center mb-12 select-none">
          <div className="text-center pb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
              NUMBERS, METRICS & STATS
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-2xl md:text-4xl text-center w-full py-2.5 border-y border-[var(--card-border)] text-[var(--text-primary)]">
            MY CODING DASHBOARD 📊
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LeetCode Report (Col Span 5) */}
          <div className="lg:col-span-5 border border-[var(--card-border)] p-6 flex flex-col justify-between">
            <div>
              {/* Report Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] mb-6 select-none font-mono">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                  <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>LEETCODE STATS</span>
                </div>
                <span className="text-[9px] border border-[var(--accent-primary)] text-[var(--accent-primary)] px-1 py-0.2">
                  LIVE SYNC
                </span>
              </div>

              {/* Data Table and Ring */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                
                {/* Traditional Dial */}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="var(--card-border)" strokeWidth="6" fill="transparent" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="var(--accent-primary)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={(2 * Math.PI * 40) - (acceptanceVal / 100) * (2 * Math.PI * 40)}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center select-none">
                    <div className="flex items-baseline justify-center">
                      <span className="text-xl font-bold font-serif text-[var(--text-primary)]">{mainPart}</span>
                      <span className="text-[10px] font-bold text-[var(--text-secondary)]">{subPart}</span>
                    </div>
                    <span className="block text-[8px] uppercase tracking-wider text-[var(--text-secondary)] font-mono">ACCEPTANCE</span>
                  </div>
                </div>

                {/* Stock Table List */}
                <div className="w-full font-mono text-xs">
                  <div className="flex justify-between border-b border-[var(--card-border)] pb-1 mb-2 font-bold select-none text-[var(--text-secondary)]">
                    <span>SECTOR</span>
                    <span>WEIGHT / LIMIT</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Easy Algorithms</span>
                      <span className="font-bold text-[var(--text-primary)]">{lcStats.easySolved} / {lcStats.totalEasy}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Medium Algorithms</span>
                      <span className="font-bold text-[var(--text-primary)]">{lcStats.mediumSolved} / {lcStats.totalMedium}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Hard Algorithms</span>
                      <span className="font-bold text-[var(--text-primary)]">{lcStats.hardSolved} / {lcStats.totalHard}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Ledger Summary Stats */}
              <div className="border border-[var(--card-border)] bg-black/10 p-4 font-mono text-xs space-y-1.5 select-none">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>TOTAL SUBMISSIONS:</span>
                  <span className="text-[var(--text-primary)] font-bold">{lcStats.totalSubmissions} runs</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)] font-bold">
                  <span>GLOBAL RATING:</span>
                  <span className="text-[var(--accent-primary)] font-black uppercase">{lcStats.ranking}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--card-border)] mt-6">
              <a
                href="https://leetcode.com/u/Aanya_019/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-mono font-bold text-center block transition-all rounded"
              >
                [ VIEW MY LEETCODE PROFILE <ArrowUpRight className="w-3 h-3 inline mb-0.5" /> ]
              </a>
            </div>
          </div>

          {/* GitHub Report (Col Span 7) */}
          <div className="lg:col-span-7 border border-[var(--card-border)] p-6 flex flex-col justify-between">
            <div>
              {/* Report Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] mb-6 select-none font-mono">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                  <BarChart2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>GITHUB STATS</span>
                </div>
                <span className="text-[9px] border border-[var(--accent-primary)] text-[var(--accent-primary)] px-1 py-0.2">
                  ACTIVE SYNC
                </span>
              </div>

              {/* Core Index Numbers Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 font-mono text-center select-none">
                <div className="border border-[var(--card-border)] p-3">
                  <span className="block text-[9px] text-[var(--text-secondary)] mb-1 uppercase">Public Repos</span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">{ghStats.repos}</span>
                </div>
                <div className="border border-[var(--card-border)] p-3">
                  <span className="block text-[9px] text-[var(--text-secondary)] mb-1 uppercase">Followers</span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">{ghStats.followers}</span>
                </div>
                <div className="border border-[var(--card-border)] p-3">
                  <span className="block text-[9px] text-[var(--text-secondary)] mb-1 uppercase">Total Stars</span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">{ghStats.stars}</span>
                </div>
              </div>

              {/* GitHub Readme Cards */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center select-none border border-[var(--card-border)] p-3 bg-black/5">
                <img
                  src={statsCardSrc}
                  alt="Aanya's GitHub Stats"
                  className="w-full sm:w-1/2 max-h-40 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
                <img
                  src={streakCardSrc}
                  alt="Aanya's GitHub Streak"
                  className="w-full sm:w-1/2 max-h-40 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--card-border)] mt-6">
              <a
                href="https://github.com/Aanya019-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-mono font-bold text-center block transition-all rounded"
              >
                [ VISIT MY GITHUB PROFILE <ArrowUpRight className="w-3 h-3 inline mb-0.5" /> ]
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* TECH STACK & MASTERY SECTION */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
        
        {/* Skills Masthead */}
        <div className="flex flex-col items-center mb-10 text-center select-none">
          <div className="pb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
              TECH STACK & SKILLS 🛠️
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-center w-full py-2.5 border-y border-[var(--card-border)] text-[var(--text-primary)]">
            MY SKILLS & CAPABILITIES
          </h2>
          <div className="py-1 px-4 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Languages · Frameworks · Machine Learning · Cloud & Databases
          </div>
        </div>

        {/* Tab Controls to switch view */}
        <div className="flex gap-4 justify-center mb-10 select-none">
          <button
            onClick={() => setSkillsView('grid')}
            className={`px-4 py-1.5 border font-mono text-[10px] uppercase transition-all cursor-pointer rounded-full ${
              skillsView === 'grid'
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.05)] font-bold'
                : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            [ Interactive Cards ]
          </button>
          <button
            onClick={() => setSkillsView('radar')}
            className={`px-4 py-1.5 border font-mono text-[10px] uppercase transition-all cursor-pointer rounded-full ${
              skillsView === 'radar'
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.05)] font-bold'
                : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            [ Skills Radar Map ]
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Container */}
          <div className="lg:col-span-7">
            {skillsView === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Skill Card 1 */}
                <div className="classified-ad rounded-xl">
                  <div className="classified-ad-header">LANGUAGES 💻</div>
                  <div className="classified-ad-body font-sans">
                    Deep expertise in writing clean code and scaling logic with: <strong>Python</strong>, <strong>C++ (OOPs & DSA)</strong>, <strong>JavaScript</strong>, <strong>SQL</strong>, and <strong>Dart</strong>.
                  </div>
                </div>

                {/* Skill Card 2 */}
                <div className="classified-ad rounded-xl">
                  <div className="classified-ad-header">FRAMEWORKS ⚡</div>
                  <div className="classified-ad-body font-sans">
                    Building responsive frontend interfaces and fast APIs using: <strong>React.js</strong>, <strong>Next.js</strong>, <strong>FastAPI</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>Flutter</strong>.
                  </div>
                </div>

                {/* Skill Card 3 */}
                <div className="classified-ad rounded-xl">
                  <div className="classified-ad-header">AI & DEEP LEARNING 🧠</div>
                  <div className="classified-ad-body font-sans">
                    Designing advanced <strong>RAG architectures</strong> with <strong>FAISS vector search</strong>, integrating <strong>Gemini APIs</strong>, and training custom <strong>CNN models</strong> (EfficientNet, Grad-CAM).
                  </div>
                </div>

                {/* Skill Card 4 */}
                <div className="classified-ad rounded-xl">
                  <div className="classified-ad-header">INFRASTRUCTURE & DBs 🛠️</div>
                  <div className="classified-ad-body font-sans">
                    Deploying applications and database models with: <strong>Docker</strong>, <strong>PostgreSQL</strong>, <strong>MongoDB</strong>, <strong>Supabase</strong>, <strong>Git</strong>, and <strong>GitHub Actions CI/CD</strong> pipelines.
                  </div>
                </div>

              </div>
            ) : (
              /* Proficiency bars */
              <div className="space-y-5 py-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                    <span>AI ENGINEERING & RAG PIPELINES</span>
                    <span className="font-bold text-[var(--text-primary)]">90%</span>
                  </div>
                  <div className="w-full bg-[var(--card-border)] h-2.5 rounded-full overflow-hidden p-0.5 border border-[var(--card-border)]">
                    <div
                      className="bg-[var(--accent-primary)] h-full transition-all duration-[1.5s] rounded-full"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                    <span>FULL STACK DEVELOPMENT</span>
                    <span className="font-bold text-[var(--text-primary)]">85%</span>
                  </div>
                  <div className="w-full bg-[var(--card-border)] h-2.5 rounded-full overflow-hidden p-0.5 border border-[var(--card-border)]">
                    <div
                      className="bg-[var(--accent-primary)] h-full transition-all duration-[1.5s] rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                    <span>MOBILE APP ARCHITECTURES</span>
                    <span className="font-bold text-[var(--text-primary)]">75%</span>
                  </div>
                  <div className="w-full bg-[var(--card-border)] h-2.5 rounded-full overflow-hidden p-0.5 border border-[var(--card-border)]">
                    <div
                      className="bg-[var(--accent-primary)] h-full transition-all duration-[1.5s] rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Container (Radar Chart) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-72 h-72 md:w-80 md:h-80 relative flex items-center justify-center border border-[var(--card-border)] p-4 bg-black/5 rounded-2xl shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Grid Lines */}
                <polygon points="50,10 90,38 75,85 25,85 10,38" fill="none" stroke="var(--card-border)" strokeWidth="0.8" />
                <polygon points="50,20 82,44 70,80 30,80 18,44" fill="none" stroke="var(--card-border)" strokeWidth="0.5" />
                <polygon points="50,30 74,50 65,75 35,75 26,50" fill="none" stroke="var(--card-border)" strokeWidth="0.5" />
                <polygon points="50,40 66,56 60,70 40,70 34,56" fill="none" stroke="var(--card-border)" strokeWidth="0.5" />

                {/* Axes */}
                <line x1="50" y1="50" x2="50" y2="10" stroke="var(--card-border)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="90" y2="38" stroke="var(--card-border)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="75" y2="85" stroke="var(--card-border)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="25" y2="85" stroke="var(--card-border)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="10" y2="38" stroke="var(--card-border)" strokeWidth="0.5" />

                {/* Labels */}
                <text x="50" y="7" textAnchor="middle" fontSize="3.2" fill="var(--text-primary)" fontFamily="monospace" className="font-bold">Full Stack</text>
                <text x="93" y="38" textAnchor="start" fontSize="3.2" fill="var(--text-primary)" fontFamily="monospace" className="font-bold">AI / ML</text>
                <text x="78" y="88" textAnchor="start" fontSize="3.2" fill="var(--text-primary)" fontFamily="monospace" className="font-bold">Backend</text>
                <text x="22" y="88" textAnchor="end" fontSize="3.2" fill="var(--text-primary)" fontFamily="monospace" className="font-bold">Mobile</text>
                <text x="7" y="38" textAnchor="end" fontSize="3.2" fill="var(--text-primary)" fontFamily="monospace" className="font-bold">DevOps</text>

                {/* Radar Area */}
                <polygon
                  points="50,14 88,38 72,80.8 31.25,76.25 17.2,40.16"
                  fill={isLight ? "rgba(168, 140, 82, 0.15)" : "rgba(197, 160, 89, 0.15)"}
                  stroke="var(--accent-primary)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
