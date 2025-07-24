import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root, Paragraph, Text } from 'mdast';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * remarkSpoiler
 *
 * A remark plugin that converts Hugo-style spoiler short-codes into
 * final HTML blocks (Hugo look-and-feel) _during build time_.
 *
 * Supported forms:
 * 1. {{< spoiler text="Title" >}}Hidden **markdown**{{< /spoiler >}}
 * 2. {{% spoiler %}}Hidden **markdown**{{% /spoiler %}}
 *
 * Both `text="…"` and body support markdown which is fully rendered.
 */
const remarkSpoiler: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'paragraph', (node, index, parent) => {
    const paragraph = node as Paragraph;
    if (!paragraph.children || paragraph.children.length === 0) return;

    // Collect raw text of paragraph
    const raw = paragraph.children
      .filter((c) => (c as Text).value !== undefined)
      .map((c) => (c as Text).value)
      .join('');

    const fullRegex = /\{\{<\s*spoiler\s+text="([^"]*)"\s*>\}\}([\s\S]*?)\{\{<\s*\/spoiler\s*>\}\}/;
    const shortRegex = /\{\{%\s*spoiler\s*%\}\}([\s\S]*?)\{\{%\s*\/spoiler\s*%\}\}/;

    let titleMarkdown = 'click to show';
    let bodyMarkdown = '';
    let matched = false;

    const fullMatch = raw.match(fullRegex);
    if (fullMatch) {
      matched = true;
      titleMarkdown = fullMatch[1].trim();
      bodyMarkdown = fullMatch[2].trim();
    } else {
      const shortMatch = raw.match(shortRegex);
      if (shortMatch) {
        matched = true;
        bodyMarkdown = shortMatch[1].trim();
      }
    }

    if (!matched) return;

    // Render markdown fragments to HTML strings
    const renderMd = (md: string) => {
      return remark().use(html).processSync(md).toString();
    };

    const titleHtml = renderMd(titleMarkdown).replace(/<p>|<\/p>/g, ''); // strip wrapping p
    const contentHtml = renderMd(bodyMarkdown);

    const spoilerHtml = `\n<div class="spoiler panel panel-default">\n  <div class="spoiler_block">\n    <a href="#" class="spoiler-block-icon spoiler-block-icon-zoom-in spoiler_block_show">${titleHtml}</a>\n    <a href="#" class="spoiler-block-icon spoiler-block-icon-zoom-out spoiler_block_hide" style="display:none;">click to hide</a>\n    <div class="spoiler_block_content" style="display:none;">${contentHtml}</div>\n  </div>\n</div>\n`;

    parent!.children.splice(index!, 1, {
      type: 'html',
      value: spoilerHtml,
    } as { type: 'html'; value: string });
  });
};

export default remarkSpoiler;
