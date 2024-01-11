document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.admin-list');
    const menu = document.getElementById('menu-contents') as HTMLDivElement;

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target as HTMLDivElement;
            const id = target.id;

            const fetchAndSetContent = (url: string) => {
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        menu.innerHTML = html;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            };

            switch (id) {
                case 'admin-posts':
                    fetchAndSetContent('/auth/admin-posts.html');
                    break;
                case 'admin-categories':
                    fetchAndSetContent('/auth/admin-categories.html');
                    break;
                case 'admin-comments':
                    fetchAndSetContent('/auth/admin-comments.html');
                    break;
                case 'admin-add-posts':
                    fetchAndSetContent('/auth/admin-add-posts.html');
                    break;
                default:
                    console.warn('Unknown ID:', id);
            }
        });
    });
});
