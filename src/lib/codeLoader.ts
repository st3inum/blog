// Client-side code loader for external code links
import { highlightCodeElement } from './syntaxHighlighter';

// Cache for loaded code to prevent refetching
const codeCache = new Map<string, string>();

// Helper to determine if a URL is external or local
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Helper to extract local path from GitHub raw URLs
function getLocalPathFromGitHub(url: string): string {
  // Remove the GitHub raw URL prefix and extract the path after 'master/'
  const githubPrefix = 'https://raw.githubusercontent.com/st3inum/blog/master/';
  if (url.startsWith(githubPrefix)) {
    const relativePath = url.substring(githubPrefix.length);
    // Return the path starting with '/' for absolute path from public root
    return `/${relativePath}`;
  }
  
  // Fallback to the existing behavior if not a GitHub URL
  const match = url.match(/\/codes\/(.+)$/);
  if (match) {
    return `/codes/${match[1]}`;
  }
  
  // Final fallback
  const filename = url.split('/').pop() || '';
  return `/code-snippets/${filename}`;
}

// Helper to get multiple fallback paths to try
function getFallbackPaths(url: string): string[] {
  const paths: string[] = [];
  
  if (isExternalUrl(url)) {
    // Try the local codes/ directory path first
    paths.push(getLocalPathFromGitHub(url));
    // External URL will be tried as fallback in the main loading logic
  } else {
    // Direct local path
    paths.push(url);
  }
  
  return paths;
}

export function initializeCodeLoaders() {
  if (typeof window === 'undefined') return;
  
  // Find all code elements that need external loading
  const codeElements = document.querySelectorAll('[data-codelink]');
  
  codeElements.forEach((element) => {
    const codelink = element.getAttribute('data-codelink');
    const codeId = element.getAttribute('data-code-id');
    
    if (!codelink || !codeId) return;
    
    const codeElement = document.getElementById(codeId);
    if (!codeElement) {
      console.error(`Code element not found: ${codeId}`);
      return;
    }
    
    // Get all possible paths to try
    const fallbackPaths = getFallbackPaths(codelink);
    const isExternal = isExternalUrl(codelink);
    
    console.log(`Loading code for ${codeId}, trying paths:`, fallbackPaths);
    
    // Function to try loading from multiple paths
    const tryLoadCode = async (paths: string[], originalUrl: string): Promise<string> => {
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        try {
          console.log(`Trying to load from: ${path}`);
          const response = await fetch(path);
          if (response.ok) {
            console.log(`Successfully loaded from: ${path}`);
            return await response.text();
          }
        } catch (error) {
          console.log(`Failed to load from ${path}:`, error);
        }
      }
      
      // If all local paths failed and we have an external URL, try that as final fallback
      if (isExternal) {
        try {
          console.log(`All local paths failed, trying external source: ${originalUrl}`);
          const response = await fetch(originalUrl);
          if (response.ok) {
            console.log(`Successfully loaded from external source: ${originalUrl}`);
            return await response.text();
          }
        } catch (error) {
          console.log(`External source also failed:`, error);
        }
      }
      
      throw new Error('Code not found in any location');
    };
    
    // Try to load the code
    tryLoadCode(fallbackPaths, codelink)
      .then(code => {
        console.log(`Code loaded successfully for ${codeId}`);
        
        // Cache the code
        codeCache.set(codelink, code);
        
        // Set the code content
        codeElement.textContent = code;
        
        // Apply syntax highlighting immediately
        setTimeout(() => {
          console.log(`Applying syntax highlighting to ${codeId}`);
          highlightCodeElement(codeElement);
        }, 50);
        
        // Remove loading flag
        element.removeAttribute('data-loading');
      })
      .catch(error => {
        console.error(`Failed to load code for ${codeId}:`, error);
        
        // Show a friendly error message instead of breaking
        const friendlyMessage = `// Code snippet not found\n// Tried loading from multiple locations but couldn't find the file\n// Original URL: ${codelink}\n// Please check if the file exists in your repository`;
        
        codeElement.textContent = friendlyMessage;
        element.removeAttribute('data-loading');
        
        // Add a visual indicator that this is an error state
        codeElement.style.color = '#888';
        codeElement.style.fontStyle = 'italic';
      });
  });
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeLoaders);
  } else {
    // DOM is already ready
    initializeCodeLoaders();
  }
}
