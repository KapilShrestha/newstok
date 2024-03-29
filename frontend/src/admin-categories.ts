//frontend/src/admin-categories.ts


import { ICategory } from './types';
let currentPage = 1;


// function to fetch and render Categories from the database
export function fetchAndRenderCategories() {
    fetch('http://localhost:3000/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json() as Promise<{ data: ICategory[] }>;
        })
        .then(({ data }) => {
            if (Array.isArray(data)) {
                // 'data' is now guaranteed to be an array of ICategory
                const categoryNames = data.map((category: ICategory) => category.name);
                console.log('Category Names:', categoryNames);

                // Continue with rendering or other logic
                renderCategories(data);
            } else {
                console.log('Unexpected data format:', data);
            }
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
                <button class="delete-category-button" data-category-id="${category.id}"><i class="ri-delete-bin-6-line"></i></button>
                <button class="update-category-button" data-category-id="${category.id}"><i class="ri-edit-2-line"></i></button>

            </div>
          </div>
        `;
        row.appendChild(actionCell);

        const deleteButton = actionCell.querySelector('.delete-category-button') as HTMLButtonElement;
        deleteButton.addEventListener('click', async () => {
            const categoryId = deleteButton.dataset.categoryId;
            await deleteCategory(categoryId);
        });

        const updateButton = actionCell.querySelector('.update-category-button') as HTMLButtonElement;
        updateButton.addEventListener('click', () => {
            const categoryId = updateButton.dataset.categoryId;
            console.log('Button clicked:', categoryId);
        });

        tbodyCategories.appendChild(row);
    });

    renderPaginationControls(categories.length);
}





// to function to add categories
export function addCategories() {
    const addCategoriesButton = document.getElementById('addCategoriesButton') as HTMLButtonElement;
    const addCategoriesModal = document.getElementById('addCategoriesModal') as HTMLDialogElement;

    addCategoriesButton?.addEventListener('click', () => {
        console.log('addCategoriesButton clicked');
        const categoryInput = document.getElementById('addCategoriesInput') as HTMLInputElement;
        const categoryName = categoryInput.value;

        // Log the request payload before making the fetch call
        console.log('Request Payload:', JSON.stringify({ name: categoryName }));

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
                    showMessage(data.message, 'success');
                    addCategoriesModal.close();

                    location.reload();
                } else {
                    console.error('Failed to add category. Error:', data.error || 'Unknown error');
                    // Display error message
                    showMessage(data.message, 'error');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}

// Add the showMessage function with explicit types
function showMessage(message: string, type: 'success' | 'error') {
    const alertMessage = document.getElementById('alert-message') as HTMLDivElement;

    alertMessage.textContent = message;
    alertMessage.classList.remove('success', 'error');
    alertMessage.classList.add(type, 'visible');
    setTimeout(() => {
        alertMessage.classList.remove('visible');
    }, 5000); // Hide the message after 5 seconds (adjust as needed)
}



// Function to delete a category
async function deleteCategory(categoryId: string | undefined) {
    if (!categoryId) return;

    try {
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Category deleted successfully');
            fetchAndRenderCategories(); // Refresh the category list or perform other necessary actions
        } else {
            console.error('Failed to delete category:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }
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
