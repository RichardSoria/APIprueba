function initializeForm(){
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === 'user@gmail.com' && password === '12345') {
                window.location.href = 'html/menu.html';
            } else {
                alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        });
    }
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;

    window.location.href = 'html/menu.html';
}

function onFailure(error) {
    console.error(error);
}

function handleCredentialResponse(response) {
    console.log("ID Token: " + response.credential);

    // Redirige o confirma inicio de sesión
    window.location.href = 'html/menu.html';  // redirección
}

window.onload = function() {
    initializeForm();

    google.accounts.id.initialize({
        client_id: "193073252936-vbvttpmv0llent1msrkl2cgba9hhji41.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.querySelector('.g_id_signin'),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
};

module.exports = { initializeForm, onSignIn, handleCredentialResponse };