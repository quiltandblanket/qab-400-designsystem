#!/bin/bash

# Git Commit and Push Script with User Confirmations
# This script stages all changes, commits with version from file, and pushes with user confirmations
# Created with Cline

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to read version from file
get_version() {
    if [ ! -f "version" ]; then
        echo -e "${RED}Error: 'version' file not found${NC}"
        exit 1
    fi
    cat version | tr -d '\n'
}

# Function to prompt user for confirmation
confirm() {
    local prompt="$1"
    local response
    while true; do
        read -p "$prompt (y/n): " response
        case "$response" in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer y or n.";;
        esac
    done
}

echo -e "${GREEN}=== Git Commit and Push Script ===${NC}"
echo ""

# Stage all changes
echo -e "${YELLOW}Staging all changes...${NC}"
git add -A

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to stage changes${NC}"
    exit 1
fi

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
    exit 0
fi

# Get version for commit message
VERSION=$(get_version)
echo -e "${GREEN}Version from file: ${VERSION}${NC}"
echo -e "${GREEN}Commit description: See CHANGELOG.md for details${NC}"
echo ""

# Show what will be committed
echo -e "${YELLOW}Changes to be committed:${NC}"
git status --short --cached
echo ""

# Prompt for commit confirmation
if confirm "Proceed with commit?"; then
    echo -e "${YELLOW}Committing changes...${NC}"
    git commit -m "$VERSION" -m "See CHANGELOG.md for details"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Commit failed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Commit successful!${NC}"
    echo ""
    
    # Prompt for push confirmation
    if confirm "Proceed with push?"; then
        echo -e "${YELLOW}Pushing to remote...${NC}"
        git push
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error: Push failed${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}Push successful!${NC}"
    else
        echo -e "${YELLOW}Push aborted${NC}"
        exit 0
    fi
else
    echo -e "${YELLOW}Commit aborted${NC}"
    # Unstage changes
    git reset HEAD
    exit 0
fi

echo ""
echo -e "${GREEN}=== Operation Complete ===${NC}"
