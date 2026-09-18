# Git Repository & Local Hosting Setup

## Part 1: Git Repository Setup

### Step 1: Install Git

**Windows:**
1. Download from: https://git-scm.com/download/win
2. Run installer
3. Select "Use Git from the command line"
4. Accept all defaults

**Verify Installation:**
```bash
git --version
# Should show: git version 2.40.0 (or similar)
```

### Step 2: Configure Git

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your@email.com"

# Verify configuration
git config --global --list
```

### Step 3: Initialize Local Git Repository

```bash
# Navigate to your project root
cd zaoga-project

# Initialize git
git init

# Create .gitignore file
```

**Create `.gitignore` in project root:**
```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment
.env
.env.local
.env.*.local

# Build/Output
.next/
dist/
build/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-workspace

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Backend specific
backend/logs/
backend/uploads/

# Database backups
*.bak
*.sql

# Test coverage
coverage/
.nyc_output/

# Misc
.env.*.local
.cache/
```

### Step 4: Add Files to Git

```bash
# Check status
git status

# Add all files
git add .

# Verify what will be committed
git status

# Make initial commit
git commit -m "Initial commit: Project setup with backend, website, and mobile structure"
```

### Step 5: Create GitHub Repository (Optional but Recommended)

**Option A: Create on GitHub.com**

1. Go to https://github.com/new
2. Sign in (or create account)
3. Fill in:
   - Repository name: `zaoga-fif`
   - Description: "ZAOGA FIF Mabelreign Kingdom District - Digital Ministry Platform"
   - Public or Private (choose based on preference)
   - DO NOT initialize with README, .gitignore, or license
4. Click "Create repository"

**Option B: Create on GitLab.com**

1. Go to https://gitlab.com/projects/new
2. Create a new project
3. Same settings as above

### Step 6: Connect Local Repo to GitHub

```bash
# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/zaoga-fif.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 7: Clone on Another Machine (If Needed)

```bash
# To clone the repository on another machine
git clone https://github.com/yourusername/zaoga-fif.git
cd zaoga-fif
npm install
```

---

## Part 2: Local Development Workflow

### Daily Git Workflow

**After making changes:**

```bash
# Check what changed
git status

# View specific changes
git diff

# Stage changes
git add .

# Or stage specific files
git add app/components/Navbar.jsx
git add app/lib/api.js

# Commit with clear message
git commit -m "feat: add sermon list component with API integration"

# Push to GitHub
git push
```

### Commit Message Convention

```
feat: add user authentication
fix: resolve navbar mobile menu bug
docs: update API documentation
style: format code with Prettier
refactor: reorganize components structure
test: add login form tests
chore: update dependencies
```

### Creating Branches for Features

```bash
# Create new branch
git checkout -b feature/sermon-player

# Make changes...
git add .
git commit -m "feat: add sermon video player component"

# Push branch to GitHub
git push -u origin feature/sermon-player

# When ready, create Pull Request on GitHub
# Then merge to main branch
```

---

## Part 3: Host Website on Local Machine

### Option 1: Development Server (Easiest)

**Run Next.js Development Server:**

```bash
cd website
npm run dev
```

**Access from:**
- Local machine: http://localhost:3000
- Other machines: http://DESKTOP-L4CKVI2:3000

### Option 2: Production Build & Serve

```bash
# Build for production
npm run build

# Start production server
npm start
```

**This is faster and more like real hosting.**

### Option 3: Host on IIS (Windows Server Style)

If you want to use IIS (like your backend):

**Step 1: Build Next.js**
```bash
cd website
npm run build
```

**Step 2: Create IIS Site**

1. Open **IIS Manager** (inetmgr)
2. Right-click "Sites" → "Add Website"
3. Fill in:
   - Site name: `ZAOGA-Website`
   - Physical path: `C:\zaoga-project\website\.next\standalone`
   - Binding: 
     - Type: http
     - IP: All Unassigned
     - Port: 3000
     - Host name: DESKTOP-L4CKVI2

**Step 3: Create web.config**

**C:\zaoga-project\website\web.config**
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Redirect to HTTPS" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="off" ignoreCase="true" />
          </conditions>
          <action type="Redirect" url="https://{HTTP_HOST}{REQUEST_URI}" redirectType="Permanent" />
        </rule>
        <rule name="Static files" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" />
          </conditions>
          <action type="Rewrite" url="{R:1}" />
        </rule>
        <rule name="Directories" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" />
          </conditions>
          <action type="Rewrite" url="{R:1}" />
        </rule>
        <rule name="Next.js" stopProcessing="true">
          <match url="^(.*)$" />
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
```

**Step 4: Install Node.js on IIS**

```powershell
# Install URL Rewrite Module for IIS
# Download from: https://www.iis.net/downloads/microsoft/url-rewrite
```

---

## Part 4: Access From Other Machines on Network

### Using Machine Name: DESKTOP-L4CKVI2

**From any machine on your network:**

```
http://DESKTOP-L4CKVI2:3000/
```

### Using IP Address

**Find your machine IP:**

```bash
# Windows PowerShell
ipconfig

