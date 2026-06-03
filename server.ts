import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { Readable } from "stream";

// Slide Data File Path
const DATA_FILE = path.join(process.cwd(), 'slideData.json');
const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

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

// Read settings from file
function getSettingsData() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading settings.json', error);
  }
  return null;
}

// Write settings to file
function saveSettingsData(data: any) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing settings.json', error);
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

  // API route to get settings
  app.get("/api/settings", (req, res) => {
    const settings = getSettingsData();
    res.json(settings || {});
  });

  // API route to update settings
  app.post("/api/settings", (req, res) => {
    if (req.body) {
      if (saveSettingsData(req.body)) {
        res.json({ success: true, message: "Settings updated successfully" });
      } else {
        res.status(500).json({ success: false, message: "Failed to save settings" });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid payload format" });
    }
  });

  let absensiCache: any = null;
  let lastAbsensiFetch = 0;

  // API route to proxy absensi data
  app.get("/api/absensi", async (req, res) => {
    try {
      const now = Date.now();
      // Cache for 3 minutes
      if (absensiCache && (now - lastAbsensiFetch < 3 * 60 * 1000)) {
        return res.json(absensiCache);
      }
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbz6YajqskEFxko5jVtpK8RS3oI-LUHbaLCUmgCFa-xHZIWSGrxJfB66ng0O0HqR4Arf-g/exec');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      absensiCache = data;
      lastAbsensiFetch = now;
      res.json(data);
    } catch (error) {
      console.error('Proxy Absensi Error:', error);
      if (absensiCache) {
        return res.json(absensiCache);
      }
      res.status(500).json({ error: 'Failed to fetch absensi' });
    }
  });

  // API Route to bypass Google Drive virus scan
  app.get('/api/proxy-media', async (req, res) => {
    const id = req.query.id as string;
    if (!id) return res.status(400).send('No id');
    
    try {
      let url = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
      let response = await fetch(url);
      
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const text = await response.text();
        const uuidMatch = text.match(/name="uuid" value="([^"]+)"/);
        
        if (uuidMatch && uuidMatch[1]) {
          const confirmUrl = `${url}&confirm=t&uuid=${uuidMatch[1]}`;
          response = await fetch(confirmUrl);
        } else {
           // fallback logic
           response = await fetch(`https://drive.google.com/uc?export=download&id=${id}`);
        }
      }
      
      // forward content-type
      const finalType = response.headers.get('content-type');
      if (finalType) {
        res.setHeader('Content-Type', finalType);
      }
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }
      
      if (response.body) {
         // @ts-ignore
         const nodeStream = Readable.fromWeb(response.body);
         nodeStream.pipe(res);
      } else {
         const buffer = await response.arrayBuffer();
         res.send(Buffer.from(buffer));
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Error proxying media');
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
