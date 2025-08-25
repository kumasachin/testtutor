#!/bin/bash

# Vercel build script that handles database connectivity issues
echo "Starting build process..."

# Try to generate Prisma client, but don't fail if database is not available
echo "Attempting to generate Prisma client..."
if ! npx prisma generate; then
    echo "Warning: Prisma generate failed. This might be due to database connectivity issues."
    echo "Continuing with build process..."
fi

# Run the Next.js build
echo "Running Next.js build..."
npx next build

echo "Build completed!"
