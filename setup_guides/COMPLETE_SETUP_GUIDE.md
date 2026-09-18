# 🚀 ZAOGA FIF Complete Project Setup Guide

## ⚡ Quick Start (2-3 Hours Total)

This guide will get your entire project running on your local machine (DESKTOP-L4CKVI2) with Git version control.

---

## 📋 What You'll Have After This

✅ Git repository (version control)  
✅ Backend API running on `localhost:5000`  
✅ Website running on `localhost:3000` & `DESKTOP-L4CKVI2:3000`  
✅ Database configured (MS SQL Server)  
✅ Code backed up on GitHub (optional)  
✅ Ready for development  

---

## 🎯 Phase 1: Project Initialization (30 minutes)

### Step 1.1: Create Project Folder Structure

```bash
# Create main project directory
mkdir zaoga-project
cd zaoga-project

# Create subdirectories
mkdir backend website mobile docs
```

### Step 1.2: Initialize Git Repository

**Option A: Run PowerShell Script (Easiest)**

1. Create file: `setup-project.ps1`
2. Copy script from **setup_scripts.md** → "Windows PowerShell Setup Script"
3. Run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-project.ps1
```

**Option B: Manual Git Setup**

```bash
# Initialize Git
git init

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Create .gitignore (copy from setup_scripts.md)

# Create README.md (copy from git_and_hosting_setup.md)

# Make initial commit
git add .
git commit -m "Initial commit: ZAOGA FIF project setup"
```

### Step 1.3: Verify Git Initialization

```bash
# Check Git status
git status

# Check commits
git log

# Should show:
# - On branch main/master
# - Initial commit
```

✅ **Phase 1 Complete** - Git is ready!

---

## 🔨 Phase 2: Backend Setup (30 minutes)

**Reference:** `backend_setup_MSSQL.md`

### Step 2.1: Install & Setup MS SQL Server

- Download SQL Server Express
- Download SQL Server Management Studio (SSMS)
- Create database `zaoga_db`
- Create login `zaoga_app`
- Run database schema

### Step 2.2: Initialize Backend Project

```bash
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors dotenv mssql jsonwebtoken bcryptjs uuid joi
npm install --save-dev nodemon

# Create project structure
mkdir -p src/{routes,controllers,middleware,models,utils,config}
mkdir logs uploads
```

### Step 2.3: Create Configuration Files

**backend/.env**
```env
NODE_ENV=development
PORT=5000
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=zaoga_db
DB_USER=zaoga_app
DB_PASSWORD=YourPassword123!
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_or_more
JWT_EXPIRE=1h
```

**backend/package.json scripts**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### Step 2.4: Create Core Backend Files

Copy files from `backend_setup_MSSQL.md`:
- `index.js` (entry point)
- `src/app.js` (Express app)
- `src/config/database.js` (MS SQL connection)
- `src/middleware/auth.js` (Authentication)
- `src/middleware/errorHandler.js` (Error handling)
- `src/routes/index.js` (Route setup)
- `src/routes/auth.js` (Auth routes)
- `src/controllers/authController.js` (Auth logic)

### Step 2.5: Test Backend

```bash
npm run dev

# Should see:
# ✅ Server running on port 5000
# ✅ Connected to MS SQL Server
```

### Step 2.6: Commit Backend to Git

```bash
git add backend/
git commit -m "feat: setup backend API with MS SQL and authentication"
```

✅ **Phase 2 Complete** - Backend is running!

---

## 🌐 Phase 3: Website Setup (1 hour)

**Reference:** `webapp_setup_guide.md` & `api_client_and_hooks.md`

### Step 3.1: Create Next.js Website

```bash
cd ../website

npx create-next-app@latest .
# Select: No TypeScript, Yes ESLint, Yes Tailwind, Yes App Router
```

### Step 3.2: Install Additional Packages

```bash
npm install axios react-hook-form zod clsx date-fns react-toastify lucide-react
```

### Step 3.3: Create .env.local

**website/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=ZAOGA FIF Mabelreign Kingdom District
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3.4: Copy Configuration Files

From `webapp_setup_guide.md`:
- Update `tailwind.config.js`
- Update `app/globals.css`

### Step 3.5: Create Components & Pages

From `webapp_setup_guide.md` → "Phase 2: Build Core Components":
- `app/layout.js` (Root layout)
- `components/common/Navbar.jsx`
- `components/common/Footer.jsx`
- `components/common/Button.jsx`
- `components/common/Input.jsx`
- `app/(public)/page.js` (Home page)
- `app/(auth)/login/page.js` (Login page)
- `app/(auth)/register/page.js` (Register page)
- `app/(dashboard)/dashboard/page.js` (Dashboard)

### Step 3.6: Create API Client & Hooks

From `api_client_and_hooks.md`:
- `app/lib/api.js` (API client)
- `app/hooks/useAuth.js` (Auth hook)
- `app/hooks/useFetch.js` (Fetch hook)

### Step 3.7: Test Website

```bash
npm run dev

