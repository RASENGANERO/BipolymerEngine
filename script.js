// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Language switching functionality
const languageSelect = document.getElementById('languageSelect');
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-en][data-de]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    if (lang === 'de') {
        document.title = 'LIFE BipolymerEngine - Abwärmerückgewinnung Innovation';
    } else {
        document.title = 'LIFE BipolymerEngine - Waste Heat Recovery Innovation';
    }
}

if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
    });
}

// Initialize with English
switchLanguage('en');

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .partner-card, .result-card, .download-card, .news-card').forEach(card => {
    observer.observe(card);
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Counter animation for result numbers
function animateCounters() {
    const counters = document.querySelectorAll('.result-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^\d.]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('<')) {
                counter.textContent = `<${Math.floor(current)}`;
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when results section is visible
const resultsSection = document.querySelector('#results');
if (resultsSection) {
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                resultsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    resultsObserver.observe(resultsSection);
}

