
//frontend/src/admin-categories.ts

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
                    } else {
                        console.error('Failed to add category. Error:', data.error);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        });
}