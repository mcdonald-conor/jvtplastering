// Handle hero image loading
document.addEventListener('DOMContentLoaded', () => {
    // Load hero background
    const hero = document.getElementById('hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('loaded');
        }, 100);
    }

    // Handle lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Use Intersection Observer for content visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.contentVisibility = 'visible';
                observer.unobserve(entry.target);
            }
        });
    });

    // Observe sections
    const sections = document.querySelectorAll('#services, #gallery, #contact');
    sections.forEach(section => observer.observe(section));
});

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Handle navbar background
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 50);
    }
}, { passive: true });
