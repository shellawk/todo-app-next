// vercel-build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

// Create production .env.local if it doesn't exist
if (!fs.existsSync('.env.local') && process.env.MONGODB_URI) {
  console.log('📝 Creating .env.local from Vercel environment variables...');
  fs.writeFileSync('.env.local', `MONGODB_URI=${process.env.MONGODB_URI}\n`);
}

try {
  // Run Next.js build
  console.log('🔨 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('📊 Next.js output directory: .next');
  
  // Verify build output
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('✅ .next directory exists');
    
    const buildManifest = path.join(nextDir, 'BUILD_ID');
    if (fs.existsSync(buildManifest)) {
      console.log('✅ Build manifest exists');
    }
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}