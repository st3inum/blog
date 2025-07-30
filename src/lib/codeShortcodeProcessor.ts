interface CodeShortcodeParams {
  language?: string;
  title?: string;
  id?: string;
  expand?: string;
  collapse?: string;
  isCollapsed?: string;
  codelink?: string;
}

function parseShortcodeParams(content: string): CodeShortcodeParams {
  const params: CodeShortcodeParams = {};
  
  // Parse parameters like: language="cpp" title="My Code" id="1" etc.
  const paramRegex = /(\w+)="([^"]*)"/g;
  let match;
  
  while ((match = paramRegex.exec(content)) !== null) {
    const [, key, value] = match;
    params[key as keyof CodeShortcodeParams] = value;
  }
  
  return params;
}

function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function convertCodeShortcodes(content: string): string {
  // Match Hugo-style code shortcodes
  const shortcodeRegex = /\{\{<\s*code\s+([^>]+?)\s*>\}\}([\s\S]*?)\{\{<\s*\/code\s*>\}\}/g;
  
  let processedContent = content;
  
  processedContent = processedContent.replace(shortcodeRegex, (fullMatch, paramString, innerContent) => {
    console.log('Processing code shortcode:', paramString);
    
    const params = parseShortcodeParams(paramString);
    
    if (!params.language) {
      console.warn('Code shortcode missing required "language" parameter');
      return fullMatch; // Return original if invalid
    }
    
    const id = params.id || generateRandomId();
    const title = params.title || '';
    const expand = params.expand || '△';
    const collapse = params.collapse || '▽';
    const isCollapsed = params.isCollapsed === 'true';
    const codelink = params.codelink;
    
    // Determine the code content and attributes
    let codeContent = '';
    let codelinkAttr = '';
    
    if (innerContent.trim()) {
      // Case 1: Inline code content provided
      codeContent = innerContent.trim();
      console.log('Using inline code content');
    } else if (codelink) {
      // Case 2: External code link provided
      codeContent = '// Loading code...';
      codelinkAttr = ` data-codelink="${codelink}" data-code-id="code${id}"`;
      console.log('Using external code link:', codelink);
    } else {
      // Case 3: No content or link provided
      codeContent = '// No code content available';
      console.warn('Code shortcode has no content or codelink');
    }
    
    // Escape HTML in code content for inline code
    if (!codelink && innerContent.trim()) {
      codeContent = codeContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    
    const html = `
<div class="collapsable-code"${codelinkAttr}>
  <input id="${id}" type="checkbox" ${isCollapsed ? 'checked' : ''} />
  <label for="${id}">
    <span class="collapsable-code__language">${params.language.toUpperCase()}</span>
    <span class="collapsable-code__title">${title ?? ''}</span>
    <span class="collapsable-code__toggle" data-label-expand="${expand}" data-label-collapse="${collapse}"></span>
  </label>
  <pre class="language-${params.language}"><code id="code${id}">${codeContent}</code></pre>
</div>`;
    return html;
  });
  
  return processedContent;
}
