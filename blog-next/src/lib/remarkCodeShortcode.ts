import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

interface ParentNode extends Node {
  children: Node[];
}

interface HtmlNode extends Node {
  type: 'html';
  value: string;
}

interface Replacement {
  start: number;
  end: number;
  replacement: string;
}

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
  // Also handle single quotes and unquoted values
  const paramRegex = /(\w+)=(["']?)([^\s"']+)\2/g;
  let match;
  
  while ((match = paramRegex.exec(content)) !== null) {
    const [, key, , value] = match;
    params[key as keyof CodeShortcodeParams] = value;
  }
  
  return params;
}

function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function remarkCodeShortcode() {
  return (tree: Node) => {
    visit(tree, 'text', (node: TextNode, index: number | null, parent: ParentNode | null) => {
      if (!node.value || typeof node.value !== 'string') return;
      
      // Debug: Check if we have code shortcodes
      if (node.value.includes('{{< code')) {
        console.log('Found code shortcode in text node:', node.value.substring(0, 200));
      }
      
      // Match Hugo-style code shortcodes - more flexible pattern
      const shortcodeRegex = /\{\{<\s*code\s+([^>]+?)\s*>\}\}([\s\S]*?)\{\{<\s*\/code\s*>\}\}/g;
      let match;
      const replacements: Replacement[] = [];
      
      while ((match = shortcodeRegex.exec(node.value)) !== null) {
        const [fullMatch, paramString, innerContent] = match;
        const params = parseShortcodeParams(paramString);
        
        if (!params.language) {
          console.warn('Code shortcode missing required "language" parameter');
          continue;
        }
        
        const id = params.id || generateRandomId();
        const title = params.title || '';
        const expand = params.expand || '△';
        const collapse = params.collapse || '▽';
        const isCollapsed = params.isCollapsed === 'true';
        const codelink = params.codelink;
        
        // Generate HTML structure matching Hugo template
        let html = `
<div class="collapsable-code">
  <input id="${id}" type="checkbox" ${isCollapsed ? 'checked' : ''} />
  <label for="${id}">
    <span class="collapsable-code__language">${params.language.toUpperCase()}</span>
    ${title ? `<span class="collapsable-code__title">${title}</span>` : ''}
    <span class="collapsable-code__toggle" data-label-expand="${expand}" data-label-collapse="${collapse}"></span>
  </label>
  <pre class="language-${params.language}"><code id="code${id}">${innerContent.trim()}</code></pre>
</div>`;
        
        // Add script for codelink if provided
        if (codelink) {
          html += `
<script type="text/javascript">
  (function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '${codelink}', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var codeElement = document.getElementById('code${id}');
        if (codeElement) {
          codeElement.textContent = '\\n' + xhr.responseText;
          // Re-run Prism highlighting if available
          if (window.Prism && window.Prism.highlightElement) {
            window.Prism.highlightElement(codeElement);
          }
        }
      }
    };
    xhr.send();
  })();
</script>`;
        }
        
        replacements.push({
          start: match.index,
          end: match.index + fullMatch.length,
          replacement: html
        });
      }
      
      // Apply replacements in reverse order to maintain indices
      if (replacements.length > 0) {
        let newValue = node.value;
        replacements.reverse().forEach(({ start, end, replacement }) => {
          newValue = newValue.slice(0, start) + replacement + newValue.slice(end);
        });
        
        // Replace the text node with an HTML node
        const htmlNode: HtmlNode = {
          type: 'html',
          value: newValue
        };
        
        if (parent && typeof index === 'number') {
          parent.children[index] = htmlNode;
        }
      }
    });
  };
}
