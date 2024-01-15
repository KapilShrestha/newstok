// frontend/src/main.ts
const accessToken = localStorage.getItem('accessToken') || null;

if (accessToken) {
  // User is logged in
  if (window.location.pathname.endsWith('/auth/login.html') || window.location.pathname.endsWith('/auth/signup.html')) {
    // Redirect away from login/signup pages if the user is logged in
    window.location.replace('/index.html');
  }
    
} else {
  if (window.location.pathname.endsWith('/auth/login.html') || window.location.pathname.endsWith('/auth/signup.html')) {
  } else {
    window.location.replace('/auth/login.html');
  }
}


