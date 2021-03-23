

async function postProfileInfo(name, street, city, state, zip) {
    const resp =  await fetch('http://localhost:5000/mainProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            street: street,
            city: city,
            state: state,
            zip: zip
        })
    });
    return resp.status;
}

document.getElementsByTagName('form')[0].onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    postProfileInfo(name, street, city, state, zip).then((respCode)=> {
        if (respCode == 200) { //Successful profile info post
            window.location.href = "http://localhost:8000/Profile/mainProfile.html";
        }
    });
}
