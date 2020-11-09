const name = document.querySelector("#name");
const submitName = document.querySelector("#submit");
const upload = document.querySelector("#upload");

var profilePicture = null;

function readImage(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
        var image = new Image();
        image.src = e.target.result;
        image.onload = () => {
            profilePicture = image;
        }
    }
}

upload.addEventListener('change', (e) => {
    if (e.target.files) {
        readImage(e.target.files[0]);
    }
});

