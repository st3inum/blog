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
      manual?: boolean;
    };
  }
}

// Track loading state
let isLoading = false;
let isLoaded = false;
let pendingElements: HTMLElement[] = [];

// Load CSS for Prism.js with theme support
function loadPrismCSS() {
  // Remove existing Prism CSS if any
  const existingLinks = document.querySelectorAll('link[href*="prism"]');
  existingLinks.forEach(link => link.remove());

  return new Promise<void>((resolve, reject) => {
    // Always load the One Dark Pro CSS which contains both light and dark theme styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'prism-theme';
    link.href = '/styles/prism-onedark.css';
    
    link.onload = () => {
      console.log('Prism One Dark Pro theme loaded successfully');
      resolve();
    };
    
    link.onerror = () => {
      console.error('Failed to load Prism CSS theme');
      reject(new Error('Failed to load Prism CSS theme'));
    };
    
    document.head.appendChild(link);
  });
}



// Load a script and return a promise
function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export async function initializeSyntaxHighlighter() {
  if (typeof window === 'undefined') return;

  // Prevent multiple initializations
  if (isLoading || isLoaded) {
    console.log('Prism.js already loading or loaded');
    if (isLoaded) {
      highlightCodeBlocks();
    }
    return;
  }

  isLoading = true;
  console.log('Initializing Prism.js syntax highlighter...');

  try {
    // Load CSS first
    await loadPrismCSS();
    
    // Update data-theme attribute for proper theme detection
    updateThemeAttribute();

    // Set manual mode to prevent automatic highlighting
    (window as any).Prism = { manual: true };

    // Load Prism.js core
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js');
    console.log('Prism.js core loaded');

    // Load language components
    const languages = [
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-clike.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js'
    ];

    // Load all language components
    for (const langSrc of languages) {
      try {
        await loadScript(langSrc);
        console.log(`Loaded language component: ${langSrc.split('/').pop()}`);
      } catch (error) {
        console.warn(`Failed to load language component: ${langSrc}`, error);
      }
    }

    isLoaded = true;
    isLoading = false;
    
    console.log('Prism.js fully loaded, highlighting code blocks');
    
    // Highlight all existing code blocks
    highlightCodeBlocks();
    
    // Process any pending elements
    if (pendingElements.length > 0) {
      console.log(`Processing ${pendingElements.length} pending elements`);
      pendingElements.forEach(element => highlightCodeElement(element));
      pendingElements = [];
    }

  } catch (error) {
    console.error('Failed to initialize Prism.js:', error);
    isLoading = false;
  }
}

function highlightCodeBlocks() {
  if (!window.Prism || !isLoaded) {
    console.warn('Prism.js not available for highlighting');
    return;
  }

  // Find all code blocks and apply syntax highlighting
  const codeBlocks = document.querySelectorAll('pre code, code[class*="language-"]');
  console.log(`Found ${codeBlocks.length} code blocks to highlight`);
  
  codeBlocks.forEach((block, index) => {
    if (block instanceof HTMLElement) {
      highlightSingleElement(block, index);
    }
  });
}

function highlightSingleElement(block: HTMLElement, index?: number) {
  if (!window.Prism || !isLoaded) {
    console.warn('Prism.js not ready, adding to pending queue');
    if (!pendingElements.includes(block)) {
      pendingElements.push(block);
    }
    return;
  }

  // Skip if already highlighted
  if (block.querySelector('.token') || block.classList.contains('token')) {
    console.log(`Code block ${index || 'unknown'} already highlighted, skipping`);
    return;
  }

  // Skip if this element or its ancestors contain MathJax content
  if (containsMathJax(block)) {
    console.log(`Code block ${index || 'unknown'} contains MathJax, skipping to avoid conflicts`);
    return;
  }

  // Ensure proper language class
  const pre = block.closest('pre');
  if (pre) {
    const langClass = Array.from(pre.classList).find(cls => cls.startsWith('language-'));
    if (langClass && !block.classList.contains(langClass)) {
      block.classList.add(langClass);
    }
  }

  // Apply syntax highlighting
  try {
    console.log(`Highlighting code block ${index || 'unknown'}`);
    window.Prism.highlightElement(block);
    console.log(`Successfully highlighted code block ${index || 'unknown'}`);
    
    // Add copy button after highlighting
    addCopyButton(block);
  } catch (error) {
    console.warn(`Failed to highlight code block ${index || 'unknown'}:`, error);
  }
}

// Helper function to check if an element contains MathJax content
function containsMathJax(element: HTMLElement): boolean {
  // Check for MathJax processed elements
  if (element.querySelector('.MathJax, .MathJax_Display, mjx-container, mjx-math')) {
    return true;
  }
  
  // Check for MathJax delimiters in text content
  const textContent = element.textContent || '';
  if (textContent.includes('$$') || textContent.includes('\\(') || textContent.includes('\\[')) {
    return true;
  }
  
  // Check if element itself has MathJax classes
  if (element.classList.contains('MathJax') || 
      element.classList.contains('MathJax_Display') ||
      element.tagName === 'MJX-CONTAINER' ||
      element.tagName === 'MJX-MATH') {
    return true;
  }
  
  return false;
}

