// app.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import vision from "@google-cloud/vision";

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

    let html = `
      <html>
      <head>
        <title>Detected Labels</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>Detected Labels</h1>
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
          <a href="/">Upload Another Image</a>
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
