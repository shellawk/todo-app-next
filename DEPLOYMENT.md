# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: GitHub, GitLab, or Bitbucket account
3. **MongoDB Atlas**: Free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/todo-app.git
   git push -u origin main