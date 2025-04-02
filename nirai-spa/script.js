// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu md:hidden bg-white w-full absolute top-20 left-0 shadow-lg';

// Create mobile menu content
mobileMenu.innerHTML = `
    <div class="py-4 px-6 space-y-4">
        <a href="#home" class="block nav-link glow-hover py-2">Home</a>
        <a href="#services" class="block nav-link glow-hover py-2">Services</a>
        <a href="#about" class="block nav-link glow-hover py-2">About</a>
        <a href="#contact" class="block nav-link glow-hover py-2">Contact</a>
        <a href="#" class="block px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 text-center">
            Book Now
        </a>
    </div>
`;

// Insert mobile menu after nav
document.querySelector('nav').appendChild(mobileMenu);

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with the 'animate-on-scroll' class
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form validation for contact page
if (window.location.pathname.includes('contact.html')) {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
            
            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Form submission logic would go here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('error-border');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-rose-500 text-sm mt-1';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '&uarr;';
backToTopButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 invisible flex items-center justify-center';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.add('opacity-0', 'invisible');
        backToTopButton.classList.remove('opacity-100', 'visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize any service carousels
if (document.querySelector('.service-carousel')) {
    // This would be implemented if we add carousels later
    // Currently using static content in the demo
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    img.onload = () => img.classList.remove('opacity-0');
    if (img.complete) img.classList.remove('opacity-0');
});