#!/bin/bash

# FlowAI Git Hooks Setup Script
# Installs and configures Git hooks for code quality

echo "🤖 FlowAI Git Agent: Setting up Git hooks..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy hooks from .githooks to .git/hooks
print_info "Installing Git hooks..."

if [ -f ".githooks/pre-commit" ]; then
    cp .githooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    print_success "Pre-commit hook installed"
else
    print_warning "Pre-commit hook not found in .githooks/"
fi

if [ -f ".githooks/commit-msg" ]; then
    cp .githooks/commit-msg .git/hooks/commit-msg
    chmod +x .git/hooks/commit-msg
    print_success "Commit message hook installed"
else
    print_warning "Commit message hook not found in .githooks/"
fi

# Set up package.json scripts if they don't exist
print_info "Checking package.json scripts..."

if [ -f "package.json" ]; then
    # Check if lint script exists
    if ! grep -q '"lint"' package.json; then
        print_warning "No lint script found in package.json"
        print_info "Consider adding: \"lint\": \"turbo run lint\""
    fi
    
    # Check if format script exists
    if ! grep -q '"format"' package.json; then
        print_warning "No format script found in package.json"
        print_info "Consider adding: \"format\": \"prettier --write .\""
    fi
    
    # Check if test script exists
    if ! grep -q '"test"' package.json; then
        print_warning "No test script found in package.json"
        print_info "Consider adding: \"test\": \"turbo run test\""
    fi
fi

# Create .gitignore entries for common files
print_info "Updating .gitignore..."

GITIGNORE_ENTRIES=(
    "# Development files"
    "*.log"
    ".env"
    ".env.local"
    ".env.*.local"
    "*.tmp"
    "*.temp"
    ""
    "# IDE files"
    ".vscode/settings.json"
    ".idea/"
    "*.swp"
    "*.swo"
    ""
    "# OS files"
    ".DS_Store"
    "Thumbs.db"
    ""
    "# Security"
    "*.key"
    "*.pem"
    "*.p12"
    "*.pfx"
    "id_rsa"
    "id_dsa"
    "*.secret"
)

# Add entries to .gitignore if they don't exist
for entry in "${GITIGNORE_ENTRIES[@]}"; do
    if [ ! -z "$entry" ] && ! grep -Fxq "$entry" .gitignore 2>/dev/null; then
        echo "$entry" >> .gitignore
    fi
done

print_success ".gitignore updated"

# Create pre-push hook for additional checks
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

echo "🤖 FlowAI Git Agent: Running pre-push checks..."

# Run tests if available
if grep -q '"test"' package.json; then
    echo "Running tests..."
    if ! npm test; then
        echo "❌ Tests failed! Push aborted."
        exit 1
    fi
    echo "✅ Tests passed"
fi

# Check for large files being pushed
LARGE_FILES=$(git diff --name-only HEAD~1 HEAD | xargs -I {} find {} -type f -size +10M 2>/dev/null || true)
if [ ! -z "$LARGE_FILES" ]; then
    echo "⚠️  Large files detected (>10MB):"
    echo "$LARGE_FILES"
    echo "Consider using Git LFS for large files"
    read -p "Continue with push? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Pre-push checks passed"
exit 0
EOF

chmod +x .git/hooks/pre-push
print_success "Pre-push hook installed"

# Setup complete
echo ""
print_success "Git hooks setup complete!"
echo ""
print_info "Installed hooks:"
echo "  • pre-commit: Code quality, linting, formatting checks"
echo "  • commit-msg: Commit message format validation"
echo "  • pre-push: Tests and large file checks"
echo ""
print_info "To disable hooks temporarily:"
echo "  git commit --no-verify"
echo "  git push --no-verify"
echo ""
print_info "To reinstall hooks after updates:"
echo "  ./githooks/setup-hooks.sh"

exit 0