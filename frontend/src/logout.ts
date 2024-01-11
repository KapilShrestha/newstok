const logoutButton = document.getElementById('logout-button') as HTMLElement;

logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('accessToken');   
    window.location.href = '/auth/index.html';
});