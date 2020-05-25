function filterFunc(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#fullTable tbody").rows;

    for (var i = 0; i < rows.length; i++) {
        var colOne = rows[i].cells[1].textContent.toUpperCase();
        var colTwo = rows[i].cells[2].textContent.toUpperCase();
        var colThree = rows[i].cells[3].textContent.toUpperCase();
        var colFour = rows[i].cells[4].textContent.toUpperCase();
        if (colOne.indexOf(filter) > -1 || colTwo.indexOf(filter) > -1 ||
        colThree.indexOf(filter) > -1 || colFour.indexOf(filter) > -1 ) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
