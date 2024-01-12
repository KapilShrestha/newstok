// frontend/src/admin.ts

import { User } from './types'; 


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.admin-list');
    const menu = document.getElementById('menu-contents') as HTMLDivElement;
    const categoriesButton = document.getElementById('admin-categories') as HTMLDivElement;


    // function to fetch and render Users from the database
    function fetchAndRenderUsers() {
        fetch('http://localhost:3000/user') 
          .then(response => response.json())
          .then((data: User[]) => {
            renderUsers(data);
            console.log('User:', data);
            
          })
          .catch(error => {
            console.error('Failed to fetch users:', error);
          });
      }
      



    //   function to render users
    function renderUsers(users: User[]) {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;
    
        // Clear existing rows
        tbody.innerHTML = '';
    
        users.forEach(user => {
          const row = document.createElement('tr');
    
          // Checkbox column
          const checkboxCell = document.createElement('td');
          checkboxCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
          row.appendChild(checkboxCell);
    
          // Full Name column
          const fullNameCell = document.createElement('td');
          fullNameCell.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <i class="ri-user-line"></i>
                </div>
              </div>
              <div>
                <div class="font-bold">
                  <p>${user.name}</p>
                </div>
                <div class="text-sm opacity-50">
                  <p>${user.name}</p>
                </div>
              </div>
            </div>
          `;
          row.appendChild(fullNameCell);
    
          // Email column
          const emailCell = document.createElement('td');
          emailCell.textContent = user.email;
          row.appendChild(emailCell);
    
          // Author checkbox column
          const authorCell = document.createElement('td');
          authorCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
          row.appendChild(authorCell);
    
          // Admin checkbox column
          const adminCell = document.createElement('td');
          adminCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
          row.appendChild(adminCell);
    
          tbody.appendChild(row);
        });
      }


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
                    fetchAndRenderUsers();
                    break;
                default:
                    console.warn('Unknown ID:', id);
            }
        });
    });
    categoriesButton.classList.add('bg-gray-950');
    categoriesButton.click();
});
