const gownImage = document.querySelector("#gown-image");
const plakatImage = document.querySelector("#plakat-image");

function selectGown(prodigy) {
    gownImage.src = "../assets/gown_" + prodigy.toLowerCase() + ".jpg";
    plakatImage.src = "../assets/plakat_" + prodigy.toLowerCase() + ".png";

}