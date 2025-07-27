# 🚀 React + Vite + Tailwind Starter Project

A modern frontend boilerplate built with:

- ⚛️ **React 19**
- ⚡ **Vite 7**
- 💨 **Tailwind CSS 4**
- 🧭 **React Router DOM 7**
- 📡 **Axios**
- 🧰 **ESLint + PostCSS**
- 🖼️ **vite-plugin-svgr**

---

## 📁 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

Or download the source code manually.

---

### 2. Install dependencies (⚠️ MUST DO BEFORE RUNNING)

```bash
# Option 1 (recommended – exact match with lockfile):
npm ci

# Option 2 (fallback – flexible versions):
npm install
```

---

### 3. Start development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---



## 🧰 Tech Stack & Dependencies

| Package               | Version     |
|------------------------|-------------|
| `react`               | ^19.1.0     |
| `react-dom`           | ^19.1.0     |
| `react-router-dom`    | ^7.6.3      |
| `axios`               | ^1.10.0     |
| `vite`                | ^7.0.3      |
| `tailwindcss`         | ^4.1.11     |
| `@vitejs/plugin-react`| ^4.6.0      |
| `vite-plugin-svgr`    | ^4.3.0      |
| `eslint`, `postcss`   | included    |

---

## ✅ Requirements

- **Node.js >= 18** (you are using `v22.13.0` ✅)
- **npm >= 9** (you are using `v10.9.2` ✅)

---

## 📦 Folder Structure (basic)
```
├── public/               # Static assets
├── src/                  # React components and pages
│   ├── assets/           
│   ├── components/       
│   ├── pages/            
│   └── App.jsx           
├── package.json          
├── package-lock.json     
├── postcss.config.js     
├── tailwind.config.js    
└── vite.config.js        
```
