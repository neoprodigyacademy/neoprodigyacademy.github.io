const faceclaim = document.querySelector("#faceclaim");
const clanname = document.querySelector("#clanname");
const yourname = document.querySelector("#yourname");
const prodigium = document.querySelector("#prodigium");
const status = document.querySelector("#status");
const registerbutton = document.querySelector("#register-button");
const searchBar = document.querySelector("#search-bar");

var user;

function register() {
    if (faceclaim.value && clanname.value && yourname.value && prodigium.value && status.value) {
        var biodata = {
            faceClaim: faceclaim.value,
            clanName: clanname.value,
            name: yourname.value,
            prodigy: prodigium.value,
            statusOfFaceClaim: status.value,
        };

        user = biodata;

        db.collection("NPA-DB")
            .add(biodata)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                alert("Your data is successfully registered!");
                faceclaim.value = "";
                clanname.value = "";
                yourname.value = "";
                prodigium.value = "";
                status.value = "";

                location.reload();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert(error);
            })
    } else {
        alert("All fields should be filled!");
    }
}

registerbutton.addEventListener("click", register);

var table;

function prepareTable(dataset) {
    table = $('#table_id').DataTable({
        paging: false,
        data: dataset,
        dom: '<"top"i>rt<"bottom"><"clear">',
        columns: [
            { data: 'faceClaim' },
            { data: 'clanName' },
            { data: 'name' },
            { data: 'prodigy' },
            { data: 'statusOfFaceClaim' }
        ]
    });


    // setup search
    searchBar.addEventListener("keyup", function(event) {
        table.search(searchBar.value).draw();
        console.log(searchBar.value);
    });
}

var queryResult = [];

function loadDatabase() {
    db.collection("NPA-DB").get()
        .then(function(querySnapshot) {
            // on success, create dataset list
            querySnapshot.forEach(function(doc) {
                let student = doc.data();
                queryResult.push({
                    faceClaim: student.faceClaim,
                    clanName: student.clanName,
                    name: student.name,
                    prodigy: student.prodigy,
                    statusOfFaceClaim: student.statusOfFaceClaim,
                });
            });

            // prepare data table
            prepareTable(queryResult);
        });
}

function refreshDataset() {
    db.collection("NPA-DB").get()
    .then(function(querySnapshot) {
        // on success, create dataset list
        querySnapshot.forEach(function(doc) {
            let student = doc.data();
            queryResult.push({
                faceClaim: student.faceClaim,
                clanName: student.clanName,
                name: student.name,
                prodigy: student.prodigy,
                statusOfFaceClaim: student.statusOfFaceClaim,
            });
        });

        // prepare data table
        table.data(queryResult).draw(false);
    });
}

window.onload = loadDatabase;