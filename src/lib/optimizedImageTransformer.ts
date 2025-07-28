import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface ImageNode extends Node {
  type: 'image';
  url: string;
  alt?: string;
  title?: string;
  data?: {
    hProperties?: {
      width?: number;
      height?: number;
      className?: string;
      loading?: 'lazy' | 'eager';
      priority?: boolean;
    };
  };
}

interface HtmlNode extends Node {
  type: 'html';
  value: string;
}

// Regular expression to extract image dimensions from alt text or URL
// Format: ![alt text {width=300 height=200}](image.jpg) or ![alt text](image.jpg {width=300 height=200})
const dimensionRegex = /\{(?:width=(\d+))?(?:\s*height=(\d+))?(?:\s*priority=(true|false))?(?:\s*caption=["']([^"']*)["'])?\}/;

export function optimizedImageTransformer() {
  return (tree: Node) => {
    visit(tree, 'image', (node: ImageNode) => {
      let width: number | undefined;
      let height: number | undefined;
      let priority = false;
      let caption: string | undefined;
      let alt = node.alt || '';
      let url = node.url;
      
      // Check for dimensions in alt text
      const altMatch = alt.match(dimensionRegex);
      if (altMatch) {
        // Remove the dimension part from alt text
        alt = alt.replace(dimensionRegex, '').trim();
        
        // Extract dimensions
        width = altMatch[1] ? parseInt(altMatch[1], 10) : undefined;
        height = altMatch[2] ? parseInt(altMatch[2], 10) : undefined;
        priority = altMatch[3] === 'true';
        caption = altMatch[4];
      }
      
      // Check for dimensions in URL
      const urlMatch = url.match(dimensionRegex);
      if (urlMatch) {
        // Remove the dimension part from URL
        url = url.replace(dimensionRegex, '').trim();
        
        // Extract dimensions (only if not already set from alt)
        width = width || (urlMatch[1] ? parseInt(urlMatch[1], 10) : undefined);
        height = height || (urlMatch[2] ? parseInt(urlMatch[2], 10) : undefined);
        priority = priority || urlMatch[3] === 'true';
        caption = caption || urlMatch[4];
      }
      
      // Create JSX-style component string
      const jsxString = `<OptimizedImage 
  src="${url}" 
  alt="${alt.replace(/"/g, '&quot;')}"
  ${width ? `width={${width}}` : ''} 
  ${height ? `height={${height}}` : ''}
  ${priority ? 'priority={true}' : ''}
  ${caption ? `caption="${caption.replace(/"/g, '&quot;')}"` : ''}
/>`;
      
      // Replace the image node with an HTML node containing our component
      const htmlNode: HtmlNode = {
        type: 'html',
        value: jsxString,
        position: node.position,
      };
      
      Object.assign(node, htmlNode);
    });
  };
}
