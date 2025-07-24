// convert-frontmatter.js
const fs = require("fs");
const path = require("path");
const toml = require("@iarna/toml");
const yaml = require("js-yaml");

// CHANGE THESE TO YOUR ABSOLUTE PATHS
const oldDir = path.resolve(
  process.env.HOME,
  "Dropbox/blog/mathbugs.com/content/posts"
);
const newDir = path.resolve(process.env.HOME, "Dropbox/blog/blog-next/posts");

// Recursive function to process all .md files
function processFolder(currentPath, relativePath = "") {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const oldEntryPath = path.join(currentPath, entry.name);
    const relativeEntryPath = path.join(relativePath, entry.name);
    const newEntryPath = path.join(newDir, relativeEntryPath);

    if (entry.isDirectory()) {
      fs.mkdirSync(newEntryPath, { recursive: true });
      processFolder(oldEntryPath, relativeEntryPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const content = fs.readFileSync(oldEntryPath, "utf8");

      const match = content.match(/^\+{3}\n([\s\S]*?)\n\+{3}/);
      if (!match) {
        fs.writeFileSync(newEntryPath, content); // just copy as-is
        console.log(`Copied (no frontmatter): ${relativeEntryPath}`);
        return;
      }

      const tomlContent = match[1];
      let frontmatterData;
      try {
        frontmatterData = toml.parse(tomlContent);
      } catch (err) {
        console.error(
          `❌ Error parsing TOML in ${relativeEntryPath}:`,
          err.message
        );
        return;
      }

      // Convert to YAML
      let yamlString = yaml.dump(frontmatterData, { lineWidth: 120 });

      // Preserve original TOML comments (like # do not include @)
      const commentLines = tomlContent
        .split("\n")
        .filter((line) => line.trim().startsWith("#"));
      if (commentLines.length > 0) {
        yamlString = commentLines.join("\n") + "\n" + yamlString;
      }

      const newContent = content.replace(
        /^\+{3}[\s\S]*?\+{3}/,
        `---\n${yamlString.trim()}\n---`
      );

      fs.writeFileSync(newEntryPath, newContent);
      console.log(`✅ Converted: ${relativeEntryPath}`);
    }
  });
}

fs.mkdirSync(newDir, { recursive: true });
processFolder(oldDir);
console.log("\n✨ Done!");
