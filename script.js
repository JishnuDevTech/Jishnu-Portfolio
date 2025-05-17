document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Save theme preference
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Navbar background change on scroll
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active menu item on scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Back to top button visibility
        const backToTop = document.querySelector('.back-to-top');
        if (scrollPosition > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Section Animation on Scroll
    const animateSections = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateSections);
    
    // Call once on load
    animateSections();

    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor-typing');
    
    const textArray = ['Software Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Project Modal
    const modal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const projectDetailsTriggers = document.querySelectorAll('.project-details-trigger');
    
    const projectDetails = {
        'art-gallery': {
            title: 'Art Gallery Website',
            description: 'An elegant online platform showcasing various art pieces with detailed descriptions and artist information. The website features a clean, modern design with smooth transitions and animations to enhance user experience.',
            features: [
                'Responsive gallery layout',
                'Artist profiles and portfolios',
                'Artwork categorization and filtering',
                'Contact form for inquiries',
                'Admin panel for content management'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript'],
            screenshots: ['blog copy.png', 'art2.png']
        },
        'task-focus': {
            title: 'Daily Task Focus',
            description: 'A productivity application designed to help users manage their daily tasks and improve focus. The app employs the Pomodoro technique and provides analytics on productivity patterns.',
            features: [
                'Task management with priority settings',
                'Pomodoro timer integration',
                'Productivity analytics and reports',
                'Daily and weekly goal setting',
                'Notification and reminder system'
            ],
            technologies: ['HTML', 'CSS', 'Firebase', 'JAVA SCRIPT', 'TYPE SCRIPT'],
            screenshots: ['focus copy.png', 'focus2.png']
        },
        'task-flow': {
            title: 'Task Flow',
            description: 'An advanced task management application with workflow optimization features. The app helps teams track progress, assign tasks, and optimize their workflow through intuitive interfaces and automation.',
            features: [
                'Kanban board with drag-and-drop interface',
                'Team collaboration tools',
                'Automated workflow suggestions',
                'Time tracking and analytics',
                'Integration with other productivity tools'
            ],
            technologies: ['HTML', 'CSS', 'Firebase', 'JAVA SCRIPT',],
            screenshots: ['Screenshot 2025-04-18 at 5.01.48 PM copy.png', 'flow2.png']
        }
    };
    
    projectDetailsTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                let modalHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <h4>Key Features:</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <h4>Technologies Used:</h4>
                    <div class="tech-used">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <h4>Screenshots:</h4>
                    <div class="project-screenshots">
                        ${project.screenshots.map(screenshot => `
                            <div class="screenshot">
                                <img src="${screenshot}" alt="${project.title}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-buttons">
                        <a href="#" class="btn btn-primary">Visit Project</a>
                    </div>
                `;
                
                modalContent.innerHTML = modalHTML;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('open');
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modalContent.innerHTML = '';
            }, 300);
            document.body.style.overflow = '';
        }
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // You would normally send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });

    // Form Floating Labels
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input already has value (for autofill)
        if (input.value !== '') {
            input.parentElement.classList.add('active');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('active');
            }
        });
    });
});