# Automated Setup Script

## Windows PowerShell Setup Script

**Create `setup-project.ps1` in your project root:**

```powershell
# ZAOGA FIF Project Setup Script
# Run in PowerShell as Administrator

Write-Host "=====================================" -ForegroundColor Green
Write-Host "ZAOGA FIF Project Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Git is installed
Write-Host "`nChecking prerequisites..." -ForegroundColor Yellow

try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit
}

try {
    node --version | Out-Null
    Write-Host "✅ Node.js is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v18+" -ForegroundColor Red
    exit
}

# Initialize Git Repository
Write-Host "`n📦 Initializing Git repository..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "⚠️  Git repository already exists" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Create .gitignore
Write-Host "`n📝 Creating .gitignore..." -ForegroundColor Yellow

$gitignore = @"
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

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

# Cache
.cache/
.turbo/
"@

$gitignore | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "✅ .gitignore created" -ForegroundColor Green

# Create README.md
Write-Host "`n📄 Creating README.md..." -ForegroundColor Yellow

$readme = @"
# ZAOGA FIF Mabelreign Kingdom District

Digital ministry platform connecting the church community through mobile and web applications.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MS SQL Server Express
- Git

### Project Structure
- **backend/** - Node.js + Express API
- **website/** - Next.js + React web app
- **mobile/** - React Native mobile app

### Backend Setup
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Backend: http://localhost:5000

### Website Setup
\`\`\`bash
cd website
npm install
npm run dev
\`\`\`

Website: http://localhost:3000

### Mobile Setup
\`\`\`bash
cd mobile
npm install
npm start
\`\`\`

## 🗄️ Database
- MS SQL Server Express
- Database: zaoga_db
- Server: localhost\SQLEXPRESS

## 📞 Support
Email: support@zaoga.church

---

**Built with:** Next.js, React Native, Node.js, MS SQL Server
"@

$readme | Out-File -FilePath "README.md" -Encoding UTF8
Write-Host "✅ README.md created" -ForegroundColor Green

# Configure Git User
Write-Host "`n🔧 Configuring Git..." -ForegroundColor Yellow

$gitName = Read-Host "Enter your name for Git commits (press Enter to skip)"
if ($gitName) {
    git config --global user.name $gitName
    Write-Host "✅ Git name set: $gitName" -ForegroundColor Green
}

$gitEmail = Read-Host "Enter your email for Git commits (press Enter to skip)"
if ($gitEmail) {
    git config --global user.email $gitEmail
    Write-Host "✅ Git email set: $gitEmail" -ForegroundColor Green
}

# Initial Commit
Write-Host "`n💾 Making initial commit..." -ForegroundColor Yellow

git add .
git commit -m "Initial commit: ZAOGA FIF project setup

- Initialize project structure
- Add .gitignore configuration
- Add README documentation
- Configure development environment"

Write-Host "✅ Initial commit created" -ForegroundColor Green

# Display next steps
Write-Host "`n=====================================" -ForegroundColor Green
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Backend:  cd backend && npm install && npm run dev"
Write-Host "2. Website:  cd website && npm install && npm run dev"
Write-Host "3. Mobile:   cd mobile && npm install && npm start"
Write-Host ""
Write-Host "4. Access website: http://localhost:3000 or http://DESKTOP-L4CKVI2:3000"
Write-Host ""
Write-Host "5. (Optional) Create GitHub repo and push:"
Write-Host "   git remote add origin https://github.com/yourusername/zaoga-fif.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
```

**Run the script:**

```powershell
# Right-click PowerShell → "Run as Administrator"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-project.ps1
```

---

## Alternative: Batch Script (setup.bat)

**Create `setup-project.bat` if you prefer:**

```batch
@echo off
REM ZAOGA FIF Project Setup Script

echo.
echo =====================================
echo ZAOGA FIF Project Setup
echo =====================================
echo.

REM Check Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed
    exit /b 1
)
echo [OK] Git is installed

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    exit /b 1
)
echo [OK] Node.js is installed

REM Initialize Git
echo.
echo Initializing Git repository...
git init
echo [OK] Git repository initialized

REM Create .gitignore
echo Creating .gitignore...
(
    echo # Dependencies
    echo node_modules/
    echo package-lock.json
    echo yarn.lock
    echo.
    echo # Environment
    echo .env
    echo .env.local
    echo .env.*.local
    echo.
    echo # Build
    echo .next/
    echo dist/
    echo build/
    echo out/
    echo.
    echo # IDE
    echo .vscode/
    echo .idea/
    echo.
    echo # OS
    echo .DS_Store
    echo Thumbs.db
    echo.
    echo # Logs
    echo *.log
) > .gitignore
echo [OK] .gitignore created

REM Initial commit
echo.
echo Making initial commit...
git add .
git commit -m "Initial commit: ZAOGA FIF project setup"
echo [OK] Initial commit created

echo.
echo =====================================
echo [SUCCESS] Setup Complete!
echo =====================================
echo.
echo Next Steps:
echo 1. Backend:  cd backend ^&^& npm install ^&^& npm run dev
echo 2. Website:  cd website ^&^& npm install ^&^& npm run dev
echo 3. Access:   http://localhost:3000
echo.
echo 4. Create GitHub repo and push:
echo    git remote add origin https://github.com/yourusername/zaoga-fif.git
echo    git push -u origin main
echo.
pause
```

**Run the script:**

```bash
setup-project.bat
```

---

## Quick Setup Steps

### Step-by-Step (No Script)

```bash
# 1. Navigate to project root
cd C:\zaoga-project

# 2. Initialize Git
git init

# 3. Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 4. Create .gitignore
# (Copy content from script above and save as .gitignore)

# 5. Create README.md
# (Copy content from script above and save as README.md)

# 6. Make initial commit
git add .
git commit -m "Initial commit: ZAOGA FIF project setup"

# 7. Verify
git log
git status
```

---

## After Initial Setup

### Push to GitHub

```bash
# If you created repo on GitHub:
git remote add origin https://github.com/yourusername/zaoga-fif.git
git branch -M main
git push -u origin main

# For future pushes:
git push
```

### Start Development

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Website
cd website
npm install
npm run dev

# Terminal 3 - Mobile (optional)
cd mobile
npm install
npm start
```

---

## Daily Workflow After Setup

```bash
# Make your changes...

# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: add sermon list component"

# Push to GitHub
git push

# Pull latest changes (if working with team)
git pull
```

---

## Accessing Your Website on Network

### From DESKTOP-L4CKVI2 (Your PC)
```
http://localhost:3000
```

### From Another PC on Network
```
http://DESKTOP-L4CKVI2:3000
http://192.168.1.100:3000
```

### From Mobile Phone
```
http://192.168.1.100:3000
```

---

## Check Git Status Anytime

```bash
# See what's in Git
git log --oneline

# See current status
git status

# See changes
git diff

# See all branches
git branch -a

# See remote
git remote -v
```

---

## If Something Goes Wrong

```bash
# See what you changed
git diff

# Undo changes to a file
git restore filename

# Undo last commit (keep changes)
git reset HEAD~1

# Start fresh (careful!)
git reset --hard HEAD

# See the history
git reflog
```

---

## Git Credentials (One-Time Setup)

On Windows, after first push to GitHub, Git may ask for credentials:

**Option 1: Use Git Credential Manager**
- Already installed with Git
- Enter credentials once
- Automatically stores and reuses them

**Option 2: Use SSH Key**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your@email.com"

# Add to SSH agent
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub Settings → SSH Keys
```

---

## Tips for Success

✅ Commit frequently (daily)  
✅ Write clear commit messages  
✅ Never commit .env files  
✅ Pull before pushing  
✅ Create branches for features  
✅ Keep README updated  
✅ Use consistent naming  
✅ Test before committing  

---

## Summary

You now have:
- ✅ Git initialized locally
- ✅ Project properly structured
- ✅ .gitignore configured
- ✅ README documentation
- ✅ Ready to push to GitHub
- ✅ Website accessible at DESKTOP-L4CKVI2:3000

**You're ready to start building!** 🚀
