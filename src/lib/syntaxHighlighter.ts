// Modern syntax highlighter using Prism.js with theme support
interface PrismLanguages {
  [key: string]: unknown;
}

interface PrismPlugins {
  [key: string]: unknown;
}

declare global {
  interface Window {
    Prism?: {
      highlightElement: (element: HTMLElement, async?: boolean, callback?: () => void) => void;
      highlightAll: (async?: boolean, callback?: () => void) => void;
      highlightAllUnder: (container: HTMLElement, async?: boolean, callback?: () => void) => void;
      plugins?: PrismPlugins;
      languages?: PrismLanguages;
    };
  }
}

export function initializeSyntaxHighlighter() {
  if (typeof window === 'undefined') return;

  // Check if Prism.js is already loaded
  if (window.Prism) {
    console.log('Prism.js already loaded, applying to existing code blocks');
    highlightCodeBlocks();
    return;
  }

  console.log('Loading Prism.js...');
  
  // Load Prism.js core
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
  script.onload = () => {
    console.log('Prism.js core loaded');
    
    // Load common language components
    const languages = [
      { name: 'cpp', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js' },
      { name: 'c', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js' },
      { name: 'javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js' },
      { name: 'python', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js' },
      { name: 'java', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js' },
      { name: 'bash', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js' },
      { name: 'sql', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js' }
    ];
    
    let loadedCount = 0;
    
    const checkAllLoaded = () => {
      loadedCount++;
      console.log(`Prism language loaded: ${loadedCount}/${languages.length}`);
      
      if (loadedCount === languages.length) {
        // Apply highlighting to all existing code blocks
        setTimeout(() => {
          console.log('Applying Prism.js syntax highlighting to all code blocks');
          highlightCodeBlocks();
        }, 100);
      }
    };

    // Load language components
    languages.forEach(lang => {
      const langScript = document.createElement('script');
      langScript.src = lang.src;
      langScript.onload = checkAllLoaded;
      langScript.onerror = () => {
        console.warn(`Failed to load Prism language: ${lang.name}`);
        checkAllLoaded(); // Continue even if some languages fail
      };
      document.head.appendChild(langScript);
    });
  };
  
  script.onerror = () => {
    console.error('Failed to load Prism.js');
  };
  
  document.head.appendChild(script);
}

function highlightCodeBlocks() {
  if (!window.Prism) {
    console.warn('Prism.js not available for highlighting');
    return;
  }

  // Find all code blocks and apply syntax highlighting
  const codeBlocks = document.querySelectorAll('pre code');
  console.log(`Found ${codeBlocks.length} code blocks to highlight with Prism.js`);
  
  codeBlocks.forEach((block, index) => {
    if (block instanceof HTMLElement) {
      // Skip if already highlighted by Prism
      if (block.classList.contains('token')) {
        console.log(`Code block ${index} already highlighted, skipping`);
        return;
      }
      
      // Ensure the code block has the correct language class
      const pre = block.parentElement;
      if (pre && pre.tagName === 'PRE') {
        const langClass = Array.from(pre.classList).find(cls => cls.startsWith('language-'));
        if (langClass && !block.classList.contains(langClass)) {
          block.classList.add(langClass);
        }
      }
      
      // Apply syntax highlighting
      try {
        console.log(`Highlighting code block ${index} with Prism.js`);
        window.Prism!.highlightElement(block);
        console.log(`Successfully highlighted code block ${index}`);
      } catch (error) {
        console.warn(`Failed to highlight code block ${index}:`, error);
      }
    }
  });
}

// Function to re-highlight after dynamic content loads
export function rehighlightCodeBlocks() {
  highlightCodeBlocks();
}

// Function to highlight a specific code element
export function highlightCodeElement(element: HTMLElement) {
  if (!window.Prism) {
    console.warn('Prism.js not available for highlighting single element');
    return;
  }
  
  try {
    console.log('Highlighting single code element with Prism.js');
    window.Prism.highlightElement(element);
  } catch (error) {
    console.warn('Failed to highlight code element:', error);
  }
}
