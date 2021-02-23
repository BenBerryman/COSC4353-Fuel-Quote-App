
function edit(section) {
    var editField = section.querySelector("div");

    editField.contentEditable = "true";
    var check = '<button onclick="finalize(this.parentElement)"><i class="fas fa-check"></i></button>';
    var button = section.querySelector("button");
    button.outerHTML = check;

}

function finalize(section) {
    var editField = section.querySelector("div");

    editField.contentEditable = "false";
    var check = section.querySelector("button");
    var button = '<button onClick="edit(this.parentElement)">Edit</button>';

    check.outerHTML = button;
}