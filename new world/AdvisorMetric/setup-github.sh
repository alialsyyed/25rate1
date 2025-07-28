#!/bin/bash
# Script to set up GitHub repository for Feedback Collection Application

echo "Setting up GitHub repository for Feedback Collection Application..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Add all files to git
echo "Adding files to Git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Bilingual feedback collection application

- Modern React frontend with TypeScript
- Express.js backend with REST API
- PostgreSQL database with Drizzle ORM
- Bilingual support (Arabic RTL and English LTR)
- Analytics dashboard with real-time charts
- CSV export functionality
- shadcn/ui components with Tailwind CSS
- Full type safety across the stack"

echo "Repository setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Copy the repository URL"
echo "3. Run the following commands:"
echo ""
echo "   git remote add origin <your-github-repo-url>"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Example:"
echo "   git remote add origin https://github.com/yourusername/feedback-collection-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"