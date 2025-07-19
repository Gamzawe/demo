#!/bin/bash

# Example deployment script for different platforms
# This script shows how to set up environment variables for deployment

echo "🚀 Deployment Setup Guide"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the demo directory"
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🌐 Deployment Platform Setup"
echo "============================"

echo ""
echo "1️⃣ Vercel Deployment:"
echo "   - Create vercel.json in your project root:"
echo "   {"
echo "     \"buildCommand\": \"npm run build\","
echo "     \"outputDirectory\": \"dist\","
echo "     \"installCommand\": \"npm install\""
echo "   }"
echo ""
echo "   - Set environment variables in Vercel dashboard:"
echo "   VITE_API_BASE_URL=https://localhost:7299"
echo "   VITE_API_TIMEOUT=15000"
echo "   VITE_ENVIRONMENT=production"

echo ""
echo "2️⃣ Netlify Deployment:"
echo "   - Create netlify.toml in your project root:"
echo "   [build]"
echo "     command = \"npm run build\""
echo "     publish = \"dist\""
echo ""
echo "   - Set environment variables in Netlify dashboard:"
echo "   VITE_API_BASE_URL=https://localhost:7299"
echo "   VITE_API_TIMEOUT=15000"
echo "   VITE_ENVIRONMENT=production"

echo ""
echo "3️⃣ GitHub Pages Deployment:"
echo "   - Add to package.json:"
echo "   \"homepage\": \"https://yourusername.github.io/your-repo-name\""
echo "   \"scripts\": {"
echo "     \"predeploy\": \"npm run build\","
echo "     \"deploy\": \"gh-pages -d dist\""
echo "   }"
echo ""
echo "   - Install gh-pages: npm install --save-dev gh-pages"
echo "   - Run: npm run deploy"

echo ""
echo "4️⃣ Docker Deployment:"
echo "   - Create Dockerfile:"
echo "   FROM nginx:alpine"
echo "   COPY dist /usr/share/nginx/html"
echo "   EXPOSE 80"
echo "   CMD [\"nginx\", \"-g\", \"daemon off;\"]"
echo ""
echo "   - Build and run:"
echo "   docker build -t react-app ."
echo "   docker run -p 80:80 react-app"

echo ""
echo "🔧 Environment Variables Summary:"
echo "================================"
echo "VITE_API_BASE_URL=https://localhost:7299"
echo "VITE_API_TIMEOUT=15000"
echo "VITE_ENVIRONMENT=production"

echo ""
echo "⚠️  Important Notes:"
echo "==================="
echo "1. Update CORS origins in your backend with your actual domain"
echo "2. Ensure your backend is running and accessible"
echo "3. Test the connection from the deployed frontend"
echo "4. Check browser console for any CORS or connection errors"

echo ""
echo "✅ Setup complete! Your app is ready for deployment." 