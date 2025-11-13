# App

## Deployed Application

The Cloud Vision App is live and running on Google App Engine:

**🌐 [Access the App Here](https://cloud-vision-app-477903.uw.r.appspot.com/)**

URL: `https://cloud-vision-app-477903.uw.r.appspot.com/`

## How to Use

### Step 1: Upload an Image
1. Navigate to the application URL above
2. Click the "Choose File" button to select an image from your computer
3. Supported formats: JPG, PNG, GIF, WebP, and other common image formats

### Step 2: Analyze the Image
1. After selecting an image, click the **"Analyze Image"** button
2. The app will send the image to Google Cloud Vision API for analysis
3. Processing typically takes 1-3 seconds

### Step 3: View Results
1. The results page displays all detected labels with confidence scores
2. Each label shows what object/concept was detected and how confident the AI is (0-100%)
3. Click **"Upload Another Image"** to analyze more images

## Requirements

- A web browser (Chrome, Firefox, Safari, Edge, etc.)
- An internet connection
- Any image file (JPG, PNG, etc.)

## Features

✅ Real-time image analysis using Google Cloud Vision API  
✅ Accurate object and scene detection  
✅ Confidence scores for each detected label  
✅ Simple, intuitive user interface  
✅ Fast processing (typically 1-3 seconds per image)  

## Notes

- The app stores uploaded images temporarily for processing only
- Images are not saved or retained after analysis
- Results depend on the quality and clarity of the uploaded image
- The app works best with clear, well-lit images

## Troubleshooting

**Page not loading?**
- Check your internet connection
- Try refreshing the page
- Clear your browser cache

**Image upload fails?**
- Ensure the file is a valid image format
- Check file size (should be under 20MB)
- Try a different browser

**No results shown?**
- Check browser console for errors (F12)
- Verify the image quality
- Try uploading a clearer image

For technical details, see the [Explanation](Explanation) wiki page.
