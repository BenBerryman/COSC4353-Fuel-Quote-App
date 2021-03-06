
function edit(section) {
    var editField = section.querySelector("div");

    editField.contentEditable = "true";
    var check = '<button onclick="finalize(this.parentElement)"><i class="fas fa-check"></i></button>';
    var button = section.querySelector("button");
    button.outerHTML = check;

}

function finalize(section) {
    var editField = section.querySelector("div");
    var data = editField.innerHTML;
    fetch('http://localhost:5000/mainProfile',
        {method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({data: data})});
    editField.contentEditable = "false";
    var check = section.querySelector("button");
    var button = '<button onClick="edit(this.parentElement)">Edit</button>';

    check.outerHTML = button;
}
$("#quoteHistory").hide();

$("#profileInfoShow").click(function() {
    $(this)[0].classList.remove("inactive");
    $("#quoteHistoryShow")[0].classList.add("inactive");
    $("#profileInfo").show();
    $("#quoteHistory").hide();

})
$("#quoteHistoryShow").click(function() {
    $(this)[0].classList.remove("inactive");
    $("#profileInfoShow")[0].classList.add("inactive");
    $("#profileInfo").hide();
    $("#quoteHistory").show();
})