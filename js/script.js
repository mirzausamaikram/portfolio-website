// Add a class to the header when the user scrolls down
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        const target = document.querySelector(targetSelector);
        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Avatar-triggered profile panel
const avatarTrigger = document.getElementById('avatar-trigger');
const avatarAboutPanel = document.getElementById('avatar-about-panel');

if (avatarTrigger && avatarAboutPanel) {
    let hoverCloseTimer;
    const isTapOnlyMode = () => {
        return window.matchMedia('(max-width: 768px), (hover: none), (pointer: coarse)').matches;
    };

    const openProfile = () => {
        clearTimeout(hoverCloseTimer);
        avatarAboutPanel.classList.add('is-open');
        avatarAboutPanel.setAttribute('aria-hidden', 'false');
        avatarTrigger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('profile-open');
    };

    const closeProfile = () => {
        clearTimeout(hoverCloseTimer);
        avatarAboutPanel.classList.remove('is-open');
        avatarAboutPanel.setAttribute('aria-hidden', 'true');
        avatarTrigger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('profile-open');
    };

    const closeProfileWithDelay = () => {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = setTimeout(() => {
            closeProfile();
        }, 120);
    };

    avatarTrigger.addEventListener('mouseenter', () => {
        if (isTapOnlyMode()) return;
        openProfile();
    });

    avatarTrigger.addEventListener('mouseleave', () => {
        if (isTapOnlyMode()) return;
        closeProfileWithDelay();
    });

    avatarAboutPanel.addEventListener('mouseenter', () => {
        if (isTapOnlyMode()) return;
        clearTimeout(hoverCloseTimer);
        openProfile();
    });

    avatarAboutPanel.addEventListener('mouseleave', () => {
        if (isTapOnlyMode()) return;
        closeProfileWithDelay();
    });

    avatarTrigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = avatarAboutPanel.classList.contains('is-open');
        if (isOpen) {
            closeProfile();
        } else {
            openProfile();
        }
    });

    avatarAboutPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', () => {
        closeProfile();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeProfile();
        }
    });
}

// Reveal elements on scroll
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Add a gentle 3D tilt on project cards
document.querySelectorAll('.project-card').forEach(card => {
    const reset = () => { card.style.transform = ''; };

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 6;
        card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', reset);
});

// Animate skill progress bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                    bar.classList.add('animate');
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    htmlElement.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-mode');
    
    // Update icon and save preference
    if (htmlElement.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated Counter for Stats
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 50; // Adjust speed
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
            statObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statObserver.observe(statsSection);
}

// Featured projects carousel + modal
const featuredProjectsData = {
    'climate-loop': {
        title: 'Climate Loop - Vertical Energy Coordination for HK High-Rises',
        image: 'images/Climate-loop.png',
        description: 'Climate Loop coordinates air-conditioning cycles across high-rise apartments to reduce grid stress and resident energy costs. The platform combines 3D thermal visualization, weather integration, and optimization logic to make energy savings easy to understand and act on.',
        tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Three Fiber', 'Flask', 'Python', 'pytest'],
        github: 'https://github.com/mirzausamaikram/climate-loop',
        demo: ''
    },
    'microclimate': {
        title: 'MicroClimate HK - Hyperlocal Weather Web App',
        image: 'images/microclimate-hk.png',
        description: 'MicroClimate HK delivers hyperlocal forecasts with 3D map overlays and geospatial insights. It includes forecast comparisons, weather alerts, and interactive visual layers backed by a high-performance backend architecture.',
        tech: ['SvelteKit 2', 'TypeScript', 'Vite 5', 'Deck.gl', 'FastAPI', 'TimescaleDB', 'Redis', 'Docker'],
        github: 'https://github.com/mirzausamaikram/microclimate-hk',
        demo: ''
    },
    'goodclass': {
        title: 'GoodClass.AI',
        image: 'images/Good_Class.jpeg',
        description: 'Built during the JPMorgan Career LaunchPad Program, this AI-focused work involved developing practical backend capabilities for a real-world learning product. The project earned recognition through the JPMorgan Gold Prize Scholarship.',
        tech: ['Python', 'Gemini API', 'REST APIs', 'AI/ML'],
        github: '',
        demo: ''
    },
    'mrsmart': {
        title: 'MRsmartinspector',
        image: 'images/MRinspectorApp.png',
        description: 'MRsmartinspector is an AR/VR workplace safety solution built for Apple Vision Pro. It enables immersive inspection workflows and demonstrates practical spatial computing design in a fast-paced internship setting.',
        tech: ['Swift', 'VisionOS', 'Xcode'],
        github: 'https://github.com/mirzausamaikram/MRSmartApp',
        demo: ''
    },
    'ecommerce': {
        title: 'Smile & Sunshine E-Commerce Platform',
        image: 'images/Smile & Sunshine E-Commerce Platform.png',
        description: 'A polished e-commerce experience with dual user interfaces and persistent state handling. The system focuses on usability and role-aware interactions without relying on backend infrastructure for core flow persistence.',
        tech: ['JavaScript', 'jQuery', 'localStorage', 'Responsive Design'],
        github: 'https://github.com/mirzausamaikram/Project_ITP4506',
        demo: ''
    },
    'php-app': {
        title: 'Dynamic Web Application',
        image: 'images/PHP_Project.png',
        description: 'A multi-service web architecture that links a PHP frontend, MySQL data layer, and Flask microservices. The project emphasizes service integration, data consistency, and robust error handling across systems.',
        tech: ['PHP', 'MySQL', 'Flask', 'REST API'],
        github: 'https://github.com/mirzausamaikram/PHP_Backend_Project',
        demo: ''
    }
};

