// app.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import vision from "@google-cloud/vision";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Configure Multer for file uploads (store temporarily in /tmp)
const upload = multer({ dest: "/tmp" });

// Set up static file serving (for client folder)
// Serve static files from the public folder within the Server directory
const clientPath = path.join(__dirname, "public");
app.use(express.static(clientPath));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Google Cloud Vision client setup
const client = new vision.ImageAnnotatorClient({
  keyFilename: "service-account-key.json", // Place this file in your server root
});

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    const [result] = await client.labelDetection(req.file.path);
    const labels = result.labelAnnotations;

    // Read the uploaded image and convert to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = req.file.mimetype || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    let html = `
      <html>
      <head>
        <title>Detected Labels</title>
        <link rel="stylesheet" href="/style.css">
        <style>
          .results-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
          }

          .image-section {
            text-align: center;
          }

          .image-section img {
            max-width: 100%;
            max-height: 400px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .labels-section {
            flex-grow: 1;
          }

          @media (max-width: 768px) {
            .results-container {
              grid-template-columns: 1fr;
              gap: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Detected Labels</h1>
          
          <div class="results-container">
            <div class="image-section">
              <h3>Uploaded Image</h3>
              <img src="${dataUrl}" alt="Uploaded image">
            </div>
            
            <div class="labels-section">
              <h3>Analysis Results</h3>
              <ul class="labels">
                ${labels
                  .map(
                    (label) =>
                      `<li>${label.description} <span class="score">(${(
                        label.score * 100
                      ).toFixed(2)}%)</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="/">Upload Another Image</a>
          </div>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error("Error processing image:", error);
    res
      .status(500)
      .send("Error analyzing image. Please check your API credentials.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
