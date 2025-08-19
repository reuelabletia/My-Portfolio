document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    // Select all <a> tags that are children of .nav-menu or .hero-actions
    document.querySelectorAll('.nav-menu a, .hero-actions a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // ONLY prevent default if the href starts with '#' (indicating an internal anchor link)
        if (href && href.startsWith('#')) {
            e.preventDefault(); // Prevent the default link behavior (e.g., jumping)

            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // If the href does NOT start with '#', allow the default behavior (e.g., mailto, download, external links)
        // No else block or e.preventDefault() here means the browser handles it normally.
    });
});


    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
        }
    } else {
        // Default to light mode if no preference saved
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }


    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // Video Modal Logic (MODIFIED BLOCK)
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail-link');
    const closeModalBtn = document.querySelector('.video-modal-close');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior (opening new tab)
            const videoId = thumbnail.dataset.videoId; // Get video ID from data-video-id attribute
            if (videoId) {
                // MODIFIED: Use youtube-nocookie.com and include enablejsapi=1
                youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
                videoModal.classList.add('active');
                document.body.classList.add('no-scroll'); // Prevent background scroll
            }
        });
    });

    // Function to close modal and stop video
    function closeVideoModal() {
        videoModal.classList.remove('active');
        youtubeIframe.src = ''; // Stop the video by clearing its source
        document.body.classList.remove('no-scroll'); // Re-enable background scroll
    }

    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', closeVideoModal);

    // Close modal when clicking outside the content (on the overlay itself)
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) { // Only if the click is directly on the overlay
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    // END Video Modal Logic


    // Optional: Add simple fade-in on scroll for sections
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // callback when 10% of item is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once it's faded in
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-section'); // Add a class to hide initially
        sectionObserver.observe(section);
    });
});