// Function to re-highlight after dynamic content loads
export function rehighlightCodeBlocks() {
  updateThemeAttribute();
  highlightCodeBlocks();
}

// Function to highlight a specific code element
export function highlightCodeElement(element: HTMLElement) {
  updateThemeAttribute();
  highlightSingleElement(element);
}

// Function to update theme attribute for proper CSS scoping
function updateThemeAttribute() {
  if (typeof window === 'undefined') return;
  
  // Check MUI theme mode from localStorage or system preference
  const savedMode = localStorage.getItem('colorMode');
  const systemPreference = localStorage.getItem('useSystemTheme');
  
  let currentMode = 'light';
  
  if (systemPreference === 'true') {
    currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else if (savedMode === 'dark' || savedMode === 'light') {
    currentMode = savedMode;
  } else {
    currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  document.documentElement.setAttribute('data-theme', currentMode);
  console.log(`Theme attribute set to: ${currentMode}`);
}

// Function to handle theme changes
export function handleThemeChange() {
  updateThemeAttribute();
  if (isLoaded) {
    // Re-highlight all code blocks with new theme
    setTimeout(() => {
      highlightCodeBlocks();
    }, 100);
  }
}

// Expose globally for theme integration
if (typeof window !== 'undefined') {
  (window as any).handleThemeChange = handleThemeChange;
}

// Function to get clean code text from element
function getCleanCodeText(codeElement: HTMLElement): string {
  // Store original code from data attribute if available
  const pre = codeElement.closest('pre');
  if (pre && pre.dataset.originalCode) {
    return pre.dataset.originalCode;
  }
  
  // Clone the element to avoid modifying the original
  const clone = codeElement.cloneNode(true) as HTMLElement;
  
  // Remove any loading text or placeholder content
  const loadingElements = clone.querySelectorAll('[data-loading], .loading');
  loadingElements.forEach(el => el.remove());
  
  // Get text content and clean it up
  let text = clone.textContent || '';
  
  // Remove common loading messages
  text = text.replace(/^\s*\/\/ Loading code\.\.\.\s*$/gm, '');
  text = text.replace(/^\s*Loading\.\.\.\s*$/gm, '');
  text = text.replace(/^\s*Please wait\.\.\.\s*$/gm, '');
  
  // Clean up extra whitespace
  text = text.trim();
  
  return text;
}

// Function to add copy button to code blocks
function addCopyButton(codeElement: HTMLElement) {
  const pre = codeElement.closest('pre');
  if (!pre || pre.querySelector('.code-copy-button')) {
    return; // Skip if no pre parent or button already exists
  }

  // Store original code for reliable copying
  if (!pre.dataset.originalCode) {
    pre.dataset.originalCode = getCleanCodeText(codeElement);
  }

  // Make pre element relative for absolute positioning
  pre.style.position = 'relative';
  
  // Create copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'code-copy-button';
  copyButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `;
  
  // Add styles
  Object.assign(copyButton.style, {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: '10',
    fontSize: '0',
  });
  
  // Apply theme-aware styles
  const updateButtonTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      Object.assign(copyButton.style, {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      });
    } else {
      Object.assign(copyButton.style, {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        color: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      });
    }
  };
  
  updateButtonTheme();
  
  // Hover effects
  copyButton.addEventListener('mouseenter', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      Object.assign(copyButton.style, {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 1)',
        transform: 'scale(1.05)',
      });
    } else {
      Object.assign(copyButton.style, {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: 'rgba(0, 0, 0, 0.9)',
        transform: 'scale(1.05)',
      });
    }
  });
  
  copyButton.addEventListener('mouseleave', () => {
    copyButton.style.transform = 'scale(1)';
    updateButtonTheme();
  });
  
  // Copy functionality
  copyButton.addEventListener('click', async () => {
    try {
      // Get fresh code text at copy time
      const codeText = getCleanCodeText(codeElement);
      await navigator.clipboard.writeText(codeText);
      
      // Show success feedback
      const originalHTML = copyButton.innerHTML;
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      `;
      
      setTimeout(() => {
        copyButton.innerHTML = originalHTML;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  });
  
  // Add tooltip
  copyButton.title = 'Copy code';
  
  pre.appendChild(copyButton);
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSyntaxHighlighter);
  } else {
    // DOM is already ready
    initializeSyntaxHighlighter();
  }
  
  // Listen for theme changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'colorMode' || e.key === 'useSystemTheme') {
      handleThemeChange();
    }
  });
}
