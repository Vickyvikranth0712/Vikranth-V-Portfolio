// ==========================================
// Dynamic Favicon Generator
// ==========================================
function generateLuxuryMinimalFavicon() {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    const BLACK = '#000000';
    const AMBER = '#ffbf00';
    const AMBER_LIGHT = '#ffd700';
    const AMBER_DARK = '#ff9500';
    
    // Black background with subtle gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#000000');
    bgGrad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Subtle amber circle accent
    const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 100);
    gradient.addColorStop(0, AMBER + '15');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(w/2, h/2, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Elegant amber ring
    ctx.strokeStyle = AMBER;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w/2, h/2, 95, 0, Math.PI * 2);
    ctx.stroke();
    
    // Inner accent ring
    ctx.strokeStyle = AMBER_LIGHT;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w/2, h/2, 88, 0, Math.PI * 2);
    ctx.stroke();
    
    // Letter V with gradient
    const textGrad = ctx.createLinearGradient(w/2 - 60, h/2 - 60, w/2 + 60, h/2 + 60);
    textGrad.addColorStop(0, AMBER_LIGHT);
    textGrad.addColorStop(0.5, AMBER);
    textGrad.addColorStop(1, AMBER_DARK);
    ctx.fillStyle = textGrad;
    ctx.font = 'bold 140px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('V', w/2, h/2 + 8);
    
    // Convert to data URL and set as favicon
    const faviconUrl = canvas.toDataURL('image/png');
    
    // Set favicon
    const faviconLink = document.getElementById('dynamic-favicon');
    if (faviconLink) {
        faviconLink.href = faviconUrl;
    }
    
    // Set apple touch icon
    const appleTouchIcon = document.getElementById('apple-touch-icon');
    if (appleTouchIcon) {
        appleTouchIcon.href = faviconUrl;
    }
}

// ==========================================
// Global Variables
// ==========================================
let currentCertificate = 0;
const totalCertificates = 4;

// ==========================================
// New Project Carousel System
// ==========================================
const newProjectCarousels = {};
const PROJECT_AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

// Initialize all new project carousels
function initializeNewProjectCarousels() {
    // Find all carousel containers
    for (let i = 1; i <= 5; i++) {
        const container = document.getElementById(`carousel-${i}`);
        if (!container) continue;
        
        const images = container.querySelectorAll('.carousel-img');
        const dotsContainer = document.getElementById(`dots-${i}`);
        
        newProjectCarousels[i] = {
            currentSlide: 0,
            totalSlides: images.length,
            autoScrollTimer: null
        };
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let j = 0; j < images.length; j++) {
                const dot = document.createElement('span');
                dot.className = 'dot' + (j === 0 ? ' active' : '');
                dot.onclick = () => goToProjectSlide(i, j);
                dotsContainer.appendChild(dot);
            }
        }
        
        // Auto-scroll disabled - manual navigation only
    }
}

// Change slide (called by arrow buttons)
function changeProjectSlide(carouselIndex, direction) {
    const carousel = newProjectCarousels[carouselIndex];
    if (!carousel) return;
    
    carousel.currentSlide += direction;
    
    // Loop around
    if (carousel.currentSlide >= carousel.totalSlides) {
        carousel.currentSlide = 0;
    } else if (carousel.currentSlide < 0) {
        carousel.currentSlide = carousel.totalSlides - 1;
    }
    
    updateProjectCarousel(carouselIndex);
    resetProjectAutoScroll(carouselIndex);
}

// Go to specific slide (called by dots)
function goToProjectSlide(carouselIndex, slideIndex) {
    if (!newProjectCarousels[carouselIndex]) return;
    newProjectCarousels[carouselIndex].currentSlide = slideIndex;
    updateProjectCarousel(carouselIndex);
    resetProjectAutoScroll(carouselIndex);
}

// Update carousel display
function updateProjectCarousel(carouselIndex) {
    const container = document.getElementById(`carousel-${carouselIndex}`);
    const dotsContainer = document.getElementById(`dots-${carouselIndex}`);
    const carousel = newProjectCarousels[carouselIndex];
    
    if (!container || !carousel) return;
    
    const images = container.querySelectorAll('.carousel-img');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    
    // Update images
    images.forEach((img, index) => {
        img.classList.toggle('active', index === carousel.currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carousel.currentSlide);
    });
}

// Start auto-scroll for a carousel
function startProjectAutoScroll(carouselIndex) {
    const carousel = newProjectCarousels[carouselIndex];
    if (!carousel) return;
    
    carousel.autoScrollTimer = setInterval(() => {
        carousel.currentSlide = (carousel.currentSlide + 1) % carousel.totalSlides;
        updateProjectCarousel(carouselIndex);
    }, PROJECT_AUTO_SCROLL_INTERVAL);
}

// Reset auto-scroll timer
function resetProjectAutoScroll(carouselIndex) {
    const carousel = newProjectCarousels[carouselIndex];
    if (!carousel) return;
    
    if (carousel.autoScrollTimer) {
        clearInterval(carousel.autoScrollTimer);
    }
    startProjectAutoScroll(carouselIndex);
}

