
async function getUserByID(userID) {
    let response = await fetch(`http://localhost:5000/getUserById?userID=${userID}`);
    return [response.status, await response.json()];
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

const pageName = window.location.pathname.split("/").pop();
if (pageName === 'homepage.html')
{
    const userID = getUserID();
    getUserByID(userID).then((response)=> {
        if (response[0] == 200 || response[0] == 304)
        {
            let login = document.getElementById('login');
            let register = document.getElementById('register');
            login.outerHTML = '<a href="/Profile/mainProfile.html">PROFILE</a>'
            register.remove();
        }
    });
}
else
{
    let loginRegister = document.getElementById('loginRegister');
    loginRegister.outerHTML =
        '<div id="loginRegister"><a href="/Profile/mainProfile.html">PROFILE</a><span class="spacer">|</span><a id="logout" href="/homepage.html">LOGOUT</a></div>';
    document.getElementById('logout').onclick = ()=> {
        document.cookie = "userID=none; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    if (pageName === 'mainProfile.html' || pageName === 'quote.html')
    {
        const userID = getUserID();
        getUserByID(userID).then((response)=> {
            if (response[0] == 200 || response[0] == 304)
            {
                let profileName = document.getElementsByClassName('profileName')[0];
                const fullName = `${response[1]['userInfo'][0].firstName} ${response[1]['userInfo'][0].lastName}`;
                profileName.innerHTML = fullName;

                let {street, city, state, zip} = response[1]['userInfo'][0];
                document.getElementsByClassName('street')[0].innerHTML = street;
                document.getElementsByClassName('city')[0].innerHTML = city;
                document.getElementsByClassName('state')[0].innerHTML = state;
                document.getElementsByClassName('zip')[0].innerHTML = zip;

                let quoteHistory = document.getElementById('quoteHistory');
                let history = response[1]['history'];
                if (history.length == 0)
                {
                    quoteHistory.innerHTML = `
                        <div class="noData">
                            <span>No history found.</span>
                            <span>Try requesting a quote!</span>
                        </div>`;
                }
                else
                {
                    let table = quoteHistory.getElementsByTagName('table')[0];
                    let tBody = table.getElementsByTagName('tbody')[0];
                    for (let quote of history)
                    {
                        let newRow = tBody.insertRow(-1); //Index of -1 means added at the end

                        (newRow.insertCell()).innerHTML = quote['street'];
                        (newRow.insertCell()).innerHTML = quote['city'];
                        (newRow.insertCell()).innerHTML = quote['state'];
                        (newRow.insertCell()).innerHTML = quote['zip'];
                        (newRow.insertCell()).innerHTML = quote['gallons'];
                        (newRow.insertCell()).innerHTML = (new Date(quote['deliveryDate'])).toDateString();
                        (newRow.insertCell()).innerHTML = "$" + quote['pricePerGallon'];
                        (newRow.insertCell()).innerHTML = "$" + quote['amount'];

                    }
                }
            }
        });
    }
}








