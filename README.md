# Cloud Vision App

A Node.js + Express web application that uses Google Cloud Vision API to detect and label objects in uploaded images.

## Features

- **Image Upload**: Upload images via a simple web form
- **Label Detection**: Uses Google Cloud Vision API to analyze images
- **Results Display**: Shows detected labels with confidence scores
- **Deployed on Google App Engine**: Fully functional cloud deployment

## Project Structure

```
Cloud-Vision-App/
├── Server/
│   ├── app.js                    # Express server entry point
│   ├── app.yaml                  # Google App Engine configuration
│   ├── package.json              # Node.js dependencies
│   ├── public/                   # Static files (HTML, CSS)
│   │   ├── index.html            # Upload form UI
│   │   └── style.css             # Styling
│   └── service-account-key.json  # Google Cloud credentials (not committed)
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

## Technology Stack

- **Backend**: Node.js with Express.js
- **File Upload**: Multer
- **Image Analysis**: Google Cloud Vision API
- **Deployment**: Google App Engine (nodejs20 runtime)
- **Frontend**: HTML5 + CSS3

## Prerequisites

- Node.js 20+ installed
- Google Cloud Project with Vision API enabled
- Google Cloud credentials (service-account-key.json)
- `gcloud` CLI installed and configured

## Local Development

### 1. Install Dependencies

```bash
cd Server
npm install
```

### 2. Set Up Google Cloud Credentials

Place your `service-account-key.json` in the `Server` folder. This file is required to authenticate with Google Cloud Vision API.

**Important**: Never commit this file to version control.

### 3. Start the Server

```bash
npm start
```

The server will run on `http://localhost:8080`

## Deployment to Google App Engine

### 1. Set Up Google Cloud Project

```bash
gcloud config set project YOUR_PROJECT_ID
```

### 2. Deploy

From the `Server` folder:

```bash
gcloud app deploy
```

### 3. Browse the Deployed App

```bash
gcloud app browse
```

## How It Works

### Upload Flow

1. User uploads an image via the form on the homepage
2. Express server receives the file using Multer middleware
3. File is temporarily stored in `/tmp`
4. Google Cloud Vision API analyzes the image
5. Detected labels with confidence scores are returned
6. Results are displayed on the response page

### Key Code Sections

- **Static File Serving**: `app.use(express.static(clientPath))`
- **File Upload Endpoint**: `app.post("/upload", upload.single("image"), ...)`
- **Vision API Integration**: `client.labelDetection(req.file.path)`



For detailed documentation, see the [Wiki](../../wiki)

## License

MIT License - Feel free to use this project for learning and development.
