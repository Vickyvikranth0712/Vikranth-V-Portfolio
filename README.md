# Vikranth V - Portfolio Website

A professional, modern portfolio website showcasing IoT, Embedded Systems, and Software Development projects.

## 🎨 Color Scheme

### Dark Mode (Default)
- **Background**: #0D0D0D (Deep Black)
- **Accent**: #FF9500 (Amber Orange)
- **Text**: White (#FFFFFF)

### Light Mode
- **Background**: #FFF8F0 (Warm White)
- **Accent**: #FF9500 (Amber Orange)
- **Text**: Dark Gray (#1a1a1a)

## ✨ Features

### 1. **Hero Section**
- Large, animated name display (7rem font size)
- Word-by-word name animation
- Rotating job titles with typing effect
- Blinking cursor animation
- Minimal particle background
- Smooth scroll indicator

### 2. **About Section**
- Centered content layout
- Professional introduction
- Three main expertise areas:
  - IoT Development
  - Machine Learning
  - Embedded Systems

### 3. **Skills Section**
- Logo-based skill display with hover effects
- Organized by categories:
  - Programming Languages (Python, C)
  - Databases (MySQL)
  - Libraries (OpenCV, MediaPipe)
  - Tools & Platforms (Git, Firebase, VS Code)
  - Technologies (ML, IoT, Web Dev)
- Animated hover effects with scaling and glow

### 4. **Projects Section**
- **Two tabs**: Software & Hardware
- **Software Projects**: 2 placeholders with "View Code" button
- **Hardware Projects**: 3 placeholders with video and tech stack (no buttons)
- Zigzag layout (alternating left/right)
- Scroll-triggered fade-in animations

### 5. **Experience Section**
- Vertical timeline (top = most recent, bottom = start)
- 4 experience placeholders
- Animated dots and connecting line
- Responsive layout
- Scroll animations for each entry

### 6. **Certificates Section**
- Carousel with 5 certificate slots
- Previous/Next navigation buttons
- Auto-slide functionality
- Indicator dots

### 7. **Contact/Footer**
- Social media links (Email, LinkedIn, GitHub, Twitter, Instagram)
- Hover tooltips
- Professional layout

## 🚀 Additional Features

- ✅ **Dark/Light Mode Toggle** - Persistent theme switching
- ✅ **Resume Download** - Button in navbar
- ✅ **Responsive Design** - Works on all devices
- ✅ **Particle Background** - Animated particles with connections
- ✅ **Smooth Scrolling** - Enhanced navigation
- ✅ **Active Nav Highlighting**
- ✅ **Mobile Menu** - Hamburger menu
- ✅ **Cursor Trail Effect**
- ✅ **Scroll-to-Top Button**
- ✅ **Loading Animation**
- ✅ **Scroll-Triggered Animations** - Fade-in effects throughout

## 📝 How to Customize

### Upload Your Resume
Place your resume as `resume.pdf` in the root folder.

### Update Projects
1. Navigate to the Projects section in `index.html`
2. Click on the Software or Hardware tab section
3. Replace placeholder content with your project details
4. For videos: Replace the video-placeholder div with:
```html
<video controls>
    <source src="your-video.mp4" type="video/mp4">
</video>
```

### Update Experience
1. Find the Experience section in `index.html`
2. Replace placeholders from top (most recent) to bottom (start)
3. Update:
   - Date range
   - Position title
   - Company name
   - Description
   - Skills learned

### Update Certificates
1. Find the Certificates section in `index.html`
2. Replace the `cert-placeholder` div with:
```html
<img src="certificate-image.jpg" alt="Certificate">
```
3. Update certificate title, issuer, date, and credential link

### Update Social Media Links
In the footer section of `index.html`, update the `href` attributes:
- Email: `mailto:your.email@example.com`
- LinkedIn: `https://linkedin.com/in/yourprofile`
- GitHub: `https://github.com/yourprofile`
- Twitter: `https://twitter.com/yourprofile`
- Instagram: `https://instagram.com/yourprofile`

## 🎯 File Structure

```
Git Port/
├── index.html          # Main HTML file
├── styles.css          # All styling (Dark/Light themes)
├── script.js           # All JavaScript functionality
├── resume.pdf          # Your resume (to be added)
└── README.md          # This file
```

## 🌐 How to Use

1. **View Locally**: Simply open `index.html` in any modern web browser
2. **Deploy Online**: Upload to GitHub Pages, Netlify, Vercel, or any web host

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎨 Customization Tips

### Change Colors
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --bg-primary: #0D0D0D;
    --accent-gold: #FF9500;
    /* ... more variables */
}
```

### Adjust Animations
All animations are in `script.js`. You can modify:
- Typing speed
- Particle count and behavior
- Scroll animation thresholds
- Carousel auto-slide timing

### Modify Layout
All layouts use CSS Grid and Flexbox for easy customization in `styles.css`.

## 🔧 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

## 📞 Support

For questions or issues:
1. Check this README
2. Review the inline comments in the code
3. Test in different browsers

---

**Made with ❤️ by Vikranth V**  
*Electronics & Communication Engineering Student | IoT Developer | Embedded Systems Enthusiast*
