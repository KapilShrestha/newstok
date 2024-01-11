console.log("login")

const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const loginButton = document.getElementById('login-button') as HTMLButtonElement;

loginButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    const body = JSON.stringify({ email, password });
    console.log(body);
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
        .then(data => {
            // const response = data.json();
            console.log(data);
            const parseddata = JSON.parse(data);
            console.log(parseddata);
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

