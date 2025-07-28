# MathBugs Blog

A modern blog built with Next.js 15, featuring mathematics content, programming tutorials, and more. This project includes PWA capabilities, RSS feed generation, and Docker support.

## 🚀 Features

- **Next.js 15** with Turbopack for fast development
- **TypeScript** for type safety
- **Material-UI** for modern UI components
- **PWA Support** with service worker and offline capabilities
- **RSS Feed** automatically generated from posts
- **Syntax Highlighting** with Prism and Shiki
- **Math Rendering** with KaTeX
- **Docker Support** for containerized deployment
- **SEO Optimized** with proper meta tags and structured data

## 📋 Prerequisites

- **Node.js 22** or higher
- **npm 10** or higher
- **Docker** (optional, for containerized deployment)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blog
```

### 2. Switch to Node.js 22

If you're using nvm:

```bash
nvm use 22
# or install if not available
nvm install 22
nvm use 22
```

Verify your Node.js version:

```bash
node --version  # Should show v22.x.x
npm --version   # Should show v10.x.x or higher
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000

### 5. Available Scripts

```bash
# Development server with RSS generation
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate RSS feed only
npm run generate-rss

# Lint code
npm run lint

# Export static site
npm run export
```

## 🐳 Docker Development

### Prerequisites

1. **Install Docker**: Make sure Docker is installed and running
2. **Start Docker daemon**:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker  # Enable on boot
   ```

3. **Add user to docker group** (optional, to avoid using sudo):
   ```bash
   sudo usermod -aG docker $USER
   # Log out and back in for changes to take effect
   ```

### Using Docker Compose (Recommended)

1. **Build and run production container**:
   ```bash
   docker compose up --build
   ```

2. **Run in background**:
   ```bash
   docker compose up --build -d
   ```

3. **Development mode with hot reload**:
   ```bash
   docker compose --profile dev up blog-dev --build
   ```

4. **View logs**:
   ```bash
   docker compose logs -f
   ```

5. **Stop containers**:
   ```bash
   docker compose down
   ```

### Using Docker Commands Directly

1. **Build production image**:
   ```bash
   docker build -t mathbugs-blog .
   ```

2. **Run production container**:
   ```bash
   docker run -p 3000:3000 --name mathbugs-blog-container mathbugs-blog
   ```

3. **Build development image**:
   ```bash
   docker build -f Dockerfile.dev -t mathbugs-blog-dev .
   ```

4. **Run development container with volume mounting**:
   ```bash
   docker run -p 3001:3000 \
     -v $(pwd):/app \
     -v /app/node_modules \
     -v /app/.next \
     --name mathbugs-blog-dev-container \
     mathbugs-blog-dev
   ```

## 🚀 Deployment Options

### 1. Vercel (Recommended for Next.js)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Production deployment**:
   ```bash
   vercel --prod
   ```

### 2. Docker Production Deployment

1. **Build production image**:
   ```bash
   docker build -t mathbugs-blog:latest .
   ```

2. **Run with environment variables**:
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name mathbugs-blog \
     --restart unless-stopped \
     -e NODE_ENV=production \
     mathbugs-blog:latest
   ```

3. **Using docker-compose for production**:
   ```bash
   docker compose -f docker-compose.yml up -d
   ```

### 3. Traditional VPS/Server Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start with PM2** (process manager):
   ```bash
   npm install -g pm2
   pm2 start npm --name "mathbugs-blog" -- start
   pm2 save
   pm2 startup
   ```

3. **Using systemd service**:
   Create `/etc/systemd/system/mathbugs-blog.service`:
   ```ini
   [Unit]
   Description=MathBugs Blog
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/path/to/blog
   ExecStart=/usr/bin/npm start
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start:
   ```bash
   sudo systemctl enable mathbugs-blog
   sudo systemctl start mathbugs-blog
   ```

### 4. Static Export Deployment

For static hosting (GitHub Pages, Netlify, etc.):

1. **Update next.config.ts** for static export:
   ```typescript
   const nextConfig: NextConfig = {
     reactStrictMode: true,
     output: "export",
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Build and export**:
   ```bash
   npm run build
   npm run export
   ```

3. **Deploy the `out/` directory** to your static hosting provider.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# Add your custom environment variables here
```

### Customization

- **Posts**: Add markdown files to the `posts/` directory
- **Styling**: Modify CSS files in `src/styles/`
- **Components**: Edit React components in `src/components/`
- **Configuration**: Update `next.config.ts` for build settings

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── pages/          # Next.js pages
│   ├── styles/         # CSS styles
│   └── lib/            # Utility functions
├── posts/              # Blog posts (Markdown)
├── scripts/            # Build scripts
├── Dockerfile          # Production Docker image
├── Dockerfile.dev      # Development Docker image
├── docker-compose.yml  # Docker Compose configuration
└── next.config.ts      # Next.js configuration
```

## 🐛 Troubleshooting

### Common Issues

1. **Docker daemon not running**:
   ```bash
   sudo systemctl start docker
   ```

2. **Permission denied for Docker**:
   ```bash
   sudo usermod -aG docker $USER
   # Log out and back in
   ```

3. **Node.js version mismatch**:
   ```bash
   nvm use 22
   ```

4. **Build failures**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Port already in use**:
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

### Docker Compose Version Warning

If you see warnings about `version` being obsolete, remove the first line from `docker-compose.yml`:

```yaml
# Remove this line:
version: '3.8'

# Keep this:
services:
  # ... rest of configuration
```

## 📝 License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy coding! 🚀**
