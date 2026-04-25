document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // 3. Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail-link');
    const closeModalBtn = document.querySelector('.video-modal-close');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = thumbnail.dataset.videoId;
            if (videoId) {
                youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    function closeVideoModal() {
        videoModal.classList.remove('active');
        youtubeIframe.src = '';
        document.body.classList.remove('no-scroll');
    }

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVideoModal);
    }

    // 4. Recommendations Slider Logic
    const track = document.getElementById('testimonialTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function updateSlider() {
        if (!track || cards.length === 0) return;
        const cardWidth = cards[0].getBoundingClientRect().width + 20; // Width + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        const visibleItems = window.innerWidth >= 768 ? 2 : 1;
        const maxIndex = cards.length - visibleItems;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const visibleItems = window.innerWidth >= 768 ? 2 : 1;
            if (currentIndex < cards.length - visibleItems) {
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

    // 5. Testimonial "Read More" Modal Logic (NEW)
    const testimonialModal = document.getElementById('testimonialModal');
    const testimonialClose = document.querySelector('.testimonial-modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    const modalName = document.getElementById('modal-author-name');
    const modalRole = document.getElementById('modal-author-role');
    const modalText = document.getElementById('modal-full-text');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.testimonial-card');
            const fullParagraph = card.querySelector('.testimonial-text').innerText;
            
            // Populate Modal with data from the button and the card
            modalName.innerText = this.getAttribute('data-name');
            modalRole.innerText = this.getAttribute('data-role');
            modalText.innerText = fullParagraph;

            // Show Modal
            testimonialModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    function closeTestimonialModal() {
        if (testimonialModal) {
            testimonialModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    if(testimonialClose) {
        testimonialClose.addEventListener('click', closeTestimonialModal);
    }

    // 6. Global Modal Closers (Background clicks and Escape key)
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
        if (e.target === testimonialModal) closeTestimonialModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (videoModal.classList.contains('active')) closeVideoModal();
            if (testimonialModal && testimonialModal.classList.contains('active')) closeTestimonialModal();
        }
    });

    // 7. Window Resize Listeners
    window.addEventListener('resize', updateSlider);
    updateSlider(); // Initial check

    // 8. Fade-in on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-section');
        sectionObserver.observe(section);
    });
});