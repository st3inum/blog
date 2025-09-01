/**
 * Simple Sitemap Generator
 * 
 * This script generates a sitemap.xml file from markdown posts at build time.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Site URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steinum.dev';
const today = new Date().toISOString().split('T')[0];

// Paths
const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

// Function to read all markdown files and extract metadata
function getAllPostsData() {
  console.log('Reading posts from:', POSTS_DIRECTORY);
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

// Function to generate sitemap XML
function generateSitemap(posts) {
  // Start building the sitemap with additional namespaces for better compatibility
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
  
  // Add home page
  sitemap += `  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add static pages
  const staticPages = [
    '/about',
    '/projects',
    '/achievements',
    '/contact'
  ];
  
  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
    const posts = getAllPostsData();
    console.log(`Found ${posts.length} posts`);
    
    const sitemapContent = generateSitemap(posts);
    
    // Write the sitemap to the public directory
    console.log('Writing sitemap to:', OUTPUT_FILE);
    fs.writeFileSync(OUTPUT_FILE, sitemapContent, 'utf8');
    
    console.log(`✅ Sitemap generated successfully with ${posts.length} posts at: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the generator
generateSitemapFile();
