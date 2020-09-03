const faceclaim = document.querySelector("#faceclaim");
const clanname = document.querySelector("#clanname");
const yourname = document.querySelector("#yourname");
const prodigium = document.querySelector("#prodigium");
const status = document.querySelector("#status");
const registerbutton = document.querySelector("#register-button");
const searchBar = document.querySelector("#search-bar");

const overlay = document.querySelector(".overlay");
const overlayBoxes = document.querySelectorAll(".overlay-box");

const editBox = document.querySelector("#edit-box");
const editFace = document.querySelector("#edit-faceclaim");
const editClan = document.querySelector("#edit-clanname");
const editName = document.querySelector("#edit-name");
const editProdigy = document.querySelector("#edit-prodigy");
const editStatus = document.querySelector("#edit-status");
const editButton = document.querySelector("#edit-button");

const loadButton = document.querySelector("#load-button");

var user;

function register() {
    if (faceclaim.value && clanname.value && yourname.value && prodigium.value && status.value) {
        var biodata = {
            faceClaim: faceclaim.value,
            clanName: clanname.value,
            name: yourname.value,
            prodigy: prodigium.value,
            statusOfFaceClaim: status.value
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
        columnDefs: [{
            targets: 0,
            render: function (data, type, row, meta) {
                if (type === 'display') {
                    data = '<span class="material-icons mdl-button margin-r8" onClick="showEditCivitas(' + data + ')">edit</span>' +
                        '<span class="material-icons mdl-button" onClick="deleteCivitas(' + data + ')">delete_forever</span>';
                    // data = '<a href="' + data + '">' + data + '</a>';
                }
                return data;
            }
        }],
        columns: [
            { data: 'index' },
            { data: 'faceClaim' },
            { data: 'clanName' },
            { data: 'name' },
            { data: 'prodigy' },
            { data: 'statusOfFaceClaim' }
        ]
    });


    // setup search
    searchBar.addEventListener("keyup", function (event) {
        table.search(searchBar.value).draw();
    });
}

var queryResult = [];

function loadDatabase() {
    db.collection("NPA-DB").get()
        .then(function (querySnapshot) {
            // on success, create dataset list
            var i = 0;
            querySnapshot.forEach(function (doc) {
                let student = doc.data();
                queryResult.push({
                    index: i,
                    id: doc.id,
                    faceClaim: student.faceClaim,
                    clanName: student.clanName,
                    name: student.name,
                    prodigy: student.prodigy,
                    statusOfFaceClaim: student.statusOfFaceClaim,
                });
                i++;
            });

            // prepare data table
            // prepareTable(queryResult);
        })
        .catch(function (error) {
            alert(error);
        });
}

function deleteCivitas(index) {
    let civitas = queryResult[index];
    if (civitas) {
        if (confirm("Are you sure you want to delete?")) {
            db.collection("NPA-DB").doc(civitas.id).delete().then(function() {
                alert("Data " + civitas.name + " successfully deleted!");
                location.reload();
            }).catch(function(error) {
                console.error("Error removing data: ", error);
            });
        }
    }
}

function showEditCivitas(index) {
    let civitas = queryResult[index];
    if (civitas) {
        selectedID = civitas.id;

        overlay.classList.remove("hidden");
        overlay.classList.add("flex");

        editBox.classList.remove("hidden");
        editBox.classList.add("visible");

        editFace.value = civitas.faceClaim;
        editClan.value = civitas.clanName;
        editName.value = civitas.name;
        editProdigy.value = civitas.prodigy;
        editStatus.value = civitas.statusOfFaceClaim;

        editButton.addEventListener("click", function () {
            onEditClicked();
        })
    }
}

function submitEditCivitas(id) {
    db.collection("NPA-DB").doc(id)
        .set({
            faceClaim: editFace.value,
            clanName: editClan.value,
            name: editName.value,
            prodigy: editProdigy.value,
            statusOfFaceClaim: editStatus.value
        })
        .then(function () {
            alert("Data successfully changed!");
            location.reload();
        })
        .catch(function (error) {
            alert("Error writing document: ", error);
        });
}

var selectedID = null;

function onEditClicked() {
    submitEditCivitas(selectedID);
}

overlay.addEventListener("click", (e) => {
    // Disable close overlay if show login
    if (loginBox.classList.contains("visible")) {

    } else {
        overlayBoxes.forEach((box) => {
            if (!box.contains(e.target)) {
                overlay.classList.remove("flex");
                overlay.classList.add("hidden");
                box.classList.remove("visible");
                box.classList.add("hidden");
            }
        })
    }
}, false);

loadButton.addEventListener("click", convertDataset(queryResult));


const DB_ID = "members"

function convertDataset(dataset) {
    var doc = {
        lastUpdate: new Date(),
        civitas: []
    };

    // dataset.forEach((data, index) => {
    //     doc.civitas.push(data);
    // })

    doc.civitas = dataset.map((student) => [student.id, student])

    db.collection("NPA-civitas").doc(DB_ID).set(doc)
        .then(() => {
            alert("Database converted");
        })
        .catch((error) => {
            alert(error);
        })
}

function appendDataset(dataset) {

}

function loadSingleDatabase() {
    db.collection("NPA-civitas").doc(DB_ID).get()
        .then(function (doc) {
            let civitas = doc.data().civitas;
            queryResult = Object.keys(civitas).map((key) => civitas[key]);
            // prepare data table
            prepareTable(queryResult);
        })
        .catch(function (error) {
            alert(error);
        });
}