/**
 * RSS Feed Generator
 * 
 * This script generates an RSS feed from markdown posts at build time.
 * This is compatible with Next.js static export.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Site configuration
const siteConfig = {
  title: 'MathBugs Blog',
  description: 'Exploring mathematics, algorithms, and competitive programming with clear explanations and practical examples',
  siteUrl: 'https://st3inum.com', // Update this to your actual domain
  language: 'en',
  author: 'steinum',
};

// Paths
const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'rss.xml');

// Function to read all markdown files and extract metadata
function getAllPostsData() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  
  const allPostsData = fileNames
    .filter(fileName => {
      return fileName.endsWith('.md') || fileName.endsWith('.markdown');
    })
    .map(fileName => {
      const slug = fileName.replace(/\.md$|\.markdown$/i, '');
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      
      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString(),
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
        draft: matterResult.data.draft || false,
      };
    })
    .filter(post => {
      // Filter out draft posts
      return post.draft !== true;
    })
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
  return allPostsData;
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') {
    return '';
  }
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to generate RSS XML
function generateRSS(posts) {
  const siteUrl = siteConfig.siteUrl;
  const feedUrl = `${siteUrl}/rss.xml`;
  const title = siteConfig.title;
  const description = siteConfig.description;
  const language = siteConfig.language;
  
  // Format the current date as RFC 822
  const lastBuildDate = new Date().toUTCString();
  
  // Start building the RSS feed
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${siteUrl}</link>
  <description>${escapeXml(description)}</description>
  <language>${language}</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
`;
  
  // Add each post to the RSS feed
  posts.forEach((post) => {
    const postUrl = `${siteUrl}/posts/${post.slug}`;
    const postDate = new Date(post.date).toUTCString();
    const postTitle = post.title;
    const postDescription = post.description || `Read more about ${post.title}`;
    
    rss += `
  <item>
    <guid>${postUrl}</guid>
    <title>${escapeXml(postTitle)}</title>
    <link>${postUrl}</link>
    <pubDate>${postDate}</pubDate>
    <description>${escapeXml(postDescription)}</description>`;
    
    // Add tags as categories
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag && tag.trim()) {
          rss += `
    <category>${escapeXml(tag.trim())}</category>`;
        }
      });
    }
    
    rss += `
  </item>`;
  });
  
  // Close the RSS feed
  rss += `
</channel>
</rss>`;
  
  return rss;
}

// Generate the RSS feed
function generateRSSFeed() {
  console.log('Generating RSS feed...');
  
  try {
    const posts = getAllPostsData();
    const rssContent = generateRSS(posts);
    
    // Write the RSS feed to the public directory
    fs.writeFileSync(OUTPUT_FILE, rssContent, 'utf8');
    
    console.log(`✅ RSS feed generated successfully with ${posts.length} posts at: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run the generator
generateRSSFeed();
