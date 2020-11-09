function submit() {
    graduationKit.style.display = "block";
    drawCertificate(IMG_CERTIFICATE, name.value)
    selectGown(prodigy.value);
}

submitName.onclick = submit;
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
});