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

/* CSS for hidden-section and fade-in (add this to style.css)
.hidden-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.hidden-section.fade-in {
    opacity: 1;
    transform: translateY(0);
}
*/