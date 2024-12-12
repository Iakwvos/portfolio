// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Handle mobile menu
    initializeMobileMenu();
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Add smooth scrolling for navigation links
    initializeSmoothScroll();

    // Initialize header scroll behavior
    initializeHeaderBehavior();
});

// Initialize animations
function initializeAnimations() {
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe elements that should animate
    document.querySelectorAll('.project-card, .timeline-content, .contact-info, .contact-form').forEach(element => {
        observer.observe(element);
    });
}

// Initialize header behavior
function initializeHeaderBehavior() {
    const header = document.querySelector('.navbar');
    let lastScroll = 0;
    let headerVisible = true;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Show/hide header based on scroll direction
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down & past header
                    if (headerVisible) {
                        header.style.transform = 'translateY(-100%)';
                        headerVisible = false;
                    }
                } else {
                    // Scrolling up
                    if (!headerVisible) {
                        header.style.transform = 'translateY(0)';
                        headerVisible = true;
                    }
                }

                // Update header background opacity
                const scrollProgress = Math.min(currentScroll / 100, 1);
                header.style.backgroundColor = `rgba(10, 10, 10, ${0.8 + (scrollProgress * 0.2)})`;
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Handle mobile menu
function initializeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbarToggler || !navbarCollapse) return;

    // Function to close menu
    function closeMenu() {
        navbarCollapse.classList.remove('show');
        document.body.classList.remove('menu-open');
        navbarToggler.setAttribute('aria-expanded', 'false');
    }

    // Function to open menu
    function openMenu() {
        navbarCollapse.classList.add('show');
        document.body.classList.add('menu-open');
        navbarToggler.setAttribute('aria-expanded', 'true');
    }

    // Toggle menu
    navbarToggler.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navbarCollapse.classList.contains('show')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarCollapse.classList.contains('show') && 
            !navbarCollapse.contains(e.target) && 
            !navbarToggler.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Prevent menu from closing when clicking inside
    navbarCollapse.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Update active link on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;

                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        const targetLink = document.querySelector(`a[href="#${section.id}"]`);
                        if (targetLink) {
                            navLinks.forEach(link => link.classList.remove('active'));
                            targetLink.classList.add('active');
                        }
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeMenu();
        }
    });
}

// Initialize smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20, // Additional 20px padding
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle form submission with loading state
async function handleFormSubmit(e) {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    // Add loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic form validation
    if (!validateForm(data)) {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        return;
    }

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showMessage('Message sent successfully!', 'success');
        
        // Reset form
        e.target.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('Failed to send message. Please try again.', 'error');
    } finally {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Form validation
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }

    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    }

    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }

    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message with animation
function showMessage(message, type = 'success') {
    // Remove any existing message
    const existingMessage = document.querySelector('.message-alert');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `alert alert-${type === 'success' ? 'success' : 'danger'} message-alert`;
    messageElement.innerHTML = message;
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(-10px)';

    // Insert message before the form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form);

    // Trigger animation
    requestAnimationFrame(() => {
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    });

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

// Handle scroll performance
let ticking = false;
document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Handle scroll animations
function handleScroll() {
    // Update navbar background opacity based on scroll
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    navbar.style.backgroundColor = `rgba(10, 10, 10, ${scrolled ? '0.95' : '0.8'})`;
    
    // Add shadow on scroll
    navbar.style.boxShadow = scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none';
} 