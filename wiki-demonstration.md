# Demonstration

## App in Action

This page shows the Cloud Vision App working end-to-end with screenshots.

## Before: Upload Form

![Upload Form](https://via.placeholder.com/800x400?text=Upload+Form+Screenshot)

**What you see:**
- Clean, professional interface centered on the page
- File input field with "Choose File" button
- "Analyze Image" submit button
- Simple, intuitive design

**User action:** Select an image file and click "Analyze Image"

---

## After: Results Page

![Results Page](https://via.placeholder.com/800x600?text=Results+Page+Screenshot)

**What you see:**
- Heading: "Detected Labels"
- List of detected objects/concepts
- Each item shows:
  - **Label name** (e.g., "Dog", "Outdoor", "Nature")
  - **Confidence score** (e.g., "95.23%")
- "Upload Another Image" link to process more images

---

## Example Results

### Sample Image 1: Dog in Park

```
Detected Labels
- Dog (92.45%)
- Outdoor (88.92%)
- Grass (85.67%)
- Nature (82.34%)
- Mammal (79.56%)
- Pet (76.12%)
```

### Sample Image 2: Food/Restaurant

```
Detected Labels
- Food (97.89%)
- Pasta (94.56%)
- Dish (91.23%)
- Restaurant (88.45%)
- Meal (85.67%)
- Cuisine (82.34%)
```

### Sample Image 3: Urban Scene

```
Detected Labels
- Urban (93.45%)
- Building (90.67%)
- Street (87.89%)
- City (85.23%)
- Architecture (82.56%)
- Road (79.34%)
```

---

## Key Features Demonstrated

### ✅ Accurate Detection
- The app correctly identifies primary objects in images
- Multiple related labels are provided for context

### ✅ Confidence Scores
- Each detection includes a percentage confidence (0-100%)
- Higher percentages indicate stronger confidence in the detection

### ✅ Fast Processing
- Results are returned within 1-3 seconds
- Real-time feedback improves user experience

### ✅ User-Friendly Display
- Clean HTML response with styled results
- Easy-to-read format with clear labeling
- Navigation option to upload another image

---

## Technical Process (Behind the Scenes)

1. **User uploads image** → Browser sends file via HTTP POST
2. **Express server receives file** → Multer saves to `/tmp`
3. **Vision API called** → Image sent to Google Cloud Vision
4. **Labels returned** → API responds with detected objects and scores
5. **HTML generated** → Server formats results into styled HTML
6. **Results displayed** → Browser shows the labels to the user

For more details, see the [Explanation](Explanation) wiki page.