# Should see:
# ✅ Server running on port 3000
# ✅ Can visit: http://localhost:3000
```

### Step 3.8: Commit Website to Git

```bash
git add website/
git commit -m "feat: setup Next.js website with authentication pages"
```

✅ **Phase 3 Complete** - Website is running!

---

## 🌍 Phase 4: Network Access Setup (10 minutes)

**Reference:** `git_and_hosting_setup.md` → "Part 4"

### Step 4.1: Check Your Machine Name

Your machine name: **DESKTOP-L4CKVI2**

### Step 4.2: Access Website From Network

**From your PC:**
```
http://localhost:3000
```

**From other PC on network:**
```
http://DESKTOP-L4CKVI2:3000
```

**Find your IP address:**
```bash
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)
```

**From mobile phone on same WiFi:**
```
http://192.168.1.100:3000
```

### Step 4.3: Verify Both Services

Terminal 1 (Backend):
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK",...}
```

Terminal 2 (Website):
```bash
# Visit http://localhost:3000 in browser
# Should see home page with navigation
```

✅ **Phase 4 Complete** - Network access configured!

---

## 💾 Phase 5: GitHub Setup (Optional, 10 minutes)

**Reference:** `git_and_hosting_setup.md` → "Part 1"

### Step 5.1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - Name: `zaoga-fif`
   - Description: "ZAOGA FIF Digital Ministry Platform"
   - Private or Public (your choice)
3. **DO NOT** initialize with README/gitignore
4. Click "Create"

### Step 5.2: Connect Local Repo to GitHub

```bash
# In zaoga-project directory
git remote add origin https://github.com/yourusername/zaoga-fif.git
git branch -M main
git push -u origin main
```

### Step 5.3: Verify on GitHub

Visit: https://github.com/yourusername/zaoga-fif
Should see your code!

✅ **Phase 5 Complete** - GitHub backup configured!

---

## 📊 Development Workflow

### Daily Routine

```bash
# 1. Start backend (Terminal 1)
cd zaoga-project/backend
npm run dev

# 2. Start website (Terminal 2)
cd zaoga-project/website
npm run dev

# 3. Make changes in your editor

# 4. Commit to Git (Terminal 3)
cd zaoga-project
git add .
git commit -m "feat: add sermon list page"
git push
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/sermon-player

# Make changes...

# Commit
git add .
git commit -m "feat: add video player component"

# Push
git push -u origin feature/sermon-player

# Later: Create Pull Request on GitHub
# Then merge to main
```

---

## ✅ Verification Checklist

After each phase, verify:

### Phase 1 - Git
- [ ] `.gitignore` created
- [ ] `README.md` created
- [ ] `git log` shows initial commit
- [ ] Remote configured (if using GitHub)

### Phase 2 - Backend
- [ ] MS SQL database created
- [ ] Backend folder structured
- [ ] `.env` configured
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:5000/health` responds

### Phase 3 - Website
- [ ] Website folder created
- [ ] `.env.local` configured
- [ ] Components created
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:3000` loads home page

### Phase 4 - Network
- [ ] Backend accessible at `localhost:5000`
- [ ] Website accessible at `localhost:3000`
- [ ] Website accessible at `DESKTOP-L4CKVI2:3000`

### Phase 5 - GitHub
- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] Can view code on GitHub.com

---

## 🆘 Troubleshooting

### Backend won't start

```bash
# Check Node.js
node --version

# Check SQL Server is running
# Services.msc → Look for "SQL Server (SQLEXPRESS)" → Right-click Start

# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# Run with debug
NODE_ENV=development node index.js
```

### Website won't start

```bash
# Check Node.js
node --version

# Clear cache
rm -r .next
npm run dev

# Try different port
npm run dev -- -p 3001
```

