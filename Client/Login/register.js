

document.getElementsByTagName('form')[0].onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(email, password).then(respCode => {
        if (respCode == 200) { //Successful registration
            window.location.href = "http://localhost:8000/Login/profileSetup.html";
        }
    });
}

async function registerUser(email, password) {
    const result =  await fetch('http://localhost:5000/register', {

        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })});
    return result.status;
}