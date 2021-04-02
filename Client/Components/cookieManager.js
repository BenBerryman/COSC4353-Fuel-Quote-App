
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
            }
        });
    }
}








