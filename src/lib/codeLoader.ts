// Client-side code loader for external code links
import { highlightCodeElement } from './syntaxHighlighter';

// Cache for loaded code to prevent refetching
const codeCache = new Map<string, string>();

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
    
    // Check if code is already cached
    if (codeCache.has(codelink)) {
      const cachedCode = codeCache.get(codelink)!;
      console.log(`Using cached code for ${codeId}`);
      codeElement.textContent = cachedCode;
      
      // Apply syntax highlighting to cached code
      setTimeout(() => {
        highlightCodeElement(codeElement);
      }, 50);
      return;
    }
    
    // Mark as loading to prevent duplicate requests
    element.setAttribute('data-loading', 'true');
    console.log(`Loading code from: ${codelink}`);
    
    // Show loading state
    codeElement.textContent = '// Loading code...';
    
    fetch(codelink)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(code => {
        console.log(`Code loaded successfully for ${codeId}`);
        
        // Cache the code
        codeCache.set(codelink, code);
        
        // Set the code content
        codeElement.textContent = code;
        
        // Apply syntax highlighting immediately
        setTimeout(() => {
          console.log(`Applying Prism.js syntax highlighting to ${codeId}`);
          highlightCodeElement(codeElement);
        }, 50);
        
        // Remove loading flag
        element.removeAttribute('data-loading');
      })
      .catch(error => {
        console.error(`Failed to load code from ${codelink}:`, error);
        codeElement.textContent = `// Failed to load code from: ${codelink}\n// Error: ${error.message}`;
        element.removeAttribute('data-loading');
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
