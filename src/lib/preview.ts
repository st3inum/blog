interface PreviewOptions {
  preserveMath?: boolean;
}

const codeShortcodeBlock = /\{\{[<%]\s*code\b[\s\S]*?[>%]\}\}[\s\S]*?\{\{[<%]\s*\/code\s*[>%]\}\}/gi;
const spoilerShortcodeBlock = /\{\{[<%]\s*spoiler\b[\s\S]*?[>%]\}\}[\s\S]*?\{\{[<%]\s*\/spoiler\s*[>%]\}\}/gi;
const shortcode = /\{\{[<%][\s\S]*?[>%]\}\}/g;

export function cleanMarkdownPreview(text: string, options: PreviewOptions = {}): string {
  let clean = text
    .replace(codeShortcodeBlock, ' [code block] ')
    .replace(spoilerShortcodeBlock, ' ')
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, ' [code block] ')
    .replace(shortcode, '')
    .replace(/<[^>]*>/g, '');

  if (!options.preserveMath) {
    clean = clean
      .replace(/\$\$[\s\S]*?\$\$/g, '[mathematical expression]')
      .replace(/\$[^$\n]*\$/g, '[math]')
      .replace(/\\\([\s\S]*?\\\)/g, '[mathematical expression]')
      .replace(/\\\[[\s\S]*?\\\]/g, '[mathematical expression]')
      .replace(/\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}/g, '[mathematical expression]')
      .replace(/\\[a-zA-Z]+\{[^}]*\}/g, '[math notation]')
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/\[math\]\s*\[math\]/g, '[mathematical expressions]')
      .replace(/\[mathematical expression\]\s*\[mathematical expression\]/g, '[mathematical expressions]');
  }

  return clean
    .replace(/\n\s*\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncatePreview(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
}

export function firstSentencePreview(text: string, maxLength: number): string {
  const clean = cleanMarkdownPreview(text);
  const sentences = clean.split(/[.!?]+/);

  if (sentences.length > 0 && sentences[0].length > 20) {
    return truncatePreview(`${sentences[0].trim()}${sentences.length > 1 ? '.' : ''}`, maxLength);
  }

  return truncatePreview(clean, maxLength);
}
