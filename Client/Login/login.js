document.getElementsByTagName('form')[0].onsubmit = function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    validate(email, password).then(respCode => {
        if (respCode == 200) {
            document.location.href = "http://localhost:8000/Profile/mainProfile.html";
        }
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
    return resp.status;
}


