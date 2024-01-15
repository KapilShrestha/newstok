//frontend/src/admin-comments.ts


import { IComment } from './types';


export function fetchAndRenderComments() {
    console.log('Fetching comments...');

    fetch('http://localhost:3000/comments')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log('Comments fetched successfully:', data);
                renderComments(data.data);
            } else {
                console.error('Failed to fetch comments. Server response:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}


function renderComments(comments: IComment[]) {
    const tbodyComments = document.getElementById('tbody-admin-comments');
    console.log(tbodyComments);
    
    if(!tbodyComments) return;
    console.log('Rendering comments:', comments);

    // Clear existing content in the tbody
    tbodyComments.innerHTML = '';

    comments.forEach(comment => {
        // Create a new row
        const row = document.createElement('tr');
        const checkboxCell = document.createElement('td');
        checkboxCell.innerHTML = '<label><input type="checkbox" class="checkbox" /></label>';
        row.appendChild(checkboxCell);

        // User Name Column
        const userNameCell = document.createElement('td');
        // userNameCell.innerHTML = `
        // <div class="flex items-center gap-3">
        //   <div>
        //     <div class="font-bold">
        //       <p>${comment.user ? comment.user.name : 'N/A'}</p>
        //     </div>
        //     <div class="text-sm opacity-50">
        //       <p>${comment.user ? comment.user.email : 'N/A'}</p>
        //     </div>
        //   </div>
        // `;
        row.appendChild(userNameCell);

        // const postTitleCell = document.createElement('td');
        // postTitleCell.innerHTML = `<p>${comment.post ? comment.post.title : 'N/A'}</p>`;
        // row.appendChild(postTitleCell);

        // const authorNameCell = document.createElement('td');
        // authorNameCell.innerHTML = `<p>${comment.post.author? comment.post.author : 'N/A'}</p>`;
        // row.appendChild(authorNameCell);

        const commentContentCell = document.createElement('td');
        commentContentCell.innerHTML = `<p>${comment.content}</p>`;
        row.appendChild(commentContentCell);

        const actionCell = document.createElement('th');
        actionCell.className = 'flex gap-4';
        actionCell.innerHTML = `
             <button class="Hide-comment-button" data-comment-id="${comment.id}"><i class="ri-eye-line"></i></button>
         `;
        row.appendChild(actionCell);


        tbodyComments.appendChild(row);












        tbodyComments.appendChild(row);
    });
}