# Smart JSON Inspector

A high-performance, frontend-only developer tool for parsing, validating, and analyzing complex JSON structures directly in the browser.

🔗 Live Demo: [https://your-vercel-link.vercel.app
](https://beautify-neon.vercel.app/)
---

## 🚀 Overview

Smart JSON Inspector is designed to solve a common developer pain point: working with large, messy, and deeply nested JSON responses.

Unlike basic formatters, this tool provides real-time structural insights, helping developers debug and understand API responses faster.

---

## ✨ Features

### ⚡ High-Performance Editor

* Built using Monaco Editor (same as VS Code)
* Handles large JSON payloads (1MB+) without UI lag
* Smooth typing and rendering experience

---

### 🌳 Interactive Tree View

* Toggle between:

  * Raw formatted JSON
  * Collapsible tree structure
* Powered by @microlink/react-json-view
* Efficient navigation of deeply nested data

---

### 🔍 Smart Insights Engine

A recursive analysis system that detects:

* Deep nesting (depth > 5)
* Null values (e.g., `user.email is null`)
* Empty arrays (`orders is empty`)
* Empty objects

---

### 🔎 Search Functionality

* Regex-safe search across JSON
* Quickly locate keys and values
* Designed for large datasets

---

### 🌙 Developer-Focused UI

* Clean dark mode interface
* Minimal, distraction-free layout
* Lightweight CSS (no heavy UI frameworks)

---

## 🧱 Tech Stack

* React 19 (Frontend)
* Vite (Build tool)
* Monaco Editor (@monaco-editor/react)
* React JSON View (@microlink/react-json-view)
* Lucide React (Icons)
* Vanilla CSS

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v16+)
* npm or yarn

---

### Installation

```bash
git clone https://github.com/yourusername/smart-json-inspector.git
cd smart-json-inspector
npm install --legacy-peer-deps
npm run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 🧪 Use Cases

* Debugging API responses
* Inspecting large JSON payloads
* Identifying structural issues in data
* Learning JSON structure visually

---

## 🏆 Key Highlights

* Fully client-side (no backend required)
* Handles large datasets efficiently
* Goes beyond formatting with structural analysis
* Built with performance and developer experience in mind

---

## 📄 License

MIT License

---

## 💡 Author

Built to improve developer productivity and simplify JSON debugging workflows.
