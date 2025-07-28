import fs from "fs";
import path from "path";
import matter from "gray-matter";

import gfm from 'remark-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import remarkCodeShortcode from './remarkCodeShortcode';
import remarkSpoiler from './remarkSpoiler';
import { convertCodeShortcodes } from './codeShortcodeProcessor';
import { optimizedImageTransformer } from './optimizedImageTransformer';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author?: string;
  authorTwitter?: string;
  cover?: string;
  tags?: string[];
  keywords?: string[];
  description?: string;
  showFullContent?: boolean;
  draft?: boolean;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => {
      // Only process .md files, skip directories and other files
      const fullPath = path.join(postsDirectory, fileName);
      const stat = fs.statSync(fullPath);
      return stat.isFile() && fileName.endsWith('.md');
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      // Handle both YAML (---) and TOML (+++) front matter
      let frontMatterData: Record<string, unknown> = {};
      
      if (fileContents.startsWith('+++')) {
        // TOML front matter - parse manually
        const parts = fileContents.split('+++');
        if (parts.length >= 3) {
          const tomlContent = parts[1].trim();
          
          // Simple TOML parser for basic key=value pairs
          tomlContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
              const [key, ...valueParts] = line.split('=');
              if (key && valueParts.length > 0) {
                let value: string | string[] | boolean = valueParts.join('=').trim();
                
                // Remove quotes
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                  value = value.slice(1, -1);
                }
                
                // Handle arrays
                if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
                  value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/['"]/g, ''));
                }
                
                // Handle booleans
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                
                frontMatterData[key.trim()] = value;
              }
            }
          });
        }
      } else {
        // YAML front matter (default)
        const parsedMatter = matter(fileContents);
        frontMatterData = parsedMatter.data;
      }
      
      // Handle missing title or date
      const title = frontMatterData.title ? String(frontMatterData.title) : slug;
      const date = frontMatterData.date ? String(frontMatterData.date) : new Date().toISOString();
      const draft = frontMatterData.draft === true;
      
      const result: PostMeta = {
        slug,
        title,
        date,
        draft,
      };
      
      // Only add fields that have values to avoid undefined serialization errors
      if (frontMatterData.author) result.author = String(frontMatterData.author);
      if (frontMatterData.authorTwitter) result.authorTwitter = String(frontMatterData.authorTwitter);
      if (frontMatterData.cover) result.cover = String(frontMatterData.cover);
      if (frontMatterData.tags && Array.isArray(frontMatterData.tags)) result.tags = frontMatterData.tags.map(String);
      if (frontMatterData.keywords && Array.isArray(frontMatterData.keywords)) result.keywords = frontMatterData.keywords.map(String);
      if (frontMatterData.description) result.description = String(frontMatterData.description);
      if (frontMatterData.showFullContent !== undefined) result.showFullContent = Boolean(frontMatterData.showFullContent);
      
      return result;
    })
    .filter(post => post.title && post.date && !post.draft); // Filter out posts with issues and draft posts
}

// Convert spoiler shortcodes {{< spoiler ... >}} to GitHub-style details
// function convertSpoilers(md: string): string {
//   // titled form: {{< spoiler text="Title" >}}content{{< /spoiler >}}
//   md = md.replace()
//   md = md.replace(/\{\{<\s*spoiler\s+text="([^"]*)"\s*>\}\}([\s\S]*?)\{\{<\s*\/spoiler\s*>\}\}/g,
//     (_match, title, body) => {
//       // console.log('match: ', _match);
//       // console.log('title: ', title);
//       // console.log('body: ', body);
//       // Clean up the title (remove HTML tags for summary)
//       const cleanTitle = title.replace(/<[^>]*>/g, '');
//       return `<details><summary>${title}</summary>${body}</details>`;
//     });
//   // simple form: {{% spoiler %}}content{{% /spoiler %}}
//   md = md.replace(/\{\{%\s*spoiler\s*%\}\}([\s\S]*?)\{\{%\s*\/spoiler\s*%\}\}/g,
//     (_m, body) => {
//       return `\<details><summary>click to show</summary>${body}</details>`;
//     });
  

