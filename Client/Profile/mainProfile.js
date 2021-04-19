
function edit(section) {
    var editField = section.querySelector(".text-input");
    if (editField.className.indexOf('state') > -1) {
        editField.outerHTML = stateSelect(editField.innerHTML);
    }
    else {
        editField.contentEditable = "true";
    }
    var check = '<button onclick="finalize(this.parentElement)"><i class="fas fa-check"></i></button>';
    var button = section.querySelector("button");
    button.outerHTML = check;

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

function stateSelect(currentSelection) {
    let select = `<select class="text-input state">
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
            </select>   
    `;
    const currentIndex = select.indexOf(currentSelection);
    return select.slice(0, currentIndex+3) + ` selected` + select.slice(currentIndex+3);
}


function finalize(section) {
    var editField = section.querySelector(".text-input");
    var className = editField.className;

    var field;
    if (className.indexOf('street') > -1)
        field = 'street';
    else if (className.indexOf('city') > -1)
        field = 'city';
    else if (className.indexOf('state') > -1)
        field = 'state';
    else if (className.indexOf('zip') > -1)
        field = 'zip';
    else
        field = 'null';

    let data;
    if (field == 'state') {
        data = editField.value;
    }
    else
        data = editField.innerHTML;


    fetch('http://localhost:5000/mainProfile',
        {method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userID: getUserID(),
                field: field,
                data: data
            })})
        .then((response)=> {
            if (response.status == 200) { //200 = OK
                if (field == 'state')
                    editField.outerHTML = `<span class="text-input state">${data}</span>`;
                editField.contentEditable = "false";
                var check = section.querySelector("button");
                var button = '<button onClick="edit(this.parentElement)">Edit</button>';
                check.outerHTML = button;
            }
            else if (response.status == 403) { //403 = Forbidden
                let errorMessage;
                switch (field) {
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

                let errorMessageHolder = document.getElementsByClassName('error-message')[0];
                errorMessageHolder.innerHTML = errorMessage;
                $('.error-message').fadeIn().delay(3000).fadeOut();

            }
    });

}
$("#quoteHistory").hide();

$("#profileInfoShow").click(function() {
    $(this)[0].classList.remove("inactive");
    $("#quoteHistoryShow")[0].classList.add("inactive");
    $("#profileInfo").show();
    $("#quoteHistory").hide();

});
$("#quoteHistoryShow").click(function() {
    $(this)[0].classList.remove("inactive");
    $("#profileInfoShow")[0].classList.add("inactive");
    $("#profileInfo").hide();
    $("#quoteHistory").show();
});



