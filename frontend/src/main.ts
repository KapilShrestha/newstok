

const accessToken = localStorage.getItem('accessToken') || null;

if (accessToken) {
  // User is logged in
  if (window.location.pathname.endsWith('/auth/login.html') || window.location.pathname.endsWith('/auth/signup.html')) {
    // Redirect away from login/signup pages if the user is logged in
    window.location.replace('/index.html');
  }
  // Continue with the rest of your application logic for logged-in users
  
} else {
  // User is not logged in
  if (window.location.pathname.endsWith('/auth/login.html') || window.location.pathname.endsWith('/auth/signup.html')) {
    // Already on the login page, no need to redirect
  } else {
    // Redirect to login page if not already there
    window.location.replace('/auth/login.html');
  }
}

// Additional logic for redirecting to index page after successful login
// if (accessToken && !window.location.pathname.endsWith('/auth/login.html')) {
//   // Redirect to index page after successful login
//   window.location.replace('/index.html');
// }


