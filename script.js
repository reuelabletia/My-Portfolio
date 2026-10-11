document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Mobile Menu Elements
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    function toggleMobileMenu() {
        if (!navMenu) return;
        const isOpen = navMenu.classList.toggle('active');
        if (mobileNavToggle) {
            mobileNavToggle.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
        }
        if (navBackdrop) {
            navBackdrop.classList.toggle('active');
        }
        document.body.classList.toggle('no-scroll', isOpen);
    }

    function closeMobileMenu() {
        if (!navMenu) return;
        navMenu.classList.remove('active');
        if (mobileNavToggle) {
            mobileNavToggle.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
        if (navBackdrop) {
            navBackdrop.classList.remove('active');
        }
        document.body.classList.remove('no-scroll');
    }

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileMenu);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // 2. Safe Smooth Scrolling (Prevents '#' Selector Syntax Errors & Dynamic Header Offset)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    closeMobileMenu();

                    if (targetId === 'hero') {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        const header = document.querySelector('.header');
                        const headerOffset = header ? header.offsetHeight + 16 : 86;
                        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = Math.max(0, elementPosition - headerOffset);

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // 3. ScrollSpy Active State for Navigation
    const trackedSections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = (window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0) + 120;

        trackedSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            document.querySelectorAll('.nav-menu a, .nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { passive: true });

    // 4. Dark / Light Theme Toggle with LocalStorage
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (savedTheme === 'light-mode') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            if (isDark) {
                body.classList.remove('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.add('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // 5. View More / Show Less Projects Toggle
    const toggleProjectsBtn = document.getElementById('toggle-projects-btn');
    const extraProjects = document.querySelectorAll('.extra-project');

    if (toggleProjectsBtn && extraProjects.length > 0) {
        let expanded = false;
        toggleProjectsBtn.addEventListener('click', () => {
            expanded = !expanded;
            extraProjects.forEach(card => {
                if (expanded) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            });

            const btnText = toggleProjectsBtn.querySelector('.btn-text');
            const btnIcon = toggleProjectsBtn.querySelector('.toggle-icon');

            if (expanded) {
                if (btnText) btnText.textContent = 'Show Less Projects';
                if (btnIcon) btnIcon.classList.add('rotate');
            } else {
                if (btnText) btnText.textContent = 'View More Projects';
                if (btnIcon) btnIcon.classList.remove('rotate');

                const targetGroup = toggleProjectsBtn.closest('.project-group') || document.getElementById('designblue-group');
                if (targetGroup) {
                    const header = document.querySelector('.header');
                    const headerOffset = header ? header.offsetHeight + 16 : 86;
                    const elementPosition = targetGroup.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: Math.max(0, elementPosition - headerOffset),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // 5.1 View More / Show Less Certifications Toggle
    const toggleCertsBtn = document.getElementById('toggle-certs-btn');
    const extraCerts = document.querySelectorAll('.extra-cert');

    if (toggleCertsBtn && extraCerts.length > 0) {
        let certsExpanded = false;
        toggleCertsBtn.addEventListener('click', () => {
            certsExpanded = !certsExpanded;
            extraCerts.forEach(card => {
                if (certsExpanded) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            });

            const btnText = toggleCertsBtn.querySelector('.btn-text');
            const btnIcon = toggleCertsBtn.querySelector('.toggle-icon');

            if (certsExpanded) {
                if (btnText) btnText.textContent = 'Show Less Certificates';
                if (btnIcon) btnIcon.classList.add('rotate');
            } else {
                if (btnText) btnText.textContent = 'View More Certificates';
                if (btnIcon) btnIcon.classList.remove('rotate');

                const certSection = document.getElementById('certifications');
                if (certSection) {
                    const header = document.querySelector('.header');
                    const headerOffset = header ? header.offsetHeight + 16 : 86;
                    const elementPosition = certSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: Math.max(0, elementPosition - headerOffset),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // 6. Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail-link');
    const closeVideoBtn = document.querySelector('.video-modal-close');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = thumbnail.getAttribute('data-video-id');
            if (videoId && youtubeIframe && videoModal) {
                youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.classList.remove('active');
        if (youtubeIframe) {
            youtubeIframe.src = '';
        }
        document.body.classList.remove('no-scroll');
    }

    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', closeVideoModal);
    }

    // 7. Testimonial "Read More" Modal Logic
    const testimonialModal = document.getElementById('testimonialModal');
    const closeTestimonialBtn = document.querySelector('.testimonial-modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    const modalName = document.getElementById('modal-author-name');
    const modalRole = document.getElementById('modal-author-role');
    const modalText = document.getElementById('modal-full-text');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.testimonial-card');
            if (!card) return;

            const textEl = card.querySelector('.testimonial-text');
            const fullParagraph = textEl ? textEl.textContent.trim() : '';

            if (modalName) modalName.textContent = this.getAttribute('data-name') || '';
            if (modalRole) modalRole.textContent = this.getAttribute('data-role') || '';
            if (modalText) modalText.textContent = fullParagraph;

            if (testimonialModal) {
                testimonialModal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    function closeTestimonialModal() {
        if (!testimonialModal) return;
        testimonialModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (closeTestimonialBtn) {
        closeTestimonialBtn.addEventListener('click', closeTestimonialModal);
    }

    // 8. Global Modal Dismissal (Backdrop Click & ESC Key)
    window.addEventListener('click', (e) => {
        if (videoModal && e.target === videoModal) closeVideoModal();
        if (testimonialModal && e.target === testimonialModal) closeTestimonialModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (videoModal && videoModal.classList.contains('active')) closeVideoModal();
            if (testimonialModal && testimonialModal.classList.contains('active')) closeTestimonialModal();
            if (navMenu && navMenu.classList.contains('active')) closeMobileMenu();
        }
    });

    // 9. Recommendations Carousel / Slider Logic
    const track = document.getElementById('testimonialTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;

    function getVisibleItemsCount() {
        return window.innerWidth <= 680 ? 1 : 2;
    }

    function updateSlider() {
        if (!track || cards.length === 0) return;

        const visibleItems = getVisibleItemsCount();
        const maxIndex = Math.max(0, cards.length - visibleItems);

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const firstCard = cards[0];
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 0;
        if (cardWidth === 0) return;

        const gap = 20;
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex >= maxIndex);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const visibleItems = getVisibleItemsCount();
            const maxIndex = cards.length - visibleItems;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    if (track) {
        track.addEventListener('touchstart', (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                touchStartX = e.changedTouches[0].screenX;
            }
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                touchEndX = e.changedTouches[0].screenX;
                const threshold = 40;
                const visibleItems = getVisibleItemsCount();
                const maxIndex = cards.length - visibleItems;

                if (touchEndX < touchStartX - threshold && currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                } else if (touchEndX > touchStartX + threshold && currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            }
        }, { passive: true });
    }

    window.addEventListener('resize', updateSlider);
    updateSlider();

    // 10. Scroll Reveal Animation
    if ('IntersectionObserver' in window) {
        const observerSections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        observerSections.forEach(sec => {
            sec.classList.add('fade-in-section');
            sectionObserver.observe(sec);
        });
    }
});