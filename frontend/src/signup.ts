import { togglePasswordVisibility } from "./utils";

const signupEmail = document.getElementById('signup-email') as HTMLInputElement;
const signupPassword = document.getElementById('signup-password') as HTMLInputElement;
const signupName = document.getElementById('signup-name') as HTMLInputElement;
const signupForm = document.getElementById('signup-form') as HTMLFormElement;

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;
    const name = signupName.value;
    const body = JSON.stringify({ email, password, name });
    fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                alert(data.error);
            } else {
                console.log(data);
                window.location.href = '/auth/login.html';
            }
        })
        .catch(error => {
            console.warn(error);
        });
});

document.getElementById('toggle-password')?.addEventListener('click', function() {
    togglePasswordVisibility('signup-password', 'toggle-password');
});