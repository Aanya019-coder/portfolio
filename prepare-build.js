const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'frontend', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('⚡ Starting asset preparation for build...');

try {
  // Read all files from root
  const files = fs.readdirSync(rootDir);
  const certFiles = [];

  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file.toLowerCase().endsWith('.pdf')) {
      // Copy to public directory
      const destPath = path.join(publicDir, file);
      fs.copyFileSync(filePath, destPath);
      console.log(`✓ Copied: ${file} to frontend/public`);

      // Special check: copy main resume to resume.pdf as well
      if (file.toLowerCase().includes('resume') && !file.toLowerCase().includes('copy')) {
        const resumeDest = path.join(publicDir, 'resume.pdf');
        fs.copyFileSync(filePath, resumeDest);
        console.log(`✓ Copied resume as resume.pdf`);
      }

      // Parse certifications if it's not a resume/cv
      const lower = file.toLowerCase();
      if (!lower.includes('resume') && !lower.includes('cv')) {
        certFiles.push(file);
      }
    }
  });

  // Compile certifications JSON metadata
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

  // Save to root for Express, and to public/ for frontend
  const jsonContent = JSON.stringify(certs, null, 2);
  fs.writeFileSync(path.join(rootDir, 'certifications.json'), jsonContent);
  fs.writeFileSync(path.join(publicDir, 'certifications.json'), jsonContent);
  
  console.log(`✓ Generated: certifications.json with ${certs.length} entries`);
  console.log('🎉 Asset preparation completed successfully!');
} catch (error) {
  console.error('❌ Error during asset preparation:', error.message);
  process.exit(1);
}
