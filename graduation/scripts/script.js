const name = document.querySelector("#name");
const prodigy = document.querySelector("#prodigy");
const submitName = document.querySelector("#submit");
const upload = document.querySelector("#upload");
const graduationKit = document.querySelector("#kit");

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

String.prototype.hashCode = function() {
    var hash = 0, i = 0, len = this.length;
    while ( i < len ) {
        hash  = ((hash << 5) - hash + this.charCodeAt(i++)) << 0;
    }
    return (hash + 2147483647) + 1;
};

const registerButton = document.querySelector("#register_btn");

const form = document.querySelector(".form");
const registerBtn = document.querySelector("#register_btn");
registerBtn.onclick = () => {
    form.style.left = "0";
}

// const closeBtn = document.querySelector("#hideRegister");
// closeBtn.onclick = () => {
//     form.style.left = "-540px";
// }
