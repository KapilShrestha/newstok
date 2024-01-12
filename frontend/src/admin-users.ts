// frontend/src/user.ts

import { User } from './types';


// function to fetch and render Users from the database
export function fetchAndRenderUsers() {
    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then((data: User[]) => {
            renderUsers(data);
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
