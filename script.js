// Smooth scrolling for navigation links (only for hash links, not external pages)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Get the section heading within the target section
            const sectionHeading = target.querySelector('.section-heading');
            
            // Calculate the scroll position to put the heading at the top with some padding
            let scrollPosition;
            if (sectionHeading) {
                // Get the absolute position of the heading relative to the document
                const headingRect = sectionHeading.getBoundingClientRect();
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                // Add padding to prevent heading from being cut off at the top
                scrollPosition = headingRect.top + currentScroll - 30;
            } else {
                // If no heading, scroll to the section top with padding
                const sectionRect = target.getBoundingClientRect();
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                scrollPosition = sectionRect.top + currentScroll - 30;
            }
            
            window.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link (only for hash links, not external pages)
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Publication filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        publicationItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Scroll animations for publications
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const publicationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

publicationItems.forEach(item => {
    publicationObserver.observe(item);
});

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Scroll animations for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animated statistics counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Animated metrics counter (for impact section)
function animateMetricCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateMetricCounter(entry.target, target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.metric-number').forEach(metric => {
    metricObserver.observe(metric);
});

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted', 'visible');
            const statItem = entry.target;
            const target = parseInt(statItem.getAttribute('data-target'));
            const numberElement = statItem.querySelector('.stat-minimal-number');
            if (numberElement) {
                animateCounter(numberElement, target);
            }
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.stat-minimal-item').forEach(stat => {
    statObserver.observe(stat);
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