const projectsTrack = document.getElementById('projects-track');
const projectsPrevBtn = document.getElementById('projects-prev');
const projectsNextBtn = document.getElementById('projects-next');
const projectsDots = document.getElementById('projects-dots');
const featuredProjectCards = projectsTrack ? Array.from(projectsTrack.querySelectorAll('.featured-project-card')) : [];

let projectIndex = 0;

const getCardsPerView = () => {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
};

const getMaxProjectIndex = () => Math.max(0, featuredProjectCards.length - getCardsPerView());

const renderProjectDots = () => {
    if (!projectsDots) return;
    const maxIndex = getMaxProjectIndex();
    projectsDots.innerHTML = '';

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === projectIndex ? 'active' : ''}`;
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to project slide ${i + 1}`);
        dot.addEventListener('click', () => {
            projectIndex = i;
            updateProjectCarousel();
        });
        projectsDots.appendChild(dot);
    }
};

const updateProjectCarousel = () => {
    if (!projectsTrack || featuredProjectCards.length === 0) return;

    const maxIndex = getMaxProjectIndex();
    projectIndex = Math.min(projectIndex, maxIndex);
    const firstCard = featuredProjectCards[0];
    const trackStyles = window.getComputedStyle(projectsTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0');
    const offset = projectIndex * (firstCard.offsetWidth + gap);

    projectsTrack.style.transform = `translateX(-${offset}px)`;

    if (projectsPrevBtn) projectsPrevBtn.disabled = projectIndex <= 0;
    if (projectsNextBtn) projectsNextBtn.disabled = projectIndex >= maxIndex;

    Array.from(projectsDots ? projectsDots.children : []).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === projectIndex);
    });
};

if (projectsTrack && projectsPrevBtn && projectsNextBtn) {
    renderProjectDots();
    updateProjectCarousel();

    projectsPrevBtn.addEventListener('click', () => {
        projectIndex = Math.max(0, projectIndex - 1);
        updateProjectCarousel();
    });

    projectsNextBtn.addEventListener('click', () => {
        projectIndex = Math.min(getMaxProjectIndex(), projectIndex + 1);
        updateProjectCarousel();
    });

    window.addEventListener('resize', () => {
        renderProjectDots();
        updateProjectCarousel();
    });
}

const projectModal = document.getElementById('project-modal');
const projectModalBackdrop = document.getElementById('project-modal-backdrop');
const projectModalClose = document.getElementById('project-modal-close');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalImage = document.getElementById('project-modal-image');
const projectModalDescription = document.getElementById('project-modal-description');
const projectModalTech = document.getElementById('project-modal-tech');
const projectModalLinks = document.getElementById('project-modal-links');

const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
};

const openProjectModal = (projectId) => {
    const project = featuredProjectsData[projectId];

    if (!project || !projectModal) return;

    projectModalTitle.textContent = project.title;
    projectModalImage.src = project.image;
    projectModalImage.alt = `${project.title} preview`;
    projectModalDescription.textContent = project.description;

    projectModalTech.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');

    const links = [];
    if (project.demo) {
        links.push(`<a class="primary" href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>`);
    }
    if (project.github) {
        links.push(`<a class="secondary" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
    }
    if (links.length === 0) {
        links.push('<span class="project-modal-kicker">Proprietary project details are limited.</span>');
    }

    projectModalLinks.innerHTML = links.join('');

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    projectModal.scrollTop = 0;
};

featuredProjectCards.forEach(card => {
    const projectId = card.getAttribute('data-project-id');

    card.addEventListener('click', (event) => {
        event.preventDefault();
        openProjectModal(projectId);
    });
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProjectModal(projectId);
        }
    });
});

if (projectModalClose && projectModalBackdrop) {
    projectModalClose.addEventListener('click', closeProjectModal);
    projectModalBackdrop.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Work experience timeline interactions
const workExpTabs = Array.from(document.querySelectorAll('.workexp-company'));
const workExpDetails = document.getElementById('workexp-details');
const workExpRole = document.getElementById('workexp-role');
const workExpPeriod = document.getElementById('workexp-period');
const workExpLocation = document.getElementById('workexp-location');
const workExpPoints = document.getElementById('workexp-points');
const workExpMediaWrap = document.getElementById('workexp-media-wrap');
const workExpImage = document.getElementById('workexp-image');

if (workExpTabs.length > 0 && workExpDetails && workExpRole && workExpPeriod && workExpLocation && workExpPoints) {
    const renderWorkExpDetails = (tab) => {
        if (!tab) return;

        workExpTabs.forEach((button) => {
            const isActive = button === tab;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        const points = (tab.dataset.points || '').split('||').map((item) => item.trim()).filter(Boolean);

        workExpDetails.classList.add('is-refreshing');
        workExpRole.textContent = tab.dataset.role || '';
        workExpPeriod.textContent = tab.dataset.period || '';
        workExpLocation.textContent = tab.dataset.location || '';
        workExpPoints.innerHTML = points.map((item) => `<li>${item}</li>`).join('');

        if (workExpImage && workExpMediaWrap) {
            const imageSrc = tab.dataset.image || '';
            const imageAlt = tab.dataset.imageAlt || 'Work experience image';
            if (imageSrc) {
                workExpImage.src = imageSrc;
                workExpImage.alt = imageAlt;
                workExpMediaWrap.hidden = false;
            } else {
                workExpMediaWrap.hidden = true;
            }
        }

        window.setTimeout(() => {
            workExpDetails.classList.remove('is-refreshing');
        }, 180);
    };

    workExpTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            renderWorkExpDetails(tab);
        });

        tab.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                renderWorkExpDetails(tab);
            }
        });
    });

    renderWorkExpDetails(workExpTabs.find((tab) => tab.classList.contains('is-active')) || workExpTabs[0]);
}