// Legacy function - keep for backward compatibility
function initializeProjectCarousels() {
    initializeNewProjectCarousels();
}

function setupCarouselHoverPause() {
    // Handled in initializeNewProjectCarousels
}

// ==========================================
// Particle Background Animation
// ==========================================
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get theme color
        const isLight = document.body.getAttribute('data-theme') === 'light';
        const goldColor = isLight ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 149, 0, 0.3)';
        const lineColor = isLight ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 149, 0, 0.1)';

        // Draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.fillStyle = goldColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.strokeStyle = lineColor;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}



// ==========================================
// Dark/Light Mode Toggle
// ==========================================
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ==========================================
// Smooth Scroll & Active Navigation
// ==========================================
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// Active Navigation Highlighting - Removed (No nav links)
// ==========================================

// ==========================================
// Navbar Scroll Effect - Removed (Navbar stays consistent)
// ==========================================

// ==========================================
// Mobile Menu Toggle - Removed (Navbar is now minimal)
// ==========================================

// ==========================================
// Skills Progress Animation (Removed - Not needed anymore)
// ==========================================
// Skills now use logo hover effects only

// ==========================================
// Project Tabs
// ==========================================
function setupProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// ==========================================
// Scroll Animations (Improved)
// ==========================================
function setupScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos], [data-scroll-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute('data-aos')) {
                    entry.target.classList.add('aos-animate');
                }
                if (entry.target.hasAttribute('data-scroll-animation')) {
                    entry.target.classList.add('animate-in');
                }
                // Stop observing after animation is triggered (play once only)
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ==========================================
// Project Tabs
// ==========================================
function setupProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// ==========================================
// Certificate Carousel
// ==========================================
function setupCertificateCarousel() {
    const track = document.getElementById('certificateTrack');
    const prevBtn = document.getElementById('prevCert');
    const nextBtn = document.getElementById('nextCert');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const certificates = document.querySelectorAll('.certificate-card');
    
    // Create indicators
    for (let i = 0; i < totalCertificates; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    function updateCarousel() {
        // Update certificates
        certificates.forEach((cert, index) => {
            cert.classList.remove('active');
            if (index === currentCertificate) {
                cert.classList.add('active');
            }
        });
        
        // Update indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentCertificate) {
                indicator.classList.add('active');
            }
        });
        
        // Slide animation
        track.style.transform = `translateX(-${currentCertificate * 100}%)`;
    }
    
    function goToSlide(index) {
        currentCertificate = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        currentCertificate = (currentCertificate - 1 + totalCertificates) % totalCertificates;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentCertificate = (currentCertificate + 1) % totalCertificates;
        updateCarousel();
    });
}



// ==========================================
// Timeline Path Animation (Removed - Using vertical timeline now)
// ==========================================
// Vertical timeline uses scroll animations instead

// ==========================================
// Resume Download
// ==========================================
function setupResumeDownload() {
    const resumeBtn = document.getElementById('resumeBtn');
    
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if resume file exists
        const resumePath = 'resume.pdf'; // User should place their resume.pdf in the root folder
        
        // Check if file exists and open in new tab
        fetch(resumePath)
            .then(response => {
                if (response.ok) {
                    window.open(resumePath, '_blank');
                } else {
                    alert('Resume file not found. Please upload your resume as "resume.pdf" in the root folder.');
                }
            })
            .catch(() => {
                alert('Resume file not found. Please upload your resume as "resume.pdf" in the root folder.');
            });
    });
}

// ==========================================
// Scroll to Top Button (Hidden initially)
// ==========================================
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
        color: #000;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px var(--shadow);
    `;
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'all';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 10px 30px var(--shadow-hover)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 5px 20px var(--shadow)';
    });
}

// ==========================================
// Preloader (Optional)
// ==========================================
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-family: 'Montserrat', sans-serif; font-size: 3rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 1rem;">VV</div>
            <div style="width: 50px; height: 50px; border: 4px solid var(--border-color); border-top-color: var(--accent-gold); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// ==========================================
// Video Autoplay on Scroll
// ==========================================
function setupVideoAutoplay() {
    const videos = document.querySelectorAll('.project-video video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Video is in view - play it
                video.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            } else {
                // Video is out of view - pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Video must be 50% visible to play
    });
    
    videos.forEach(video => {
        observer.observe(video);
    });
}

// ==========================================
// Initialize All Functions
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Generate dynamic favicon
    generateLuxuryMinimalFavicon();
    
    // Create preloader
    createPreloader();
    
    // Initialize particle background
    new ParticleBackground();
    
    // Setup theme toggle
    setupThemeToggle();
    
    // Setup navigation
    setupSmoothScroll();
    
    // Setup animations
    setupScrollAnimations();
    
    // Initialize project carousels
    initializeProjectCarousels();
    setupCarouselHoverPause();
    
    // Setup certificate carousel
    setupCertificateCarousel();
    
    // Setup resume download
    setupResumeDownload();
    
    // Create scroll to top button
    createScrollTopButton();
    
    console.log('Portfolio loaded successfully! ✨');
    console.log('Made with ❤️ by Vikranth V');
});

// ==========================================
// Handle Window Resize - Removed (No mobile menu)
// ==========================================
