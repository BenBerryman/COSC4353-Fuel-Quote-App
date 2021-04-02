document.getElementsByTagName('form')[0].onsubmit = function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    validate(email, password).then((user) => {
        document.cookie = `userID=${user.userID};path=/;secure;SameSite=Strict`;
        document.location.href = "http://localhost:8000/Profile/mainProfile.html";
    });

}

async function validate(email, password) {
    let resp = await fetch("http://localhost:5000/login",
        {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password}
                )});
    if (resp.status == 401)
    {
        console.log('Incorrect email or password');
    }
    else if (resp.status == 404)
    {
        console.log('Account does not exist');
    }
    else if (resp.status == 200)
    {
        return await resp.json();
    }
}


