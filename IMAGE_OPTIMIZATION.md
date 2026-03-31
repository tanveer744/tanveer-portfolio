# Image Optimization Guide

## Current Images

### Profile Images
- `/public/img/Profile.png`
- `/public/img/Profile1.png`

### Icons
- `/public/img/icons/*.png` - App icons (notepad, terminal, camera, etc.)

### Wallpapers
- `/public/img/wallpapers/windows-wallpaper1.png`
- `/public/img/wallpapers/windows-wallpaper2.png`

### Project Screenshots (Placeholders)
- `/public/img/projects/` - Add actual project screenshots here

## Optimization Tasks

### 1. Convert to WebP Format
WebP provides 25-35% better compression than PNG/JPG with similar quality.

**Tools:**
- Online: [Squoosh.app](https://squoosh.app/)
- CLI: `cwebp -q 85 input.png -o output.webp`
- Batch: Use ImageMagick or Sharp

**Process:**
```bash
# Install cwebp (optional)
# Windows: Download from Google WebP tools
# Mac: brew install webp
# Linux: apt-get install webp

# Convert single image
cwebp -q 85 Profile.png -o Profile.webp

# For icons, use higher quality
cwebp -q 95 notepad.png -o notepad.webp
```

### 2. Optimize PNG Files
For images that need to stay as PNG (transparency required):

**Tools:**
- [TinyPNG](https://tinypng.com/) - Online compression
- `pngquant` - CLI tool
- `optipng` - Lossless compression

### 3. Responsive Images
Consider creating multiple sizes for wallpapers:
- `wallpaper-1920.webp` (desktop)
- `wallpaper-1280.webp` (tablet)
- `wallpaper-640.webp` (mobile)

### 4. Lazy Loading
Images are already lazy-loaded via React components. For future images, use:

```jsx
<img 
  src="/img/wallpapers/bg.webp" 
  alt="Wallpaper"
  loading="lazy"
  decoding="async"
/>
```

## Expected Results

| Image Type | Before | After (WebP) | Savings |
|------------|--------|--------------|---------|
| Wallpapers | ~2 MB  | ~600 KB      | 70%     |
| Icons      | ~50 KB | ~15 KB       | 70%     |
| Profile    | ~200 KB| ~60 KB       | 70%     |

## Implementation Checklist

- [ ] Convert all PNG/JPG to WebP
- [ ] Optimize remaining PNGs with pngquant
- [ ] Update image references in code
- [ ] Add fallback support for older browsers
- [ ] Test on all browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify dark mode compatibility
- [ ] Check mobile loading performance

## Browser Support

WebP is supported in:
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Edge 18+
- ✅ Safari 14+ (2020)
- ✅ Opera 12.1+

Fallback pattern:
```jsx
<picture>
  <source srcSet="/img/wallpaper.webp" type="image/webp" />
  <source srcSet="/img/wallpaper.png" type="image/png" />
  <img src="/img/wallpaper.png" alt="Wallpaper" />
</picture>
```

## Notes

- Keep original files in a `/src/assets/` folder as backups
- Commit optimized images to `/public/img/`
- Add `.webp` to `.gitignore` if generating dynamically
- Consider using a build tool to automate this process
