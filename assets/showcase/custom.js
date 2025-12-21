
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Page Loader
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('pageLoader').classList.add('loaded');
    }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio images for lightbox
const portfolioImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920',
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1920',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920',
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = portfolioImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = portfolioImages.length - 1;
    if (currentImageIndex >= portfolioImages.length) currentImageIndex = 0;
    document.getElementById('lightbox-img').src = portfolioImages[currentImageIndex];
}

// Close lightbox on outside click
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

// Portfolio filter
function filterPortfolio(category) {
    const tabs = document.querySelectorAll('.portfolio-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Testimonial slider
let currentTestimonial = 1;

function showTestimonial(num) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const buttons = document.querySelectorAll('.testimonial-nav button');

    testimonials.forEach(t => t.style.display = 'none');
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(`testimonial-${num}`).style.display = 'block';
    buttons[num - 1].classList.add('active');
    currentTestimonial = num;
}

// Auto rotate testimonials
setInterval(function () {
    currentTestimonial = currentTestimonial >= 3 ? 1 : currentTestimonial + 1;
    showTestimonial(currentTestimonial);
}, 5000);

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Form submission
function handleBookingSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit');

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }, 1500);
}

// Smooth scroll
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
