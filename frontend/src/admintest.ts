document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.admin-list');
    const hiddenMenus = document.querySelectorAll('.hidden');

    // Initially setting 'Posts' menu to be displayed
    const postsButton = document.getElementById('admin-posts');
    const postsMenu = document.getElementById('admin-posts-menu');
    const categoriesMenu = document.getElementById('admin-categories-menu');
    const commentsMenu = document.getElementById('admin-comments-menu');

    if (postsButton && postsMenu) {
        postsButton.classList.add('bg-gray-950');
        postsMenu.classList.remove('hidden');
        postsMenu.classList.add('block');
    }
    

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('data-target');


            // for changing url path used in routing
            // window.location.href = '/auth/admin/' + targetId + '/';

            if (postsMenu) {
                // Fetch content from post.html
                fetch('/auth/admin-posts.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        postsMenu.innerHTML = html;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
            if (categoriesMenu) {
                // Fetch content from post.html
                fetch('/auth/admin-categories.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        categoriesMenu.innerHTML = html;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
            if (commentsMenu) {
                // Fetch content from post.html
                fetch('/auth/admin-comments.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        commentsMenu.innerHTML = html;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
            

                        
            navLinks.forEach((otherLink) => {
                otherLink.classList.remove('bg-gray-950');
                
            });            
            link.classList.add('bg-gray-950');
            
            hiddenMenus.forEach((menu) => {
                menu.classList.add('hidden');
                menu.classList.remove('block');
            });
        
            const targetMenu = document.getElementById(targetId + '-menu');
            if(targetMenu) {
                targetMenu.classList.remove('hidden');
                targetMenu.classList.add('block');
            }
        });
    });
});




