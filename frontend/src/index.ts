// frontend/src/index.ts
const postCommentModal = document.getElementById("post-comment-modal") as HTMLDialogElement;

import { fetchAndRenderCategories } from "./admin-categories";
import { IPosts } from "./types";
import { fetchAndRenderPosts } from "./admin-posts";


fetchAndRenderCategories();
fetchAndRenderPosts();

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((data: IPosts[]) => {
            data.forEach((post, index) => {
                createCard(post, index === 0); // Pass true for the first card
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

function createCard(post: IPosts, isFirst: boolean = false) {
    // Your HTML structure as a string with dynamic data
    const cardHTML = `
        <div class="flex flex-col items-center text-md md:text-xl lg:text-xl ">
            <div class="bg-blue-300 shadow-md rounded-md m-2 w-[90vw] h-[60vh] md:w-[60vw] md:h-[40vh] lg:w-[40vw] lg:h-[80vh] xl:w-[30vw] xl:h-[90vh] flex flex-col">
                <div class="top-0 flex justify-around">
                    <div>
                        <p>${post.categories ? post.categories.name : "N/A"}</p>
                    </div>
                </div>
                <div class="flex-grow flex flex-col mx-8">
                    <div class="mt-6">
                        <p class="text-lg md:text-xl lg:text-xl">${post.title}</p>
                        <hr class="bg-gray-300 ">
                    </div>
                    <div class="grid grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm md:text-xl lg:text-xl mt-6">${post.content}</p>
                        </div>
                    </div>
                    <div class="flex mt-auto items-center justify-between class="text-sm md:text-xl lg:text-xl mt-6"">
                        <div class="flex-1 text-xs flex justify-start">
                            <p>${post.author ? post.author.name : "N/A"}</p>
                        </div>
                        <div class="flex flex-1 justify-center gap-4 my-4  text-red-700 ">
                            <button id="post-like-button" class="unlike like:bg-red-700"><i class="ri-heart-3-line text-3xl"></i></button>
                            <button id="post-comment-button" class="" onclick =handleCommentButtonClick('${post.id}')><i class="ri-discuss-line text-3xl "></i></button>
                            <button id="post-share-button" class="" onclick="sharePost('${post.title}', '${post.content}')"><i class="ri-share-forward-line text-3xl  "></i></button>
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
    const addCommentButton = document.getElementById("post-comment-button") as HTMLButtonElement;
    addCommentButton.addEventListener("click", () => {
        console.log("clicked");
        handleCommentButtonClick(post.id);
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
    selectedPostId = postId;
}

export function addComments() {
    const postCommentButton = document.getElementById("addCommentButton") as HTMLButtonElement;
   

    postCommentButton?.addEventListener('click', () => {
        console.log('addCategoriesButton clicked');
        const commentInput = document.getElementById('commentInput') as HTMLInputElement;
        const comment = commentInput.value;

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
