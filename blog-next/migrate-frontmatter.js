const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const hugoDir = '/home/steinum/Dropbox/blog/mathbugs.com/content/posts';
const nextDir = '/home/steinum/Dropbox/blog/blog-next/posts';

// Function to convert TOML/Hugo front matter to YAML
function convertHugoToNextFrontMatter(hugoData) {
  const nextData = {};
  
  // Map Hugo fields to Next.js fields
  if (hugoData.title) nextData.title = hugoData.title;
  if (hugoData.date) nextData.date = hugoData.date;
  if (hugoData.author) nextData.author = hugoData.author;
  if (hugoData.authorTwitter) nextData.authorTwitter = hugoData.authorTwitter;
  if (hugoData.cover) nextData.cover = hugoData.cover;
  if (hugoData.tags) nextData.tags = hugoData.tags;
  if (hugoData.keywords) nextData.keywords = hugoData.keywords;
  if (hugoData.description) nextData.description = hugoData.description;
  if (hugoData.showFullContent !== undefined) nextData.showFullContent = hugoData.showFullContent;
  if (hugoData.draft !== undefined) nextData.draft = hugoData.draft;
  
  return nextData;
}

// Get all Hugo posts
const hugoFiles = fs.readdirSync(hugoDir).filter(file => file.endsWith('.md'));
const nextFiles = fs.readdirSync(nextDir).filter(file => file.endsWith('.md'));

console.log(`Found ${hugoFiles.length} Hugo posts and ${nextFiles.length} Next.js posts`);

let migratedCount = 0;
let updatedCount = 0;

hugoFiles.forEach(filename => {
  const hugoPath = path.join(hugoDir, filename);
  const nextPath = path.join(nextDir, filename);
  
  try {
    // Read Hugo file
    const hugoContent = fs.readFileSync(hugoPath, 'utf8');
    const hugoParsed = matter(hugoContent, {
      delimiters: ['+++', '+++'], // TOML delimiters
      engines: {
        toml: {
          parse: (str) => {
            // Simple TOML parser for basic key=value pairs
            const result = {};
            str.split('\n').forEach(line => {
              line = line.trim();
              if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                  let value = valueParts.join('=').trim();
                  
                  // Remove quotes
                  if ((value.startsWith('"') && value.endsWith('"')) || 
                      (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                  }
                  
                  // Handle arrays
                  if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                  }
                  
                  // Handle booleans
                  if (value === 'true') value = true;
                  if (value === 'false') value = false;
                  
                  result[key.trim()] = value;
                }
              }
            });
            return result;
          }
        }
      }
    });
    
    // Convert Hugo front matter to Next.js format
    const nextFrontMatter = convertHugoToNextFrontMatter(hugoParsed.data);
    
    // Check if Next.js file exists
    if (fs.existsSync(nextPath)) {
      // Read existing Next.js file
      const nextContent = fs.readFileSync(nextPath, 'utf8');
      const nextParsed = matter(nextContent);
      
      // Merge front matter (Hugo takes precedence for conflicts)
      const mergedFrontMatter = { ...nextParsed.data, ...nextFrontMatter };
      
      // Write updated Next.js file
      const newContent = matter.stringify(nextParsed.content, mergedFrontMatter);
      fs.writeFileSync(nextPath, newContent);
      
      console.log(`✅ Updated: ${filename}`);
      updatedCount++;
    } else {
      // Create new Next.js file
      const newContent = matter.stringify(hugoParsed.content, nextFrontMatter);
      fs.writeFileSync(nextPath, newContent);
      
      console.log(`🆕 Migrated: ${filename}`);
      migratedCount++;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log(`\n📊 Migration Summary:`);
console.log(`   🆕 New files migrated: ${migratedCount}`);
console.log(`   ✅ Existing files updated: ${updatedCount}`);
console.log(`   📁 Total processed: ${migratedCount + updatedCount}`);
