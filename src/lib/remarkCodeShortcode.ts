import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

interface ParentNode extends Node {
  children: Node[];
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
      if (!node.value || typeof node.value !== 'string' || !node.value.includes('{{< code')) return;
      
      const shortcodeRegex = /\{\{<\s*code\s+([^>]+?)\s*>\}\}([\s\S]*?)\{\{<\s*\/code\s*>\}\}/g;
      let match;
      const parts: string[] = [];
      let lastIndex = 0;
      
      while ((match = shortcodeRegex.exec(node.value)) !== null) {
        const [fullMatch, paramString, innerContent] = match;
        const params = parseShortcodeParams(paramString);
        
        if (!params.language) continue;
        
        const id = params.id || generateRandomId();
        const title = params.title || '';
        const expand = params.expand || '△';
        const collapse = params.collapse || '▽';
        const isCollapsed = params.isCollapsed === 'true';
        const codelink = params.codelink;
        
        // Push text before the match
        if (match.index > lastIndex) {
          parts.push(node.value.substring(lastIndex, match.index));
        }
        
        // Generate HTML for the code block
        parts.push(`
<div class="collapsable-code">
  <input id="${id}" type="checkbox" ${isCollapsed ? 'checked' : ''} />
  <label for="${id}">
    <span class="collapsable-code__language">${params.language.toUpperCase()}</span>
    ${title ? `<span class="collapsable-code__title">${title}</span>` : ''}
    <span class="collapsable-code__toggle" data-label-expand="${expand}" data-label-collapse="${collapse}"></span>
  </label>
  <pre class="language-${params.language}"><code id="code${id}">${innerContent.trim()}</code></pre>
  ${codelink ? `
  <script type="text/javascript">
    (function() {
      const codeId = 'code${id}';
      const codeBlock = document.getElementById(codeId);
      if (codeBlock) {
        fetch('${codelink}')
          .then(response => response.text())
          .then(code => {
            codeBlock.textContent = code.trim();
            if (window.Prism) {
              Prism.highlightElement(codeBlock);
            }
          })
          .catch(console.error);
      }
    })();
  </script>` : ''}
</div>`);
        
        lastIndex = match.index + fullMatch.length;
      }
      
      // Push remaining text after last match
      if (lastIndex < node.value.length) {
        parts.push(node.value.substring(lastIndex));
      }
      
      // Replace the node with processed content
      if (parts.length > 0) {
        const newNode: TextNode = {
          type: 'text',
          value: parts.join('')
        };
        
        if (parent && index !== null) {
          parent.children[index] = newNode;
        }
      }
    });
  };
}
