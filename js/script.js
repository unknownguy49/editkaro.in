// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const videoModal = document.querySelector('.video-modal');
const videoFrame = document.getElementById('videoFrame');
const closeModal = document.querySelector('.close-modal');
const playBtns = document.querySelectorAll('.play-btn');
const contactForm = document.getElementById('contactForm');
const emailSubscriptionForm = document.getElementById('emailSubscriptionForm');
const header = document.querySelector('header');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialDots = document.querySelectorAll('.dot');
const prevTestimonial = document.querySelector('.prev-testimonial');
const nextTestimonial = document.querySelector('.next-testimonial');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Portfolio Filtering
if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Video Modal
if (playBtns.length > 0 && videoModal) {
    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get video URL
            const videoUrl = btn.getAttribute('data-video');
            
            // Set iframe src
            videoFrame.src = videoUrl;
            
            // Show modal
            videoModal.style.display = 'flex';
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        closeModal.parentElement.parentElement.style.display = 'none';
        
        // Reset iframe src to stop video
        videoFrame.src = '';
        
        // Enable body scroll
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            
            // Reset iframe src to stop video
            videoFrame.src = '';
            
            // Enable body scroll
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact Form Submission with Google Sheets Integration
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');
        
        // Simple form validation
        if (name && email && phone && subject && message) {
            // Show loading message
            formMessage.textContent = 'Sending your message...';
            formMessage.className = 'form-message';
            
            // Prepare data for Google Sheets
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('timestamp', new Date().toISOString());
            
            // Google Apps Script URL - Replace with your actual deployed Google Apps Script URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwqDf6kZqXaL7KaFnh2UmDyEX3UwK-rkIL4k89Bm8uORX70KW8ENKHhoc5ovaIkvD-g/exec';
            
            // Send data to Google Sheets
            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Success message
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.textContent = 'There was an error sending your message. Please try again later.';
                formMessage.className = 'form-message error';
            });
        } else {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
        }
    });
}

// Email Subscription Form with Google Sheets Integration
if (emailSubscriptionForm) {
    emailSubscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get email value
        const email = document.getElementById('subscriptionEmail').value;
        const subscriptionMessage = document.getElementById('subscriptionMessage');
        
        // Simple validation
        if (email) {
            // Show loading message
            subscriptionMessage.textContent = 'Processing your subscription...';
            subscriptionMessage.className = 'form-message';
            
            // Prepare data for Google Sheets
            const formData = new FormData();
            formData.append('email', email);
            formData.append('timestamp', new Date().toISOString());
            formData.append('source', 'newsletter_subscription');
            
            // Google Apps Script URL - Replace with your actual deployed Google Apps Script URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwqDf6kZqXaL7KaFnh2UmDyEX3UwK-rkIL4k89Bm8uORX70KW8ENKHhoc5ovaIkvD-g/exec';
            
            // Send data to Google Sheets
            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Success message
                    subscriptionMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    subscriptionMessage.className = 'form-message success';
                    
                    // Reset form
                    emailSubscriptionForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                subscriptionMessage.textContent = 'There was an error processing your subscription. Please try again later.';
                subscriptionMessage.className = 'form-message error';
            });
        } else {
            subscriptionMessage.textContent = 'Please enter a valid email address.';
            subscriptionMessage.className = 'form-message error';
        }
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// FAQ Accordion
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the selected slide
    testimonialSlides[index].classList.add('active');
    
    // Add active class to the corresponding dot
    testimonialDots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
}

if (testimonialDots.length > 0) {
    // Add click event to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

if (prevTestimonial && nextTestimonial) {
    // Previous button click
    prevTestimonial.addEventListener('click', () => {
        let index = currentSlide - 1;
        if (index < 0) {
            index = testimonialSlides.length - 1;
        }
        showSlide(index);
    });
    
    // Next button click
    nextTestimonial.addEventListener('click', () => {
        let index = currentSlide + 1;
        if (index >= testimonialSlides.length) {
            index = 0;
        }
        showSlide(index);
    });
    
    // Auto slide change
    setInterval(() => {
        let index = currentSlide + 1;
        if (index >= testimonialSlides.length) {
            index = 0;
        }
        showSlide(index);
    }, 5000);
}

// Initialize the page
window.addEventListener('load', () => {
    // If on portfolio page, set 'All' filter as active by default
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        // Show all portfolio items with animation
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Add animation to hero section if it exists
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroImage.style.transition = 'opacity 1s ease, transform 1s ease';
            
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 300);
    }
});