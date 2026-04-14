<div align="center">
  <img src="logo.png" width="120" height="120" />
  <br />
  <br />

  <p align="center">
    <b>Aether Reader is a premium, minimalist web novel reader interface designed for a focus-oriented reading experience. It provides a sleek, modern UI with smooth transitions, keyboard shortcuts, and persistent reading progress.</b>
    <br />
 
  </p>
</div>

<img src="md/20260414142727595.jpg" width="auto" style="border-radius: 8px;" />

## ✨ Features

- **Premium Aesthetics:** Dark-themed interface with glassmorphism effects and gold accents.
- **Seamless Navigation:** Easy-to-use navigation buttons for moving between chapters.
- **Chapter Library:** A modal-based library for quick chapter selection and direct jumping.
- **Persistent Reading:** Automatically remembers your last read chapter using LocalStorage.
- **Keyboard Shortcuts:**
  - `ArrowLeft` / `ArrowRight`: Navigate between chapters.
  - `M`: Open library/menu.
  - `ESC`: Close library/menu.
- **Fast Performance:** In-memory caching for recently loaded chapters.
- **Responsive Design:** Optimized for both mobile devices and large screens.
- **Deep Linking:** Syncs reading progress with the URL hash (e.g., `index.html#42`).

## 🛠️ Tech Stack

- **Core:** HTML5, Vanilla JavaScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide Icons

<img src="md/20260414142727652.jpg" width="%100" style="border-radius: 8px;" />

## 🚀 Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your system to run the Tailwind CLI and serve the project locally.

### Installation

1. Navigate to the project directory:
   ```bash
   cd aether-reader
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. **Start the server:**
   ```bash
   npm start
   ```

<img src="md/20260414142727721.jpg" width="auto" style="border-radius: 8px;" />

## 📂 Content & Configuration

Aether Reader is highly flexible. While it expects files in a specific format by default, you can easily customize the behavior via the `CONFIG` object in `script.js`.

### Default Expectations

By default, the reader scans the `chapters/` directory for files named `chapter-1.txt`, `chapter-2.txt`, etc.

### Customizing the Reader

Open `script.js` and modify the `CONFIG` constant at the top of the file:

```javascript
const CONFIG = {
  chapterPrefix: "chapter-",     // Prefix of your files
  chapterExtension: ".txt",      // File extension
  basePath: "./chapters/",       // Folder where chapters are stored
  totalChapters: 2235,           // Total number of chapters
  storageKey: "lastChapter",     // LocalStorage key for progress
};
```

---

<p align="center">
  <sub>❤️ Developed by Kintaro.</sub>
</p>
