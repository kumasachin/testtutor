#!/bin/bash

# ExamKit Development Setup Script
# Automates the complete setup process for development

set -e  # Exit on any error

echo "🚀 ExamKit Development Setup"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning "No .env file found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file"
        print_warning "Please update .env with your actual database credentials"
    else
        print_error ".env.example not found!"
        exit 1
    fi
else
    print_success ".env file exists"
fi

# Check if DATABASE_URL is configured
if grep -q "postgresql://username:password" .env; then
    print_warning "DATABASE_URL appears to be using default values"
    print_warning "Please update DATABASE_URL in .env before continuing"
    
    echo
    echo "Options:"
    echo "1. Set up local PostgreSQL database"
    echo "2. Use Supabase (recommended for quick start)"
    echo "3. Continue anyway (might fail)"
    read -p "Choose option (1-3): " choice
    
    case $choice in
        1)
            print_status "Setting up local PostgreSQL..."
            echo "Please ensure PostgreSQL is installed and running"
            echo "Create a database called 'examkit_db' and update .env"
            read -p "Press Enter when ready to continue..."
            ;;
        2)
            print_status "For Supabase setup:"
            echo "1. Go to https://supabase.com"
            echo "2. Create a new project"
            echo "3. Go to Settings > Database"
            echo "4. Copy the connection string to DATABASE_URL in .env"
            echo "5. Also update SUPABASE_* variables in .env"
            read -p "Press Enter when ready to continue..."
            ;;
        3)
            print_warning "Continuing with default configuration..."
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate
print_success "Prisma client generated"

# Run database migrations
print_status "Running database migrations..."
if npx prisma migrate dev --name init; then
    print_success "Database migrations completed"
else
    print_error "Database migration failed"
    print_warning "This might be due to incorrect DATABASE_URL"
    print_warning "Please check your database configuration and try again"
    exit 1
fi

# Seed domains
print_status "Seeding initial domains..."
if npx tsx scripts/seed-domains.ts; then
    print_success "Domains seeded successfully"
else
    print_warning "Domain seeding failed, but continuing..."
fi

# Import sample data
print_status "Importing sample test data..."
if npx tsx scripts/import-questions.ts ./data/; then
    print_success "Sample data imported successfully"
else
    print_warning "Sample data import failed, but continuing..."
fi

# Build the application
print_status "Building application..."
if npm run build; then
    print_success "Application built successfully"
else
    print_error "Build failed"
    exit 1
fi

echo
echo "🎉 Setup Complete!"
echo "=================="
echo
print_success "ExamKit is ready for development!"
echo
echo "Next steps:"
echo "1. Start development server: npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Check admin dashboard: http://localhost:3000/admin"
echo "4. View Prisma Studio: npx prisma studio"
echo
echo "Available domains:"
echo "• Life in UK: http://localhost:3000/lifeInUk"
echo "• Driving Theory: http://localhost:3000/drivingTheory"
echo
print_status "Happy coding! 🚀"
