const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend compiled build directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));
// Serve static files from the root portfolio folder (fallbacks for dynamic certificate PDFs and resume)
app.use(express.static(__dirname));

// Resume download endpoint
app.get('/resume.pdf', (req, res) => {
  const resumePath = path.join(__dirname, 'Aanya_Chaudhary_Resume_Final (3).pdf');
  if (fs.existsSync(resumePath)) {
    res.sendFile(resumePath);
  } else {
    res.status(404).json({ error: 'Resume PDF file not found.' });
  }
});

app.get('/api/certifications', (req, res) => {
  try {
    const files = fs.readdirSync(__dirname);
    const certFiles = files.filter(file => {
      const lower = file.toLowerCase();
      return lower.endsWith('.pdf') && 
             !lower.includes('resume') && 
             !lower.includes('cv');
    });

    const certs = certFiles.map(file => {
      // Create a clean human-readable name from filename
      let cleanName = file
        .replace(/\.pdf$/i, '')
        .replace(/_|-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Clean up specific common naming conventions
      if (cleanName.toLowerCase().includes('certificate')) {
        cleanName = cleanName.replace(/certificate/gi, '').trim();
      }

      // Format casing (Capitalize Words)
      cleanName = cleanName.split(' ').map(word => {
        if (!word) return '';
        // keep acronyms like AWS, AI, COA capitalized
        if (['aws', 'ai', 'coa', 'nptel', 'iot', 'gssoc', '5g'].includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ').trim();

      // Special cleanups for complex filenames
      if (cleanName.includes('Awsacademy12new20260529')) {
        cleanName = 'AWS Academy Cloud Foundations';
      } else if (cleanName.includes('Aws Academy Graduate Machine Learning For Natural Language Processing')) {
        cleanName = 'AWS Academy - Machine Learning for NLP';
      } else if (cleanName.includes('Aws Cloud Aanyachaudhary')) {
        cleanName = 'AWS Certified Cloud Practitioner Training';
      } else if (cleanName.includes('Springboard Cloud Aanyachaudhary')) {
        cleanName = 'Springboard Cloud Essentials';
      } else if (cleanName.includes('Gmail Congratulations Aanya You Are In. Gssoc 2026')) {
        cleanName = 'GSSoC 2026 Contributor Invitation';
      } else if (cleanName.includes('Apply Ai Analyze Customer Reviews')) {
        cleanName = 'Apply AI: Analyze Customer Reviews';
      }

      // Infer Issuer from name
      let issuer = 'Credential';
      const lowerName = cleanName.toLowerCase();
      if (lowerName.includes('aws') || lowerName.includes('amazon')) {
        issuer = 'Amazon Web Services (AWS)';
      } else if (lowerName.includes('google')) {
        issuer = 'Google';
      } else if (lowerName.includes('cisco') || lowerName.includes('addressing') || lowerName.includes('troubleshooting') || lowerName.includes('modern ai') || lowerName.includes('iot')) {
        issuer = 'Cisco';
      } else if (lowerName.includes('nptel')) {
        issuer = 'NPTEL';
      } else if (lowerName.includes('tableau')) {
        issuer = 'Tableau';
      } else if (lowerName.includes('jpmorgan')) {
        issuer = 'J.P. Morgan';
      } else if (lowerName.includes('springboard')) {
        issuer = 'Springboard';
      } else if (lowerName.includes('claude') || lowerName.includes('anthropic') || lowerName.includes('mcp')) {
        issuer = 'Anthropic';
      } else if (lowerName.includes('gssoc') || lowerName.includes('girlscript')) {
        issuer = 'GirlScript';
      } else if (lowerName.includes('datacamp') || lowerName.includes('python')) {
        issuer = 'DataCamp';
      }

      // Categorize
      let category = 'Software & Emerging Tech';
      if (lowerName.includes('aws') || lowerName.includes('amazon') || lowerName.includes('cloud') || lowerName.includes('nptel')) {
        category = 'Cloud Computing';
      } else if (lowerName.includes('ai') || lowerName.includes('machine learning') || lowerName.includes('claude') || lowerName.includes('prompting') || lowerName.includes('nlp')) {
        category = 'AI & Machine Learning';
      } else if (lowerName.includes('analytics') || lowerName.includes('tableau') || lowerName.includes('python') || lowerName.includes('data analyst')) {
        category = 'Data Analytics';
      }

      // Gold Tier indicators
      const isGold = lowerName.includes('anthropic') || lowerName.includes('claude') || lowerName.includes('google') || lowerName.includes('jpmorgan') || lowerName.includes('aws');

      return {
        name: cleanName || 'Professional Qualification',
        issuer: issuer,
        fileName: file,
        category: category,
        gold: isGold
      };
    });

    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve certificates dynamically.' });
  }
});

// Experience data endpoint
app.get('/api/experience', (req, res) => {
  res.json([
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
});

// Projects data endpoint
app.get('/api/projects', (req, res) => {
  res.json([
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
});

// Contact Endpoint (saves messages to Supabase if configured, otherwise falls back to local JSON)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
  let savedToSupabase = false;

  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const cleanUrl = SUPABASE_URL.replace(/\/$/, '');
      const tableUrl = `${cleanUrl}/rest/v1/contacts`;
      
      const response = await fetch(tableUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          created_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        console.log('📬 Contact message successfully saved to Supabase!');
        savedToSupabase = true;
      } else {
        const errorText = await response.text();
        console.error('⚠️ Supabase REST API error status:', response.status, errorText);
      }
    } catch (err) {
      console.error('❌ Failed to post contact message to Supabase:', err.message);
    }
  }

  // Fallback / local record keep
  const messageFile = path.join(__dirname, 'messages.json');
  let messages = [];

  if (fs.existsSync(messageFile)) {
    try {
      messages = JSON.parse(fs.readFileSync(messageFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
    savedToSupabase
  };

  messages.push(newMessage);
  fs.writeFileSync(messageFile, JSON.stringify(messages, null, 2));

  res.json({ 
    success: true, 
    message: savedToSupabase 
      ? 'Message saved to Supabase successfully!' 
      : 'Message saved locally (Supabase fallback).' 
  });
});

// Secure AI Chatbot integration
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstructions = `
    You are an AI assistant representing Aanya Chaudhary on her portfolio website.
    Respond professionally, concisely (1-2 short paragraphs), and enthusiastically.
    
    Aanya's Profile details:
    - Current Role: Tech Lead at Beyond Career (AI roadmap platform, FAISS index, sub-2s RAG); Founder's Office Intern at Lawxygen (LLM doc automation, 60% manual time reduction).
    - Education: B.Tech in Mathematics & Computer Science, IILM University, CGPA 8.54/10.
    - Research: Published paper on crop disease detection (94.05% accuracy, EfficientNet-B3 + Dual Attention (SE+CBAM)).
    - Mobile Experience: App Developer Intern at PW (PhysicsWallah), Flutter & Dart.
    - Skills: Next.js, FastAPI, Node.js, C++ (OOPs/DSA), Python, TensorFlow, RAG, FAISS, Docker, CI/CD.
    - LeetCode: 87 solved problems in C++ (Easy: 28, Medium: 48, Hard: 11) with a 93.52% acceptance rate.
    - Certifications: Anthropic Claude API certifications (Gold tier), Cisco networking, Google AI essentials.
    - Strengths: Bridges ML research and production engineering, strong leadership (VP of tech spark club), fast learner.
    
    Always address the visitor in a helpful tone. If someone asks why they should hire Aanya, highlight her leadership, dual research/engineering background, and production-level experience.
  `;

  if (!apiKey) {
    // Elegant fallback if no key is configured
    let fallbackReply = "Aanya is highly skilled in full-stack development and AI/ML architectures. I am currently operating in fallback mode, but you can view her projects, timeline, and certifications directly on the portfolio grid, or reach out via email!";
    const query = message.toLowerCase();
    
    if (query.includes('skill') || query.includes('lang') || query.includes('stack')) {
      fallbackReply = "Aanya's core skills span Python, C++ (OOPs/DSA), JavaScript (ES6+), React.js/Next.js, FastAPI, Node.js, and Flutter. She specializes in implementing Retrieval-Augmented Generation (RAG) using FAISS index engines.";
    } else if (query.includes('research') || query.includes('crop') || query.includes('disease')) {
      fallbackReply = "Aanya published research under Prof. Swati Vashisht utilizing an EfficientNet-B3 model with Dual Attention blocks (SE+CBAM), achieving 94.05% accuracy on 14,000+ crop images for disease detection.";
    } else if (query.includes('hire') || query.includes('maang') || query.includes('why')) {
      fallbackReply = "Why hire Aanya? She bridges research and software engineering, has served as Tech Lead managing 5 engineers, has shipped to 100M+ users at PhysicsWallah, and has 87 solved problems on LeetCode with a 93.52% acceptance rate.";
    } else if (query.includes('project')) {
      fallbackReply = "Her key builds include NutriScan AI (crop classification research), Beyond Career (AI career roadmaps on Next.js/FAISS), and AI Resume Analyzer (FastAPI/React ATS scoring tool).";
    }

    return res.json({ reply: fallbackReply });
  }

  try {
    const { GoogleGenAI } = require('@google/generative-ai');
    const ai = new GoogleGenAI({ apiKey });
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `${systemInstructions}\n\nVisitor: ${message}\nAssistant:`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    res.json({ reply: text.trim() });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'AI Assistant failed to generate a response.' });
  }
});

// Catch-all route to serve compiled frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Aanya Chaudhary's Portfolio Server running!`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
