#!/bin/sh
# Commit our current changes first
git add .
git commit -m "Add legal and trust compliance pages"
# Pull latest changes
git fetch origin main
git rebase origin/main