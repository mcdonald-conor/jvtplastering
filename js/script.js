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

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();

          // Validate that either email or phone is provided
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

  // Handle navbar background on scroll
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
});
