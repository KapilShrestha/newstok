// frontend/src/login.ts

import { togglePasswordVisibility } from "./utils";

const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;


loginForm?.addEventListener('submit', (event) => {
    
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    const body = JSON.stringify({ email, password });
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
        .then(data => {
            // const response = data.json();
            const parseddata = JSON.parse(data);
            if (parseddata.error) {
                alert(parseddata.error);
            } else {
                localStorage.setItem('accessToken', parseddata.accessToken);
                localStorage.setItem('refreshToken', parseddata.refreshToken);
                window.location.href = '/index.html';
            }
        })
        .catch(error => {
            console.log(error);
        });

});


document.getElementById('toggle-password')?.addEventListener('click', function() {
    togglePasswordVisibility('login-password', 'toggle-password');
});




