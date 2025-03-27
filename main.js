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
