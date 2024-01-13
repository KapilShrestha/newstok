// frontend/src/navigation.ts


import { fetchAndRenderUsers } from './admin-users';
import { addCategories, fetchAndRenderCategories } from './admin-categories';
const menu = document.getElementById('menu-contents') as HTMLDivElement;
    const categoriesButton = document.getElementById('admin-categories') as HTMLDivElement;
    const navLinks = document.querySelectorAll('.admin-list');

export function setNavigation() {
    navLinks.forEach((link) => {
        link?.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target as HTMLDivElement;
            const id = target.id;

            navLinks.forEach((otherLink) => {
                otherLink.classList.remove('bg-gray-950');
            });

            link.classList.add('bg-gray-950');

            const fetchAndSetContent = (url: string) => {
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        menu.innerHTML = html;
                        addCategories(); 
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
                    fetchAndRenderCategories();
                    break;
                case 'admin-comments':
                    fetchAndSetContent('/auth/admin-comments.html');
                    break;
                case 'admin-add-posts':
                    fetchAndSetContent('/auth/admin-add-posts.html');
                    break;
                case 'admin-users':
                    fetchAndSetContent('/auth/admin-users.html');
                    fetchAndRenderUsers();
                    break;
                default:
                    console.warn('Unknown ID:', id);
            }
        });
    });
    categoriesButton.classList.add('bg-gray-950');
    categoriesButton.click();
}