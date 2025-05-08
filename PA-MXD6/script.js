document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                menuToggle.innerHTML = '✕'; // Change to X icon
            } else {
                menuToggle.innerHTML = '☰'; // Change back to hamburger
            }
        });
    }

    // Highlight active page link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('nav ul.nav-links a');
    
    links.forEach(link => {
        // Handle cases where href might be absolute or relative
        let linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage === "" && (link.getAttribute('href') === './' || link.getAttribute('href') === '/')) {
            linkPage = "index.html"; // Treat root path as index.html
        }
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

