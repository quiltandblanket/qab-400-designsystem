#!/bin/bash

# Git Commit and Push Script with Enhanced Staging and User Confirmations
# This script provides interactive staging options, better change preview, and user confirmations
# Created with Cline

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to read version from file
get_version() {
    if [ ! -f "VERSION" ]; then
        echo -e "${RED}Error: 'VERSION' file not found${NC}"
        exit 1
    fi
    cat VERSION | tr -d '\n'
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

# Function to show menu and get user choice
show_menu() {
    local prompt="$1"
    shift
    local options=("$@")
    
    echo -e "${CYAN}$prompt${NC}"
    for i in "${!options[@]}"; do
        echo "  $((i+1)). ${options[$i]}"
    done
    
    local choice
    while true; do
        read -p "Enter choice [1-${#options[@]}]: " choice
        if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "${#options[@]}" ]; then
            return $((choice-1))
        else
            echo "Invalid choice. Please enter a number between 1 and ${#options[@]}."
        fi
    done
}

echo -e "${GREEN}=== Git Commit and Push Script ===${NC}"
echo ""

# Check if there are any changes at all
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo -e "${YELLOW}No changes detected in working directory${NC}"
    exit 0
fi

# Show current status
echo -e "${BLUE}Current repository status:${NC}"
git status --short
echo ""

# Ask user how to stage changes
options=(
    "Stage all changes (git add -A)"
    "Interactive staging (git add -i)"
    "Patch mode - review each change (git add -p)"
    "Show diff and stage all"
    "Cancel"
)

show_menu "How would you like to stage changes?" "${options[@]}"
staging_choice=$?

case $staging_choice in
    0) # Stage all
        echo -e "${YELLOW}Staging all changes...${NC}"
        git add -A
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error: Failed to stage changes${NC}"
            exit 1
        fi
        ;;
    1) # Interactive
        echo -e "${YELLOW}Starting interactive staging...${NC}"
        git add -i
        ;;
    2) # Patch mode
        echo -e "${YELLOW}Starting patch mode staging...${NC}"
        git add -p
        ;;
    3) # Show diff then stage all
        echo -e "${YELLOW}Showing changes:${NC}"
        echo ""
        git diff
        echo ""
        if confirm "Stage all these changes?"; then
            git add -A
        else
            echo -e "${YELLOW}Staging cancelled${NC}"
            exit 0
        fi
        ;;
    4) # Cancel
        echo -e "${YELLOW}Operation cancelled${NC}"
        exit 0
        ;;
esac

# Check if there are changes staged
if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes staged for commit${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}=== Staged Changes Summary ===${NC}"
echo ""

# Show statistics
echo -e "${BLUE}Files changed:${NC}"
git diff --cached --stat
echo ""

# Show detailed file status
echo -e "${BLUE}Changes to be committed:${NC}"
git diff --cached --name-status
echo ""

# Get version for commit message
VERSION=$(get_version)
echo -e "${GREEN}Version: ${VERSION}${NC}"
echo -e "${GREEN}Commit message: See CHANGELOG.md for details${NC}"
echo ""

# Ask if user wants to see full diff
if confirm "Would you like to see the full diff before committing?"; then
    echo ""
    git diff --cached
    echo ""
fi

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
    
    # Show commit details
    echo -e "${BLUE}Commit details:${NC}"
    git log -1 --stat
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
        echo -e "${YELLOW}Push aborted. Commit saved locally.${NC}"
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
