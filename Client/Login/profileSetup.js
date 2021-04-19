

async function postProfileInfo(firstName, lastName, street, city, state, zip) {
    const userID = getUserID();
    const resp =  await fetch('http://localhost:5000/mainProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: userID,
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            state: state,
            zip: zip
        })
    });
    let json;
    if (resp.headers.get('content-type').indexOf('application/json') !== -1) {
        json = await resp.json();
    }
    return [resp.status, json];
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
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    postProfileInfo(firstName, lastName, street, city, state, zip).then((resp)=> {
        if (resp[0] == 403) {
            const field = document.getElementById(resp[1]['field'])
            field.setCustomValidity(' ');
            let errorMessage;
            switch (resp[1]['field']) {
                case 'firstName':
                case 'lastName':
                case 'street':
                case 'city':
                    errorMessage = "Your input was not accepted. Please make sure you enter only alphanumeric characters.";
                    break;
                case 'state':
                    errorMessage = "Your input was not accepted. Please make sure you select a valid state option.";
                    break;
                case 'zip':
                    errorMessage = "Your input was not accepted. Please make sure you enter only numeric characters.";
                    break;
            }
            document.getElementsByClassName('error-message')[0].innerHTML = errorMessage;
            field.addEventListener('focus', ()=> {
                field.setCustomValidity('');
            });
            $('.error-message').fadeIn().delay(3000).fadeOut();

        }
        if (resp[0] == 200) { //Successful profile info post
            window.location.href = "http://localhost:8000/Profile/mainProfile.html";
        }
    });
}
