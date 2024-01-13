//frontend/src/admin-categories.ts
import { ICategory } from './types';
let currentPage = 1;


// to function to add categories
export function addCategories() {
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
                    location.reload();
                } else {
                    console.error('Failed to add category. Error:', data.error || 'Unknown error');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}


// function to fetch and render Categories from the database
export function fetchAndRenderCategories() {
    fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then((data: ICategory[]) => {
            renderCategories(data);
            // console.log(data);
        })
        .catch(error => {
            console.error('Failed to fetch Categories:', error);
        });
}


//   function to render Categories
function renderCategories(categories: ICategory[]) {
    const tbodyCategories = document.getElementById('tbody-admin-categories');
    if (!tbodyCategories) return;

    // Clear existing rows
    tbodyCategories.innerHTML = '';

    categories.forEach(category => {
        const row = document.createElement('tr');

        // Checkbox column
        const checkboxCell = document.createElement('td');
        checkboxCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
        row.appendChild(checkboxCell);

        // Category Name column
        const categoryNameCell = document.createElement('td');
        categoryNameCell.innerHTML = `
        <div class="flex items-center gap-3">
          <div>
            <div class="font-bold">
              <p>${category.name}</p>
            </div>
          </div>
        </div>
      `;
        row.appendChild(categoryNameCell);


        // Action column
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `
        <div class="flex gap-4">
          <div>
            <div class="font-bold">
                <button><i class="ri-delete-bin-6-line"></i></button>
                <button><i class="ri-edit-2-line"></i></button>
            </div>
          </div>
        `;
        row.appendChild(actionCell);
        tbodyCategories.appendChild(row);
    });

    renderPaginationControls(categories.length);
    console.log(categories.length);
}

// Function to render pagination controls
function renderPaginationControls(totalItems: number) {
    const totalPages = Math.ceil(totalItems / 6);

    // Assuming you have a container for pagination controls
    const paginationControlsContainer = document.getElementById('pagination-controls-container');
    if (!paginationControlsContainer) return;

    // Clear existing pagination controls
    paginationControlsContainer.innerHTML = '';

    // Create and append pagination controls
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('join');

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.classList.add('join-item', 'btn');
    prevButton.textContent = '«';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAndRenderCategories(); // Fetch and render categories for the selected page
        }
    });
    paginationContainer.appendChild(prevButton);

    // Current Page Button
    const currentPageButton = document.createElement('button');
    currentPageButton.classList.add('join-item', 'btn');
    currentPageButton.textContent = `Page ${currentPage}`;
    paginationContainer.appendChild(currentPageButton);

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.classList.add('join-item', 'btn');
    nextButton.textContent = '»';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchAndRenderCategories(); // Fetch and render categories for the selected page
        }
    });
    paginationContainer.appendChild(nextButton);

    paginationControlsContainer.appendChild(paginationContainer);
}

// Call the initial render with the first page
fetchAndRenderCategories();
