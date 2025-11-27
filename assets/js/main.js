// ===================================
// LUXESTATE REAL ESTATE TEMPLATE
// Main JavaScript File
// ===================================

// === MOBILE MENU TOGGLE ===
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === PARALLAX SCROLLING EFFECT ===
window.addEventListener('scroll', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    parallaxSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        section.style.backgroundPositionY = rate + 'px';
    });
});

// === SEARCH FORM TABS ===
const searchTabs = document.querySelectorAll('.search-tab');
const searchForm = document.getElementById('searchForm');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        searchTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get the data-type value
        const type = tab.getAttribute('data-type');
        
        // You can add custom logic here based on the type
        console.log(`Search type changed to: ${type}`);
    });
});

// === SEARCH FORM SUBMISSION ===
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const location = document.getElementById('location').value;
        const propertyType = document.getElementById('propertyType').value;
        const priceRange = document.getElementById('priceRange').value;
        const bedrooms = document.getElementById('bedrooms').value;
        
        // Get active tab type
        const activeTab = document.querySelector('.search-tab.active');
        const searchType = activeTab ? activeTab.getAttribute('data-type') : 'buy';
        
        // Create search parameters object
        const searchParams = {
            type: searchType,
            location: location,
            propertyType: propertyType,
            priceRange: priceRange,
            bedrooms: bedrooms
        };
        
        console.log('Search parameters:', searchParams);
        
        // Here you would typically:
        // 1. Filter the properties based on search criteria
        // 2. Update the properties grid
        // 3. Or redirect to a search results page
        
        // Example: Simple filtering (for demonstration)
        filterProperties(searchParams);
    });
}

// === PROPERTY FILTERING FUNCTION ===
function filterProperties(params) {
    const propertyCards = document.querySelectorAll('.property-card');
    let visibleCount = 0;
    
    propertyCards.forEach(card => {
        let shouldShow = true;
        
        // Filter by location (simple text match)
        if (params.location) {
            const locationText = card.querySelector('.property-location').textContent.toLowerCase();
            if (!locationText.includes(params.location.toLowerCase())) {
                shouldShow = false;
            }
        }
        
        // Filter by bedrooms
        if (params.bedrooms) {
            const bedroomsText = card.querySelector('.feature').textContent;
            const bedroomsCount = parseInt(bedroomsText);
            if (bedroomsCount < parseInt(params.bedrooms)) {
                shouldShow = false;
            }
        }
        
        // Show/hide card with animation
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, visibleCount * 50);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Scroll to properties section
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
        setTimeout(() => {
            propertiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    }
}

// === WISHLIST FUNCTIONALITY ===
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const svg = button.querySelector('svg path');
        const currentFill = svg.getAttribute('fill');
        
        if (currentFill === 'currentColor' || currentFill === '#c9a961') {
            // Remove from wishlist
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            console.log('Removed from wishlist');
        } else {
            // Add to wishlist
            svg.setAttribute('fill', '#c9a961');
            svg.setAttribute('stroke', '#c9a961');
            button.style.backgroundColor = '#c9a961';
            console.log('Added to wishlist');
        }
    });
});

// === SCROLL REVEAL ANIMATION ===
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Initial check for elements already in viewport
window.addEventListener('load', reveal);

// === PROPERTY CARD CLICK ===
const propertyCards = document.querySelectorAll('.property-card');

propertyCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if wishlist button was clicked
        if (e.target.closest('.wishlist-btn')) {
            return;
        }
        
        const propertyTitle = card.querySelector('.property-title').textContent;
        console.log(`Clicked on property: ${propertyTitle}`);
        
        // Here you would typically:
        // 1. Open a modal with property details
        // 2. Or redirect to a property detail page
        // For demo purposes, we'll just log it
        
        // Example: You could create a property detail modal
        // showPropertyDetails(card);
    });
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === FORM INPUT ANIMATIONS ===
const formInputs = document.querySelectorAll('.search-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// === PERFORMANCE: Debounce Function ===
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events for better performance
const debouncedReveal = debounce(reveal);
window.addEventListener('scroll', debouncedReveal);

// === CONSOLE LOG (Remove in production) ===
console.log('LuxeState Template Loaded Successfully ✓');
console.log('All interactive features initialized');
