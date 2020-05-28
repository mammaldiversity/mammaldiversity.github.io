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


    // Create json data object from CSV to populate search
    function searchMDD(elem) {
        var data = "/assets/data/mdd.csv";
        var speciesID = elem.value;
        var newWindow = window.open("")
        Papa.parse(data, {
            header: true,
            delimiter: ",",
            download: true,  
            complete: function(results) {
            console.log("Finished", results.data);
            for (var i = 0; i < results.data.length; i ++) {
                if (speciesID == results.data[i].id) {
                    //for (var key in results.data[i]) {
                        //console.log(key, value);
                        console.log(Object.entries(results.data[i]));
                        var contentToPopulate = ""
                        for (let [key, value] of Object.entries(results.data[i])) {
                            contentToPopulate += `${key}: ${value}` + "<br>";
                        }
                        newWindow.document.write(contentToPopulate);
                }
            }
            },
        })
    }

