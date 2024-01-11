document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.admin-list');
    // const postsButton = document.getElementById('admin-posts');
    // const categoriesButton = document.getElementById('admin-categories');
    // const commentsButton = document.getElementById('admin-comments');


    const menu = document.getElementById('menu-contents') as HTMLDivElement;
    console.log(navLinks);
    
    navLinks.forEach((link) => {
        console.log("hello", link);
        link.addEventListener('click', (event) => {
        
            console.log("clicked",event.target);
            event.preventDefault();
            const target = event.target as HTMLDivElement;

        // Get the id of the clicked element
        const id = target.id;
        console.log("id", id);
            if (id==='admin-posts') {
                // Fetch content from post.html
                fetch('/auth/admin-posts.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        menu.innerHTML = html;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }

            if (id==='admin-categories') {
                // Fetch content from post.html
                fetch('/auth/admin-categories.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        menu.innerHTML = html;
                        console.log("hello", menu);
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }

            if (id==='admin-comments') {
                // Fetch content from post.html
                fetch('/auth/admin-comments.html')
                    .then(response => response.text())
                    .then(html => {
                        // Set the innerHTML of the admin-posts-menu div to the fetched HTML
                        menu.innerHTML = html;
                        console.log("hello", menu);
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
            

        });
    });
});