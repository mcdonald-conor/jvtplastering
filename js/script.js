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

    // Auto-close mobile menu when clicking nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = contactForm.querySelector('input[name="email"]').value;
            const phone = contactForm.querySelector('input[name="phone"]').value;

            if (!email && !phone) {
                alert('Please provide either your email or phone number so we can get back to you.');
                return;
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you for your message. We will get back to you soon!');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Sorry, there was a problem sending your message. Please try again or contact us directly.');
                console.error('Form submission error:', error);
            }
        });
    }

    // Video loading optimization
    const video = document.querySelector('.hero-video');
    if (!video) return;

    // Add loading class initially
    video.classList.add('loading');

    // Function to handle video loading
    function handleVideoLoad() {
        // Remove loading class and add loaded class for smooth transition
        video.classList.remove('loading');
        video.classList.add('loaded');
    }

    // Function to ensure video plays
    function ensureVideoPlayback() {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Auto-play was prevented
                // Show play button or try to play again after user interaction
                document.addEventListener('touchstart', () => {
                    video.play();
                }, { once: true });
            });
        }
    }

    // Check if video is already loaded
    if (video.readyState >= 3) {
        handleVideoLoad();
        ensureVideoPlayback();
    } else {
        // Listen for when video can play through
        video.addEventListener('canplaythrough', () => {
            handleVideoLoad();
            ensureVideoPlayback();
        });
    }

    // Handle mobile devices and slow connections
    function checkConnection() {
        if (navigator.connection) {
            const connection = navigator.connection;

            // If on slow connection or mobile data, pause video
            if (connection.saveData ||
                connection.effectiveType === 'slow-2g' ||
                connection.effectiveType === '2g') {
                video.pause();
                video.removeAttribute('autoplay');
                video.preload = 'none';
                video.style.display = 'none';
            }
        }
    }

    // Check connection when available
    if ('connection' in navigator) {
        checkConnection();
        navigator.connection.addEventListener('change', checkConnection);
    }

    // Intersection Observer for lazy loading
    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Only load video when in viewport
                    if (video.preload === 'none') {
                        video.preload = 'auto';
                    }
                    ensureVideoPlayback();
                    videoObserver.unobserve(video);
                }
            });
        },
        {
            rootMargin: '50px 0px',
            threshold: 0.1
        }
    );

    videoObserver.observe(video);
});
