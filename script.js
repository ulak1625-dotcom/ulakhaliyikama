// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Gallery Data and Functionality
const galleryData = [
    {
        id: 1,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-1.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    },
    {
        id: 2,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-2.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    },
    {
        id: 3,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-3.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    },
    {
        id: 4,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-4.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    },
    {
        id: 5,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-5.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    },
    {
        id: 6,
        title: 'Halı Yıkama',
        category: 'all',
        image: 'images/hali-6.jpg',
        description: 'Profesyonel halı yıkama hizmeti'
    }
];

// Gerçek fotoğraflar kullanılıyor - placeholder kodu kaldırıldı

// Gallery Filter and Display Functions
function renderGallery(items) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-overlay-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;

        // Add click event for lightbox (future enhancement)
        galleryItem.addEventListener('click', function() {
            console.log('Gallery item clicked:', item.title);
            // Here you could implement a lightbox modal
        });

        galleryGrid.appendChild(galleryItem);
    });
}

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            let filteredItems = galleryData;
            
            if (filterValue !== 'all') {
                filteredItems = galleryData.filter(item => 
                    item.category === filterValue || item.subcategory === filterValue
                );
            }
            
            // Render filtered items
            renderGallery(filteredItems);
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !phone || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Phone number validation (Turkish format)
        const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Lütfen geçerli bir telefon numarası girin.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<div class="loading"></div> Gönderiliyor...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .gallery-item, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Format as Turkish phone number
    if (value.length >= 10) {
        if (value.startsWith('90')) {
            value = '+' + value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 10) + ' ' + value.slice(10, 12);
        } else if (value.startsWith('0')) {
            value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
        } else if (value.length === 10) {
            value = '0' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
        }
    }
    
    input.value = value;
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    renderGallery(galleryData);
    initGalleryFilter();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize parallax effect
    initParallax();
    
    // Add phone number formatting to phone input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Add smooth reveal animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
});

// Utility Functions

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }, 100));
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTopButton();
});

// Console welcome message
console.log('%cUlak Halı Yıkama 🧽', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cProfesyonel halı temizlik hizmeti', 'color: #764ba2; font-size: 14px;');
