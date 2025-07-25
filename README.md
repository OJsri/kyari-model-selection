# 🌳 Navchetna Kyari Plantation Planner

A web-based plantation planning tool that helps calculate tree requirements for different kyaris (agricultural plots) based on various plantation models.

## Features

### 🎯 Core Functionality
- **Model Selection**: Choose from different plantation models with varying tree compositions
- **Kyari Management**: Add multiple kyaris with farm details, area, and perimeter
- **Smart Calculations**: Automatic calculation of boundary and inside plantation trees
- **Detailed Reports**: Comprehensive breakdown by kyari, tree type, and totals

### 📊 Calculation Logic

#### Boundary Plantation
- **Teak**: 3m spacing
- **Mahogany**: 3m spacing  
- **Sheesham**: 4m spacing
- **Fruit Trees**: 5m spacing
- Uses perimeter and weighted average spacing for calculations

#### Inside Plantation
- **Setback**: 4m inside from boundary
- **Tree Spacing**: 5m × 5m grid
- **Distribution**: According to selected model percentages

## How to Use

### 1. Select Plantation Model
- Choose from available models (Standard Mixed, Fruit-Focused, or Timber-Focused)
- Each model has different tree type percentages

### 2. Add Kyaris
- Enter Farm ID, Farmer Name, Area (acres), and Perimeter (meters)
- Add multiple kyaris as needed
- Delete kyaris if needed

### 3. Calculate Trees
- Click "Calculate Trees" button
- View summary cards with total counts
- Check detailed breakdown by kyari and tree type

## Sample Data Structure

### Plantation Models
```javascript
{
    "Standard Mixed Plantation": {
        "Teak": 30%,
        "Mahogany": 25%,
        "Sheesham": 20%,
        "Mango": 15%,
        "Guava": 10%
    }
}
```

### Kyari Information
- **Farm ID**: Unique identifier
- **Farmer Name**: Owner name
- **Area**: In acres
- **Perimeter**: In meters

## Hosting Options

### GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload all files (`index.html`, `styles.css`, `script.js`, `README.md`)
3. Go to Settings → Pages
4. Select "Deploy from a branch" → `main`
5. Your site will be available at `https://username.github.io/repository-name`

### Netlify (Free)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant live URL

### Vercel (Free)
1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository or upload files
3. Automatic deployment with custom domain

### Simple HTTP Server (Local Testing)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Access at http://localhost:8000
```

## Customization

### Adding New Models
Edit the `plantationModels` object in `script.js`:
```javascript
const plantationModels = {
    model4: {
        name: "Your Model Name",
        description: "Model description",
        treeComposition: {
            "TreeType1": 40,
            "TreeType2": 35,
            "TreeType3": 25
        }
    }
};
```

### Updating Tree Spacing
Modify the `calculateAverageSpacing` function in `script.js` to adjust spacing rules.

### Styling Changes
Edit `styles.css` to customize colors, fonts, and layout.

## Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## File Structure
```
plantation-planner/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Technical Details

### Calculation Methods
1. **Boundary Trees**: `perimeter ÷ weighted_average_spacing`
2. **Inside Area**: `(length - 8m) × (width - 8m)` (4m setback on all sides)
3. **Inside Trees**: `inside_area ÷ 25` (5m × 5m spacing)
4. **Distribution**: Trees allocated by model percentages

### Input Validation
- Required fields validation
- Positive number validation for area/perimeter
- Model selection requirement

## Support
For questions or issues, please refer to the calculation logic in `script.js` or create an issue in your repository.

## Next Steps
1. Replace placeholder model data with your actual plantation models
2. Add your specific kyari data
3. Customize styling to match your branding
4. Deploy to your preferred hosting platform

---

*Created for Navchetna Kyari plantation planning* 