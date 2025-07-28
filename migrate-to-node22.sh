#!/bin/bash

echo "🚀 Migrating to Node.js 22..."

# Switch to Node.js 22
echo "📦 Switching to Node.js 22..."
nvm use 22

# Check Node version
echo "✅ Current Node.js version:"
node --version

# Check npm version
echo "✅ Current npm version:"
npm --version

# Clean install dependencies
echo "🧹 Cleaning node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "📥 Installing dependencies with Node.js 22..."
npm install

# Test build
echo "🏗️ Testing build with Node.js 22..."
npm run build

echo "✅ Migration to Node.js 22 complete!"
echo "🐳 Docker images have been updated to use Node.js 22"
echo "📋 package.json has been updated with Node.js 22 engine requirement"
