// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    setupMobileNav();
    
    // Project modals
    setupProjectModals();
    
    // Animation on scroll
    setupScrollAnimations();
    
    // Accessibility enhancements
    setupAccessibility();
    
    // Theme toggle
    setupThemeToggle();
});

// Mobile Navigation
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle ARIA expanded state
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Initialize ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-links');
        navLinks.id = 'nav-links';
        
        // Close mobile menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu on escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Project Modal Functionality
function setupProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-project-btn');
    
    // Project data
    const projectData = {
        'body-measurement': {
            title: 'Body Measurement App',
            category: 'AI & Image Processing',
            inspiration: 'Inspired by the challenges of online shopping and finding the right fit, this app calculates accurate body measurements using a smartphone.',
            functionality: 'Processes images taken by a smartphone camera to generate precise body measurements, eliminating the need for manual measuring tools.',
            techStack: ['Python for backend image processing', 'JavaScript for front-end interface', 'Machine learning algorithms for accurate measurement calculations'],
            process: ['Data collection and model training', 'Implementation of real-time image processing', 'Responsive and accessible UI design'],
            accomplishments: ['Developed accurate image processing algorithms for body measurements', 'Created a user-friendly and responsive interface', 'Won 3rd place in a competitive hackathon'],
            learnings: ['AI implementation and image processing techniques', 'Real-world problem solving through AI-driven automation', 'Importance of usability and accessibility in app development']
        },
        'camgenx': {
            title: 'CamGenX',
            category: 'AI Image Generation',
            inspiration: 'The growing demand for custom content creation motivated the development of an AI-powered tool for generating unique, context-aware images.',
            functionality: 'CamGenX generates personalized, AI-powered images tailored to user inputs, aiding digital creators.',
            techStack: ['Python for AI model processing', 'JavaScript for UI/UX implementation'],
            process: ['Integrated pre-trained AI models', 'Designed seamless workflow from user input to output', 'Created an intuitive and interactive interface'],
            accomplishments: ['Built a fully functional AI-powered image generator in a short timeframe', 'Designed an engaging and intuitive UI', 'Ranked 10th place in a competitive hackathon'],
            learnings: ['Deepened understanding of AI models and image generation techniques', 'Strengthened front-end and back-end integration skills', 'Developed team collaboration skills in a hackathon setting']
        },
        'portfolio': {
            title: 'Portfolio Website',
            category: 'Web Development',
            inspiration: 'Created to showcase my skills, projects, and education in a professional and accessible manner.',
            functionality: 'Responsive design that adapts to different screen sizes with interactive features and dark/light mode.',
            techStack: ['HTML5 for semantic structure', 'CSS3 for modern styling and animations', 'Vanilla JavaScript for interactivity'],
            process: ['Designed responsive layout with mobile-first approach', 'Implemented accessibility features for all users', 'Added interactive elements like project modals and theme toggle'],
            accomplishments: ['Built a fully accessible website following WCAG standards', 'Created responsive design that works on all devices', 'Implemented dark mode with theme toggle'],
            learnings: ['Advanced CSS techniques for responsive design', 'JavaScript DOM manipulation for interactive features', 'Web accessibility best practices']
        }
    };
    
    // Open modal with project data

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Populate modal content
                modalBody.innerHTML = `
                    <div class="project-details">
                        <h2>${project.title}</h2>
                        <p class="project-category">${project.category}</p>
                        
                        <div class="project-section">
                            <h3>Inspiration</h3>
                            <p>${project.inspiration}</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Functionality</h3>
                            <p>${project.functionality}</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Tech Stack</h3>
                            <ul>
                                ${project.techStack.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Development Process</h3>
                            <ul>
                                ${project.process.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Key Accomplishments</h3>
                            <ul>
                                ${project.accomplishments.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Key Learnings</h3>
                            <ul>
                                ${project.learnings.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                
                // Open modal
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                
                // Set focus to the modal for accessibility
                closeBtn.focus();
                
                // Prevent scrolling on the body
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        // Return focus to the button that opened the modal
        const activeButton = document.querySelector('.view-project-btn:focus');
        if (activeButton) {
            activeButton.focus();
        }
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.section-title, .skill-category, .portfolio-item, .about-card, .timeline-item');
    
    // Add classes for animation
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run on initial load
    animateOnScroll();
    
    // Add event listener for scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Accessibility Enhancements
function setupAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);
    
    // Add role and aria-label to main sections
    const main = document.querySelector('main') || document.querySelector('header').nextElementSibling;
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
        main.setAttribute('aria-label', 'Main content');
    }
    
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    interactiveElements.forEach(element => {
        // Make sure elements have accessible focus states
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
        });
    });
    
    // Add aria-current to active navigation link
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        
        // Find the current section in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSectionId = section.id;
            }
        });
        
        // Update aria-current on nav links
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Announce theme change for screen readers
        const message = `Theme changed to ${newTheme} mode`;
        announceForScreenReader(message);
    });
    
    // Helper function to announce changes to screen readers
    function announceForScreenReader(message) {
        let announcement = document.getElementById('sr-announcement');
        
        if (!announcement) {
            announcement = document.createElement('div');
            announcement.id = 'sr-announcement';
            announcement.setAttribute('aria-live', 'polite');
            announcement.classList.add('sr-only');
            document.body.appendChild(announcement);
        }
        
        announcement.textContent = message;
    }
} 
