
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
    }
}

async function confirmPurchase(addressNum, fuelAmount, deliveryDate) {
    let resp = await fetch("http://localhost:5000/purchaseConfirm",
        {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                addressNum: addressNum,
                fuelAmount: fuelAmount,
                deliveryDate: deliveryDate
            })});
    return resp.status;
}
$(document).ready(function() {
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
        let addressNum = document.getElementById("addressNum").innerHTML;
        let fuelAmount = document.getElementById("gallons").value;
        let deliveryDate = document.getElementById("alt-date").value;
        confirmPurchase(addressNum, fuelAmount, deliveryDate).then(respCode => {
            if (respCode == 200) {
                document.location.href = "http://localhost:8000/FuelQuote/PurchaseConfirm.html"
            }
        });
    }


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