### Can't access from DESKTOP-L4CKVI2:3000

```bash
# Check firewall allows port 3000
# Windows Defender Firewall → Allow port through firewall

# Check IP address
ipconfig

# Use IP instead
http://192.168.1.100:3000
```

### Git issues

```bash
# Check status
git status

# Check history
git log --oneline

# Check remotes
git remote -v

# Verify configuration
git config --list
```

---

## 📁 Final Project Structure

```
zaoga-project/
├── .git/                          ✅ Git repository
├── .gitignore                     ✅ Git configuration
├── README.md                      ✅ Project documentation
│
├── backend/
│   ├── src/
│   │   ├── app.js                ✅ Express server
│   │   ├── config/
│   │   │   └── database.js       ✅ MS SQL connection
│   │   ├── controllers/
│   │   │   └── authController.js ✅ Auth logic
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── auth.js           ✅ Auth routes
│   │   ├── middleware/
│   │   │   ├── auth.js           ✅ Auth middleware
│   │   │   └── errorHandler.js   ✅ Error handling
│   │   └── utils/
│   ├── index.js                  ✅ Entry point
│   ├── .env                      🔒 (Not in Git)
│   ├── package.json
│   └── package-lock.json
│
├── website/
│   ├── app/
│   │   ├── (public)/
│   │   │   └── page.js           ✅ Home page
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.js       ✅ Login page
│   │   │   └── register/
│   │   │       └── page.js       ✅ Register page
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       └── page.js       ✅ Dashboard
│   │   ├── layout.js             ✅ Root layout
│   │   └── globals.css           ✅ Global styles
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx        ✅ Navigation
│   │       ├── Footer.jsx        ✅ Footer
│   │       ├── Button.jsx        ✅ Button
│   │       └── Input.jsx         ✅ Input
│   ├── hooks/
│   │   ├── useAuth.js            ✅ Auth hook
│   │   └── useFetch.js           ✅ Fetch hook
│   ├── lib/
│   │   └── api.js                ✅ API client
│   ├── .env.local                🔒 (Not in Git)
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .next/                    🔒 (Build output, not in Git)
│
└── mobile/
    └── (setup in next phase)
```

---

## 🎉 Success! You Now Have

✅ **Version Control** - All code backed up in Git  
✅ **Backend API** - Running on localhost:5000  
✅ **Website** - Running on localhost:3000 and DESKTOP-L4CKVI2:3000  
✅ **Database** - MS SQL Server configured  
✅ **Authentication** - Login/Register system ready  
✅ **API Client** - Connected to backend  
✅ **GitHub Backup** - Code saved online (optional)  

---

## 🚀 Next Steps

### This Week
1. Build more pages (Sermons, Events, Prayers)
2. Add admin dashboard
3. Create mobile app
4. Test end-to-end

### Next Week
1. Add payment processing
2. Set up notifications
3. Performance optimization
4. Security audit

### Production
1. Deploy to cloud (AWS/Azure)
2. Set up monitoring
3. Configure backups
4. Launch to users

---

## 📞 Need Help?

**Common Issues:**
- Backend won't connect → Check MS SQL is running
- Website won't load → Check backend is running
- Can't access from other PC → Check firewall, use IP address
- Git won't push → Check GitHub credentials

**Resources:**
- Git Help: `git help command-name`
- Node.js: https://nodejs.org/docs
- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com
- MS SQL: https://learn.microsoft.com/en-us/sql

---

## 📝 Documents Reference

| Document | Use Case |
|----------|----------|
| **git_and_hosting_setup.md** | Git commands, hosting options |
| **setup_scripts.md** | Automated setup scripts |
| **backend_setup_MSSQL.md** | Backend API setup |
| **MSSQL_IIS_Setup.md** | Database & IIS hosting |
| **webapp_setup_guide.md** | Website components & pages |
| **api_client_and_hooks.md** | API integration |

---

## ✨ You're All Set!

Everything is configured and running. Time to build! 🚀

**Start here:** Open 3 terminals and run:
```bash
# Terminal 1
cd zaoga-project/backend && npm run dev

# Terminal 2
cd zaoga-project/website && npm run dev

# Terminal 3
cd zaoga-project && git status
```

Then visit: **http://localhost:3000** or **http://DESKTOP-L4CKVI2:3000**

Happy coding! 💻
