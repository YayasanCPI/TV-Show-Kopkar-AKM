import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// Slide Data File Path
const DATA_FILE = path.join(process.cwd(), 'slideData.json');

// Read slides from file
function getSlideData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading slideData.json', error);
  }
  return [];
}

// Write slides to file
function saveSlideData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing slideData.json', error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' })); // Support large base64 strings

  // API route to get slides
  app.get("/api/slides", (req, res) => {
    res.json(getSlideData());
  });

  // API route to update slides (for future CMS integration)
  app.post("/api/slides", (req, res) => {
    if (req.body && Array.isArray(req.body)) {
      if (saveSlideData(req.body)) {
        res.json({ success: true, message: "Slides updated successfully" });
      } else {
        res.status(500).json({ success: false, message: "Failed to save slides" });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid payload format" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
