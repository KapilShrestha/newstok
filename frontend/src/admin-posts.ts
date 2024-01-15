// frontend/src/admin-posts.ts

import { log } from 'console';
import { IPosts } from './types';

// function to add posts
export function addPosts(){
    const addPostButton = document.getElementById('add-post-button') as HTMLButtonElement;
    // console.log(addPostButton);
    addPostButton?.addEventListener('click', (e)=>{
        e.preventDefault();

        console.log('addPostButton clicked');
        const postTitleInput = document.getElementById('post-title-input') as HTMLInputElement;
        const postTitle = postTitleInput.value;
        const postCategoryInput = document.getElementById('post-category-input') as HTMLInputElement;
        const postCategory = postCategoryInput.value;
        const postContentInput = document.getElementById('post-content-input') as HTMLInputElement; 
        const postContent = postContentInput.value;

        fetch('http://localhost:3000/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: postTitle, category:postCategory, content: postContent}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Post added successfully:', data.post);
                location.reload();
            } else {
                console.error('Failed to add post. Error:', data.error || 'Unknown error');
            }
        })
    });
}

export function fetchAndRenderPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then((data: IPosts[]) => {
            console.log(data);
            renderPosts(data);
        })
        .catch(error => {
            console.error('Failed to fetch Posts:', error);
        });
}


function renderPosts(posts: IPosts[]) {
    const tbodyPosts = document.getElementById('tbody-admin-posts');
    if (!tbodyPosts) return;

    // Clear existing rows
    tbodyPosts.innerHTML = '';

    posts.forEach(post => {
        const row = document.createElement('tr');
        console.log('Post:', post);
        // Checkbox column
        const checkboxCell = document.createElement('td');
        checkboxCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
        row.appendChild(checkboxCell);

        // Post Name Column
        const postNameCell = document.createElement('td');
        postNameCell.innerHTML = `
             <div class="flex items-center gap-3">
                 <div>
                     <div class="font-bold">
                         <p>${post.title}</p>
                     </div>
                     <div class="text-sm opacity-50">
                     <p>${post.categories ? post.categories.name : 'N/A'}</p>
                     </div>
                 </div>
             </div>
         `;
        row.appendChild(postNameCell);

        
        const categoryCell = document.createElement('td');
        categoryCell.innerHTML = `<p>${post.categories ? post.categories.name : 'N/A'}</p>`;
        row.appendChild(categoryCell);

        const authorCell = document.createElement('td');
        authorCell.innerHTML = `<p>${post.author ? post.author.name : 'N/A'}</p>`;
        row.appendChild(authorCell);

        const contentCell = document.createElement('td');
        contentCell.innerHTML = `<p class="line-clamp-2">${post.content}</p>`;
        row.appendChild(contentCell);

        const actionCell = document.createElement('th');
        actionCell.className = 'flex gap-4';
        actionCell.innerHTML = `
             <button class="delete-post-button" data-post-id="${post.id}"><i class="ri-delete-bin-6-line"></i></button>
             <button class="update-post-button" data-post-id="${post.id}"><i class="ri-edit-2-line"></i></button>
         `;
        row.appendChild(actionCell);

        const deleteButton = actionCell.querySelector('.delete-post-button') as HTMLButtonElement;
        deleteButton.addEventListener('click', async () => {
            const postId = deleteButton.dataset.postId;
            console.log('Delete button clicked:', postId);
            await deletePost(postId);
        });

        tbodyPosts.appendChild(row);
    });
}

export async function deletePost(postId: string | undefined) {
    if (!postId) return;

    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Post deleted successfully');
            fetchAndRenderPosts(); // Refresh the post list or perform other necessary actions
        } else {
            console.error('Failed to delete Post:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting Post:', error);
    }
}