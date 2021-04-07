

async function postProfileInfo(name, street, city, state, zip) {
    //TODO Input validation for profile info
    const userID = getUserID();
    const resp =  await fetch('http://localhost:5000/mainProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: userID,
            name: name,
            street: street,
            city: city,
            state: state,
            zip: zip
        })
    });
    return resp.status;
}

function getUserID() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies)
    {
        if (cookie.indexOf('userID') > -1)
        {
            return cookie.split('=')[1];
        }
    }
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
