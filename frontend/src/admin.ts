// frontend/src/admin.ts
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.admin-list');
    const menu = document.getElementById('menu-contents') as HTMLDivElement;
    const categoriesButton = document.getElementById('admin-categories') as HTMLDivElement;

// to function to add categories
    function addCategories() {
        const addCategoriesButton = document.getElementById('addCategoriesButton') as HTMLButtonElement;        
            addCategoriesButton?.addEventListener('click', () => {
                console.log('addCategoriesButton clicked');
                const categoryInput = document.getElementById('addCategoriesInput') as HTMLInputElement;
                const categoryName = categoryInput.value;

                fetch('http://localhost:3000/categories/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: categoryName }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log('Category added successfully:', data.category);
                        } else {
                            console.error('Failed to add category. Error:', data.error);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
    }


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
                    break;
                case 'admin-comments':
                    fetchAndSetContent('/auth/admin-comments.html');
                    break;
                case 'admin-add-posts':
                    fetchAndSetContent('/auth/admin-add-posts.html');
                    break;
                case 'admin-users':
                    fetchAndSetContent('/auth/admin-users.html');
                    break;
                default:
                    console.warn('Unknown ID:', id);
            }
        });
    });
    categoriesButton.classList.add('bg-gray-950');
    categoriesButton.click();
});
