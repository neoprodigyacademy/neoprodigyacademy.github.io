const faceclaim = document.querySelector("#faceclaim");
const clanname = document.querySelector("#clanname");
const yourname = document.querySelector("#yourname");
const prodigium = document.querySelector("#prodigium");
const status = document.querySelector("#status");
const registerbutton = document.querySelector("#register-button");
const searchBar = document.querySelector("#search-bar");

const overlay = document.querySelector(".overlay");
const editBox = document.querySelector(".edit-box");
const editFace = document.querySelector("#edit-faceclaim");
const editClan = document.querySelector("#edit-clanname");
const editName = document.querySelector("#edit-name");
const editProdigy = document.querySelector("#edit-prodigy");
const editStatus = document.querySelector("#edit-status");
const editButton = document.querySelector("#edit-button");

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
                    data = '<i class="material-icons" onClick="showEditCivitas(' + data + ')">edit</i>';
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
            var i = 0;
            querySnapshot.forEach(function(doc) {
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
            prepareTable(queryResult);
        })
        .catch(function(error) {
            queryResult = [{
                clanName: "LEE",
                faceClaim: "Cha Jun Ho",
                id: "Ia9YruVrWHR28rdezhkJ",
                index: 0,
                name: "Jinnan",
                prodigy: "Ostenium",
                statusOfFaceClaim: "NPA Student"
            }];
            // prepare data table
            prepareTable(queryResult);
        });
}

function showEditCivitas(index) {
    let civitas = queryResult[index];
    if (civitas) {
        selectedID = civitas.id;

        overlay.classList.remove("hidden");
        overlay.classList.add("flex");

        editFace.value = civitas.faceClaim;
        editClan.value = civitas.clanName;
        editName.value = civitas.name;
        editProdigy.value = civitas.prodigy;
        editStatus.value = civitas.statusOfFaceClaim;

        editButton.addEventListener("click", function() {
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
        .then(function() {
            alert("Data successfully changed!");
            location.reload();
        })
        .catch(function(error) {
            alert("Error writing document: ", error);
        });
}

var selectedID = null;

function onEditClicked() {
    submitEditCivitas(selectedID);
}

overlay.addEventListener("click", (e) => {
    if (!editBox.contains(e.target)){
        overlay.classList.remove("flex");
        overlay.classList.add("hidden");
      }
}, false);

window.onload = loadDatabase;