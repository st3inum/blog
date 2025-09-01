/**
 * Clean Dependencies Script
 * 
 * This script helps identify and clean up unnecessary dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning up unnecessary dependencies...');

// Step 1: Run npm prune to remove packages not listed in package.json
try {
  console.log('\n📦 Pruning extraneous packages...');
  execSync('npm prune', { stdio: 'inherit' });
  console.log('✅ Pruning completed');
} catch (error) {
  console.error('❌ Error during pruning:', error.message);
}

// Step 2: Clean npm cache
try {
  console.log('\n🗑️  Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Cache cleaned');
} catch (error) {
  console.error('❌ Error cleaning cache:', error.message);
}

// Step 3: Deduplicate dependencies
try {
  console.log('\n🔄 Deduplicating dependencies...');
  execSync('npm dedupe', { stdio: 'inherit' });
  console.log('✅ Deduplication completed');
} catch (error) {
  console.error('❌ Error during deduplication:', error.message);
}

console.log('\n✨ Dependency cleanup completed!');
console.log('\nIf you want to do a full reinstall, run:');
console.log('  rm -rf node_modules package-lock.json');
console.log('  npm install');
