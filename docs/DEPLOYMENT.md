# 🚀 Deployment & Local Setup Guide

Follow these simple instructions to run the birthday surprise website locally or deploy it to a live public URL for free so she can open it on her phone or computer.

---

## 💻 1. Local Development Setup

### Method A: Direct File Open
Simply double-click [`index.html`](file:///c:/Users/chait/Documents/antigravity/modest-volta/index.html) in your file explorer. It will open directly in Google Chrome, Microsoft Edge, Safari, or Mozilla Firefox.

### Method B: Python Local Server (Recommended)
Running through an HTTP server ensures all audio permissions and web fonts load smoothly:

```bash
# Python 3
python -m http.server 8080
```

Open your browser and navigate to:
**[http://localhost:8080](http://localhost:8080)**

---

## 🌐 2. Free 1-Click Public Hosting

### Option 1: GitHub Pages (Recommended)
Since the repository is already hosted on GitHub, GitHub Pages allows you to host the website completely free with an SSL certificate (`https://`).

1. Open your repository on GitHub:
   `https://github.com/P-chaitanya00/birthday`
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, click on **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` (or `master`)
   - **Folder**: Select `/ (root)`
5. Click **Save**.
6. Wait 1-2 minutes. GitHub will provide your live URL:
   **`https://p-chaitanya00.github.io/birthday/`**

---

### Option 2: Netlify Drop (Fastest - 30 Seconds)
1. Navigate to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this whole project folder into the browser window.
3. Netlify will instantly create a live public URL (e.g., `https://romantic-birthday-surprise.netlify.app`).
4. You can customize the subdomain name in **Site Settings > Change site name**.

---

### Option 3: Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment:
   ```bash
   vercel
   ```
3. Or link your GitHub repository (`P-chaitanya00/birthday`) directly on [vercel.com](https://vercel.com/new).

---

## 📱 Mobile Compatibility
The layout is 100% responsive and optimized for:
- iPhone (Safari & Chrome)
- Android (Chrome, Samsung Internet, Firefox)
- Tablets & iPads
- High-resolution Retina and 4K displays
