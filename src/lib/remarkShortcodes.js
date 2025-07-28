/**
 * Custom remark plugin to handle Hugo-style shortcodes in Markdown
 */
module.exports = function remarkShortcodes() {
  return (tree) => {
    // Process the Markdown AST to find and transform shortcodes
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;
      
      // Check for shortcode patterns in text nodes
      const shortcodeRegex = /\{\{<\s*spoiler\s+text="([^"]*)"\s*>\}\}([\s\S]*?)\{\{<\s*\/spoiler\s*>\}\}/g;
      const spoilerRegex = /\{\{%\s*spoiler\s*\}\}([\s\S]*?)\{\{%\s*\/spoiler\s*\}\}/g;
      
      // Convert the paragraph's content to a string to check for shortcodes
      let content = '';
      node.children.forEach(child => {
        if (child.type === 'text') {
          content += child.value;
        }
      });
      
      // Check if the paragraph contains a shortcode
      if (shortcodeRegex.test(content) || spoilerRegex.test(content)) {
        // Replace with a custom mdx node
        const newNode = {
          type: 'html',
          value: content
            .replace(shortcodeRegex, '<Spoiler text="$1">$2</Spoiler>')
            .replace(spoilerRegex, '<Spoiler text="Spoiler">$1</Spoiler>')
        };
        
        parent.children.splice(index, 1, newNode);
        return [SKIP, index];
      }
    });
  };
};

// Import the visit utility
const { visit } = require('unist-util-visit');
const { SKIP } = require('unist-util-visit');