# Look for IPv4 Address (usually 192.168.x.x)
```

**Then access from another machine:**
```
http://192.168.1.100:3000/
# Replace 192.168.1.100 with your actual IP
```

### Make Website Accessible by Machine Name

**Windows 10/11:**

1. Settings → System → About
2. Copy "Device name" (DESKTOP-L4CKVI2)
3. From other machines use: `http://DESKTOP-L4CKVI2:3000`

**Note:** This only works if both machines are on same network and mDNS is enabled.

---

## Part 5: Complete Project Structure

```
zaoga-project/
├── .git/                          ← Git repository
├── .gitignore                     ← Git ignore file
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── database.js       ← MS SQL connection
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middleware/
│   ├── index.js
│   ├── .env                       ← Backend secrets (not in git)
│   └── package.json
├── website/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   │   └── api.js                ← API client
│   ├── public/
│   ├── .env.local                ← Local env (not in git)
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .next/                    ← Build output (not in git)
├── mobile/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── app.json
│   └── package.json
└── README.md                     ← Project documentation
```

---

## Part 6: Create README.md

**Create `README.md` in project root:**

```markdown
# ZAOGA FIF Mabelreign Kingdom District

Digital ministry platform with mobile app, website, and backend API.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MS SQL Server Express
- Git

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

### Website Setup
```bash
cd website
npm install
npm run dev
```

Website runs on: http://localhost:3000

### Mobile App Setup
```bash
cd mobile
npm install
npm start
```

## 📋 Project Structure

- **backend/** - Node.js + Express API server
- **website/** - Next.js + React web application
- **mobile/** - React Native mobile app

## 🗄️ Database

- MS SQL Server Express
- Database: zaoga_db
- Connection: localhost\SQLEXPRESS

## 🔧 Configuration

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=zaoga_db
DB_USER=zaoga_app
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

### Website (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=ZAOGA FIF
```

## 📝 API Documentation

See `backend/API_DOCS.md` for complete endpoint documentation.

## 🤝 Contributing

1. Create a branch for your feature
2. Commit changes with clear messages
3. Push to GitHub
4. Create a Pull Request

## 📄 License

Private project - ZAOGA FIF Mabelreign Kingdom District

## 📞 Support

For issues or questions, contact: support@zaoga.church

---

**Built with:** Next.js, React Native, Node.js, MS SQL Server
```

---

## Part 7: GitHub Desktop (Optional Alternative)

If you prefer GUI instead of command line:

1. Download: https://desktop.github.com/
2. Install and sign in with GitHub account
3. Click "Add" → "Create New Repository"
4. Set local path to `C:\zaoga-project`
5. Publish to GitHub
6. Use GUI for all git operations

---

## Part 8: Command Cheat Sheet

```bash
# SETUP
git init                          # Initialize repository
git config --global user.name "Name"
git config --global user.email "email@example.com"

# DAILY WORKFLOW
git status                        # Check what changed
git add .                         # Stage all changes
git commit -m "message"           # Commit changes
git push                          # Push to GitHub
git pull                          # Pull latest changes

# BRANCHES
git branch -a                     # List all branches
git checkout -b feature/name      # Create new branch
git checkout main                 # Switch to main
git merge feature/name            # Merge branch
git branch -d feature/name        # Delete branch

# UNDO
git reset HEAD~1                  # Undo last commit
git restore filename              # Discard changes
git checkout -- filename          # Discard file changes

# HISTORY
git log                           # View commit history
git log --oneline                 # Short commit history
git diff                          # View changes

# CLONE
git clone URL                     # Clone repository
```

---

## Part 9: Hosting Summary

### Development (Recommended for Now)
```bash
# Terminal 1: Start Backend
cd backend && npm run dev
# http://localhost:5000

# Terminal 2: Start Website
cd website && npm run dev
# http://localhost:3000 or http://DESKTOP-L4CKVI2:3000
```

### Production (Later)
```bash
# Build website
cd website && npm run build && npm start

# Access
http://DESKTOP-L4CKVI2:3000
```

### IIS Hosting (Optional)
```bash
# Build and deploy to IIS
cd website && npm run build
# Configure IIS as shown above
```

---

## 🎯 What You Have Now

✅ Local Git repository  
✅ Connected to GitHub (optional)  
✅ Website hosted on DESKTOP-L4CKVI2:3000  
✅ Backend API on DESKTOP-L4CKVI2:5000  
✅ Accessible from network via machine name  
✅ Version control for all changes  
✅ Ready for team collaboration  

---

## 📱 Access From Different Devices

### Same Machine (Windows PC)
```
http://localhost:3000
```

### Other Machine on Network
```
http://DESKTOP-L4CKVI2:3000
http://192.168.1.100:3000
```

### Mobile Phone on Same WiFi
```
http://192.168.1.100:3000
```

---

## 🔒 Security Notes

- Never commit `.env` files (add to .gitignore)
- Use strong passwords for databases
- Change JWT_SECRET to unique random string
- In production, use HTTPS only
- Limit database user permissions

---

## Next Steps

1. ✅ Initialize Git repository
2. ✅ Make first commit
3. ✅ Create GitHub repository (optional)
4. ✅ Start development server
5. ✅ Access from DESKTOP-L4CKVI2:3000
6. ✅ Begin building features

Ready to commit your code? 🚀
