// frontend/src/index.ts
const postCommentModal = document.getElementById("post-comment-modal") as HTMLDialogElement;

import { fetchAndRenderCategories } from "./admin-categories";
import { IComment, IPosts } from "./types";
import { fetchAndRenderPosts } from "./admin-posts";


fetchAndRenderCategories();
fetchAndRenderPosts();

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((data: IPosts[]) => {
            data.forEach((post) => {
                createCard(post); // Pass true for the first card
            });
        })
        .catch((error) => {
            console.error("Failed to fetch Posts:", error);
        });
});

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



function createCard(post: IPosts) {
    // Your HTML structure as a string with dynamic data
    const cardHTML = `
        <div class="flex flex-col items-center text-md md:text-xl lg:text-xl ">
            <div class="bg-blue-300 shadow-md rounded-md m-2 w-[90vw] h-[60vh] md:w-[60vw] md:h-[40vh] lg:w-[40vw] lg:h-[80vh] xl:w-[30vw] xl:h-[90vh] flex flex-col">
                <div class="top-0 flex justify-around">
                    <div class="mt-6 shadow-md p-2 rounded-lg text-white">
                        <p>${post.categories ? post.categories.name : "N/A"}</p>
                    </div>
                </div>
                <div class="flex-grow flex flex-col mx-8">
                    <div class="mt-6">
                        <p class="font-bold text-lg md:text-xl lg:text-xl text-gray-800 ">${post.title}</p>
                        <hr class="bg-gray-300 ">
                    </div>
                    <div class="grid grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm md:text-xl lg:text-xl mt-6 text-gray-800">${post.content}</p>
                        </div>
                    </div>
                    <div class="flex mt-auto items-center justify-between class="text-sm md:text-xl lg:text-xl mt-6"">
                        <div class="flex-1 text-xs flex justify-start">
                            <p>${post.author ? post.author.name : "N/A"}</p>
                        </div>
                        <div class="flex flex-1 justify-center gap-4 my-4  text-red-700">
                            <button id="post-like-button" class="unlike like:bg-red-700 p-1 hover:text-blue-900 "><i class="ri-heart-3-line text-3xl"></i></button>
                            <button class="post-comment-button p-1 hover:text-blue-900 " id="post-comment-button-${post.id}" ><i id="${post.id}" class="ri-discuss-line text-3xl "></i></button>
                            <button id="post-share-button" class="p-1 hover:text-blue-900 " onclick="sharePost('${post.title}', '${post.content}')"><i class="ri-share-forward-line text-3xl  "></i></button>
                        </div>
                        <div class="flex-1 text-xs flex justify-end">
                            <p>${post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;




    // Create the card div
    const cardDiv = document.createElement("div") as HTMLDivElement;
    cardDiv.innerHTML = cardHTML;

    // Append the card to the container
    const cardContainer = document.getElementById("cardContainer") as HTMLDivElement;
    cardContainer.appendChild(cardDiv);

    const postLikeButton = cardDiv.querySelector("#post-like-button") as HTMLButtonElement;
    postLikeButton.addEventListener("click", () => {
        console.log("like button clicked");
        postLikeButton.classList.toggle("text-blue-700");

        // You can also perform other actions related to liking here
    });

    // Get the post-comment-button after it's added to the DOM
    const addCommentButton = cardDiv.querySelectorAll(".post-comment-button") as NodeListOf<HTMLButtonElement>;
    addCommentButton.forEach((button) => {
        button.addEventListener("click", (e: any) => {
            console.log("clicked 123456", e.target.id);
            handleCommentButtonClick(e.target.id);
        });
    });

    const postShareButton = cardDiv.querySelector("#post-share-button") as HTMLButtonElement;
    postShareButton.addEventListener("click", () => {
        sharePost(post.title, post.content);
    });
}
function sharePost(title: string, content: string) {
    if (navigator.share) {
        navigator
            .share({
                title: title,
                text: content,
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing:", error));
    } else {
        console.warn("Sharing not supported");
    }
}

let selectedPostId: string | null = null;
function handleCommentButtonClick(postId: string) {
    console.log("clicked");
    postCommentModal.showModal();
    fetchAndRenderComments(postId);
    
    selectedPostId = postId;
}

export function addComments() {
    const postCommentButton = document.getElementById("addCommentButton") as HTMLButtonElement;


    postCommentButton?.addEventListener('click', () => {
        console.log('addCategoriesButton clicked');
        const commentInput = document.getElementById('commentInput') as HTMLInputElement;
        const comment = commentInput.value;
        const isValidComment = submitCommentForm();
        if (!isValidComment) return;

        // Log the request payload before making the fetch call
        console.log('Request Payload:', JSON.stringify({ content: comment }));

        fetch('http://localhost:3000/comments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: comment, postId: selectedPostId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Comment added successfully:', data.comment);
                    showMessage(data.message, 'success');
                    postCommentModal.close();

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

addComments();

export function fetchAndRenderComments(postId: string) {
    console.log('Fetching comments...');

    fetch(`http://localhost:3000/comments/${postId}`)
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
    console.log('Rendering comments:', comments);
    const commentContainer = document.getElementById('commentContainer') as HTMLDivElement;

    commentContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.innerHTML = `
      <div class="flex items-center gap-3 ml-3 mt-2 shadow-md rounded-lg p-4">
        <div class="z-10 relative">
          <div class="font-bold">
            <p>${comment.content}</p>
          </div>
        </div>
      </div>
    `;
        commentContainer.appendChild(commentDiv);
    });
}

// prevent blank comment
function submitCommentForm() {
    const commentInput = document.getElementById('commentInput') as HTMLInputElement;
    const commentValue = commentInput.value.trim();

    if (commentValue === '') {
      alert('Please enter a non-empty comment.');
      return false; // Prevent form submission
    } else {
      alert('Form submitted successfully with comment: ' + commentValue);
      return true; // Allow form submission
    }
}



