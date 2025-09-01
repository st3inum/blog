/**
 * Sitemap Generator
 * 
 * This script generates a sitemap.xml file from markdown posts and pages at build time.
 * Compatible with Next.js static export.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Site configuration
const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://steinum.dev',
  changefreq: {
    home: 'daily',
    posts: 'weekly',
    pages: 'monthly'
  },
  priority: {
    home: '1.0',
    posts: '0.8',
    pages: '0.7'
  }
};

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Paths
const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');
const PAGES_DIRECTORY = path.join(process.cwd(), 'src/pages');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

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
        draft: matterResult.data.draft || false,
      };
    })
    .filter(post => {
      // Filter out draft posts
      return post.draft !== true;
    });
    
  return allPostsData;
}

// Function to get main static pages
function getAllPages() {
  // Define the main static pages manually
  const staticPages = [
    { path: '/about', name: 'about.tsx' },
    { path: '/projects', name: 'projects.tsx' },
    { path: '/achievements', name: 'achievements.tsx' },
    { path: '/contact', name: 'contact.tsx' }
  ];

  return staticPages.map(page => {
    const filePath = path.join(PAGES_DIRECTORY, page.name);
    let lastmod = today;
    
    // Try to get the file's modification date if it exists
    try {
      if (fs.existsSync(filePath)) {
        lastmod = new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0];
      }
    } catch (error) {
      console.log(`Could not get modification date for ${filePath}`);
    }
    
    return {
      path: page.path,
      lastmod: lastmod
    };
  });
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

// Function to generate sitemap XML
function generateSitemap(posts, pages) {
  const siteUrl = siteConfig.siteUrl;
  const today = new Date().toISOString().split('T')[0];
  
  // Start building the sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // Add home page
  sitemap += `  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${siteConfig.changefreq.home}</changefreq>
    <priority>${siteConfig.priority.home}</priority>
  </url>
`;

  // Add static pages
  pages.forEach(page => {
    // Skip the home page as we've already added it
    if (page.path === '/') return;
    
    sitemap += `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${siteConfig.changefreq.pages}</changefreq>
    <priority>${siteConfig.priority.pages}</priority>
  </url>
`;
  });
  
  // Add each post
  posts.forEach(post => {
    const postUrl = `${siteUrl}/posts/${post.slug}`;
    const postDate = new Date(post.date).toISOString().split('T')[0];
    
    sitemap += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>${siteConfig.changefreq.posts}</changefreq>
    <priority>${siteConfig.priority.posts}</priority>
  </url>
`;
  });
  
  // Close the sitemap
  sitemap += `</urlset>`;
  
  return sitemap;
}

// Generate the sitemap
function generateSitemapFile() {
  console.log('Generating sitemap.xml...');
  
  try {
    console.log('Reading posts directory:', POSTS_DIRECTORY);
    const posts = getAllPostsData();
    console.log(`Found ${posts.length} posts`);
    
    console.log('Reading pages directory:', PAGES_DIRECTORY);
    const pages = getAllPages();
    console.log(`Found ${pages.length} pages`);
    
    const sitemapContent = generateSitemap(posts, pages);
    
    // Write the sitemap to the public directory
    console.log('Writing sitemap to:', OUTPUT_FILE);
    fs.writeFileSync(OUTPUT_FILE, sitemapContent, 'utf8');
    
    console.log(`✅ Sitemap generated successfully with ${posts.length} posts and ${pages.length} pages at: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the generator
generateSitemapFile();
