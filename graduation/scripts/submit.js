function submit() {
    // graduationKit.style.display = "block";
    // drawCertificate(IMG_CERTIFICATE, name.value)
    drawTranscript(TRANSCRIPT_PREFIX + prodigy.value.toLowerCase() + ".png", name.value);
    selectGown(prodigy.value);
}

submitName.onclick = submit;
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
});

const showCertButton = document.querySelector("#show-certificate");
showCertButton.onclick = () => {
    showCertificateOverlay();
}

function showCertificateOverlay() {
    overlay.classList.remove("hidden");
    overlay.innerHTML = '<a id="certificate-download" class="btn btn-primary download" download="certificate.png">Download</a><canvas id="canvas"></canvas>';
    let certCanvas = overlay.querySelector("#canvas");
    drawCertificate(IMG_CERTIFICATE, name.value, certCanvas);

    let downloadCertificate = overlay.querySelector("#certificate-download");
    downloadCertificate.onclick = () => {
        var url = certCanvas.toDataURL("image/png");
        downloadCertificate.href = url;
    }
}