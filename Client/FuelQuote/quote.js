
function stepUp(inputField) {
    inputField.value++;
}

function stepDown(inputField) {
    if (inputField.value > 1) {
        inputField.value--;
    }
    else if (inputField.value == 1) {
        inputField.value = null;
    }
}

function checkValid(input) {
    if (input.value < 1) {
        input.value = null;
    }else {
        let val= input.value;
    }
}

function pricing() {
    // Get the input box
    let gallons = document.getElementById('gallons');

    // Init a timeout variable to be used below
    let timeout = null;

    // Listen for input change events
    gallons.addEventListener('change', function (e) {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            // document.getElementById('dueAmt').innerHTML = getPrice();

        }, 1000);
    });
}

async function getPrice() {
    let response = await fetch(`http://localhost:5000/price`);
    return await response.json();
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

async function confirmPurchase(gallons, deliveryDate, amount) {
    const userID = getUserID();
    let resp = await fetch("http://localhost:5000/purchaseConfirm",
        {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userID: userID,
                gallons: gallons,
                deliveryDate: deliveryDate,
                amount: amount
            })
        });
    return resp.status;
}


$(document).ready(function() {
    pricing();
    var numberIncrementField = document.querySelector(".number-incrementer")
    document.querySelector(".increment-down")
        .addEventListener('click', (event) => {
            stepDown(numberIncrementField.querySelector('input[type=number]'));
            event.preventDefault();
        });

    document.querySelector(".increment-up")
        .addEventListener('click', (event) => {
            stepUp(numberIncrementField.querySelector('input[type=number]'));
            event.preventDefault();
        });

    document.querySelector(".number-incrementer input").addEventListener('input', function() {
        checkValid(this);
    });

    document.getElementsByTagName("form")[0].onsubmit = function(event) {
        event.preventDefault();
        let gallons = document.getElementById("gallons").value;
        let deliveryDate = document.getElementById("date").value;
        let amount =  document.getElementById("dueAmt").innerHTML;
        confirmPurchase(gallons, deliveryDate, amount).then(respCode => {
            if (respCode == 200) {
                document.location.href = "http://localhost:8000/FuelQuote/purchaseConfirm.html"
            }
        });
    };

    var today = new Date();
    var max = new Date();
    var min = new Date();
    min.setMonth(today.getMonth()-2);
    max.setDate(max.getDate()+121);
    $('#date').datepicker({
        dateFormat: "mm/dd/yy",
        minDate: today,
        maxDate: max,
        altFormat: "yy-mm-dd",
        altField: "#alt-date"

    });
});
