#!/bin/bash

# ExamKit Development Setup Script
echo "🚀 Setting up ExamKit development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# Database Configuration
# Replace with your actual Supabase or PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/examkit"

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# NextAuth Configuration (if using)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
EOL
    echo "⚠️  Please update .env.local with your actual database credentials"
fi

# Check if Prisma schema needs to be pushed
if command -v prisma &> /dev/null; then
    echo "🗄️  Setting up database schema..."
    echo "ℹ️  Run 'npx prisma migrate dev' once you've configured your database"
else
    echo "⚠️  Prisma CLI not found. Install with: npm install -g prisma"
fi

echo ""
echo "🎉 Setup complete! Here's what you can do next:"
echo ""
echo "1. Configure your database in .env.local"
echo "2. Run database migrations: npx prisma migrate dev"
echo "3. Start development server: npm run dev"
echo "4. Visit http://localhost:3000"
echo ""
echo "📚 Useful commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run start        - Start production server"
echo "  npx prisma studio    - Open database admin UI"
echo ""
echo "🌟 ExamKit is ready to go!"
