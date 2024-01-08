document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.admin-list a');

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Remove 'active' class from all links
            navLinks.forEach((otherLink) => {
                otherLink.classList.remove('active');
            });

            // Add 'active' class to the clicked link
            link.classList.add('active');
        });
    });
});
