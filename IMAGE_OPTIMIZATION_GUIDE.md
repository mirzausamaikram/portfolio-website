# Image Optimization Guide

## Converting Images to WebP Format

WebP images are 25-35% smaller than JPEG/PNG while maintaining quality. Here's how to optimize your images:

### Option 1: Using Online Tools
1. **Squoosh.app** (Recommended)
   - Visit https://squoosh.app
   - Drag and drop your images
   - Select WebP format
   - Adjust quality (80-85% is optimal)
   - Download optimized images

2. **CloudConvert**
   - Visit https://cloudconvert.com/png-to-webp
   - Upload images
   - Convert to WebP

### Option 2: Using Command Line (Windows)

1. Install cwebp (WebP encoder):
   ```powershell
   # Download from https://developers.google.com/speed/webp/download
   # Or use chocolatey:
   choco install webp
   ```

2. Convert images:
   ```powershell
   # Single file
   cwebp -q 85 input.jpg -o output.webp
   
   # Batch convert all images in folder
   Get-ChildItem -Path "images\" -Filter *.jpg | ForEach-Object {
       $output = $_.BaseName + ".webp"
       cwebp -q 85 $_.FullName -o "images\$output"
   }
   ```

### Option 3: Using Node.js Script

1. Create a conversion script:
   ```javascript
   // convert-images.js
   const sharp = require('sharp');
   const fs = require('fs');
   const path = require('path');

   const imageDir = './images';
   
   fs.readdir(imageDir, (err, files) => {
       files.forEach(file => {
           if (file.match(/\.(jpg|jpeg|png)$/i)) {
               const inputPath = path.join(imageDir, file);
               const outputPath = path.join(imageDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
               
               sharp(inputPath)
                   .webp({ quality: 85 })
                   .toFile(outputPath)
                   .then(() => console.log(`Converted ${file}`))
                   .catch(err => console.error(err));
           }
       });
   });
   ```

2. Install dependencies and run:
   ```powershell
   npm install sharp
   node convert-images.js
   ```

## Recommended Image Sizes

- **Hero Background**: 1920x1080px, WebP, 80% quality
- **Profile Photo**: 500x500px, WebP, 85% quality
- **Project Screenshots**: 800x600px, WebP, 80% quality
- **Certification Images**: 600x450px, WebP, 80% quality
- **OG/Social Share Image**: 1200x630px, WebP/JPG, 85% quality

## Using WebP with Fallback

Update your HTML to support older browsers:

```html
<picture>
    <source srcset="images/project.webp" type="image/webp">
    <img src="images/project.jpg" alt="Project" loading="lazy">
</picture>
```

## Current Images to Optimize

Your images folder contains:
- 15-20_Game.png → Convert to WebP
- Bank_Teller_Simulation.PNG → Convert to WebP
- FIFA.jpg → Convert to WebP
- Gomoku.png → Convert to WebP
- Google_Prompting_Essentials.jpg → Convert to WebP
- hero-bg.jpg → Convert to WebP (resize to 1920x1080 if larger)
- Internship_PERI.jpg → Convert to WebP
- PHP_Project.png → Convert to WebP
- profile-pic.png → Convert to WebP (resize to 500x500)
- Project_management.jpg → Convert to WebP
- Solomon.png → Convert to WebP
- Technical _Support.jpg → Convert to WebP
- Tourist.png → Convert to WebP
- UI_Project.png → Convert to WebP

## After Optimization

1. Replace image references in HTML with .webp extensions
2. Test on different browsers
3. Measure performance improvement using:
   - Chrome DevTools Lighthouse
   - PageSpeed Insights (https://pagespeed.web.dev/)

Expected improvements:
- 30-40% reduction in page size
- Faster load times
- Better SEO scores
- Improved mobile performance
