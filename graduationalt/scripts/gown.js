const gownImage = document.querySelector("#gown-image");

function selectGown(prodigy) {
    gownImage.src = "../assets/gown_" + prodigy.toLowerCase() + ".jpg";
}