//   const outputPath = path.join('/home/steinum/Dropbox/blog/blog-next/', 'output.md');
//   fs.writeFileSync(outputPath, md, 'utf-8');
//   console.log(`✅ Markdown saved to ${outputPath}`);


//   return md;
// }

function convertSpoilers(md: string): string {
  // Replace opening: {{< spoiler text="Title" >}} → <details><summary>Title</summary>
  md = md.replace(
    /\{\{<\s*spoiler\s+text="([^"]*)"\s*>\}\}/g,
    (_match, title) => {
      const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
      return `<details><summary>${cleanTitle}</summary>`;
    }
  );

  // Replace closing: {{< /spoiler >}} → </details>
  md = md.replace(/\{\{<\s*\/spoiler\s*>\}\}/g, '</details>');

  // Replace opening: {{% spoiler %}} → <details><summary>click to show</summary>
  md = md.replace(
    /\{\{%\s*spoiler\s*%\}\}/g,
    `<details><summary>click to show</summary>`
  );

  // Replace closing: {{% /spoiler %}} → </details>
  md = md.replace(/\{\{%\s*\/spoiler\s*%\}\}/g, '</details>');

  // const outputPath = path.join('/home/steinum/Dropbox/blog/blog-next/', 'output.md');
  // fs.writeFileSync(outputPath, md, 'utf-8');
  // console.log(`✅ Markdown saved to ${outputPath}`);

  return md;
}

// Find related posts based on tags and keywords
export function getRelatedPosts(currentSlug: string, maxPosts: number = 3): PostMeta[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost || (!currentPost.tags && !currentPost.keywords)) {
    // If no tags or keywords, return most recent posts
    return allPosts
      .filter(post => post.slug !== currentSlug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts);
  }

  // Calculate relevance score based on shared tags and keywords
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentSlug) // Exclude current post
    .map(post => {
      let score = 0;
      
      // Score based on shared tags
      if (currentPost.tags && post.tags) {
        currentPost.tags.forEach(tag => {
          if (post.tags?.includes(tag)) {
            score += 2; // Tags are more important than keywords
          }
        });
      }
      
      // Score based on shared keywords
      if (currentPost.keywords && post.keywords) {
        currentPost.keywords.forEach(keyword => {
          if (keyword && post.keywords?.includes(keyword)) {
            score += 1;
          }
        });
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0) // Only include posts with some relevance
    .sort((a, b) => {
      // First sort by score (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Then by date (most recent first)
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .map(item => item.post)
    .slice(0, maxPosts);

  // If not enough related posts by tags/keywords, fill with recent posts
  if (postsWithScore.length < maxPosts) {
    const recentPosts = allPosts
      .filter(post => 
        post.slug !== currentSlug && 
        !postsWithScore.some(relatedPost => relatedPost.slug === post.slug)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts - postsWithScore.length);
    
    return [...postsWithScore, ...recentPosts];
  }

  return postsWithScore;
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  // Pre-process custom shortcodes to final HTML blocks
  const contentWithCodeShortcodes = convertCodeShortcodes(content);
  const contentWithSpoilers = convertSpoilers(contentWithCodeShortcodes);

  const processed = await unified()
    .use(remarkParse)
    .use(gfm)
    .use(optimizedImageTransformer)
    .use(remarkCodeShortcode)
    .use(remarkSpoiler)
    .use(remarkRehype, { allowDangerousHtml: true, clobberPrefix: '' })
    .use(rehypePrism)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(contentWithSpoilers);
  const contentHtml = processed.toString();
  
  // Handle missing title or date
  const title = data.title ? String(data.title) : slug;
  const date = data.date ? String(data.date) : new Date().toISOString();
  const draft = data.draft === true;
  
  // Get related posts
  const relatedPosts = getRelatedPosts(slug, 3);
  
  // Add tags and keywords to the returned data
  const tags = data.tags || [];
  const keywords = data.keywords || [];
  
  return {
    slug,
    title,
    date,
    draft,
    contentHtml,
    tags,
    keywords,
    relatedPosts,
  };
}
