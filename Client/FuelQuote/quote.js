
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
        document.getElementById("dueAmt").innerHTML = (val*4.50)+"";
    }
}

async function confirmPurchase(address, quantity, deliveryDate, amount) {
    let resp = await fetch("http://localhost:5000/purchaseConfirm",
        {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                address: address,
                quantity: quantity,
                deliveryDate: deliveryDate,
                amount: amount
            })
        });
    return resp.status;
}

async function purchaseHistory() {
    let resp = await fetch("http://localhost:5000/")
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {

            for (let i = 0; i < myJson.length; i++) {
                let row = myJson[i];
                $("#head").after(
                    "<tr>" +
                    "<td>"+row.address.addressNum+"</td>"+
                    "<td>"+row.address.city+"</td>"+
                    "<td>"+row.address.state+"</td>"+
                    "<td>"+row.address.zip+"</td>"+
                    "<td>"+row.deliveryDate+"</td>"+
                    "<td>"+row.quantity+"</td>"+
                    "<td>"+row.amount+"</td>"+
                    "</tr>" );

            }


        });

}

$(document).ready(function() {
    purchaseHistory();

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
        let quantity = document.getElementById("gallons").value;
        let deliveryDate = document.getElementById("date").value;
        let amount =  document.getElementById("dueAmt").innerHTML;


        let addressNum = document.getElementById("addressNum").innerHTML;
        let city = document.getElementById("city").innerHTML;
        let state = document.getElementById("state").innerHTML;
        let zip = document.getElementById("zip").innerHTML;


        let address = {
            city: city,
            state: state,
            zip: zip,
            addressNum: addressNum
        };

        confirmPurchase(address, quantity, deliveryDate, amount).then(respCode => {
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
