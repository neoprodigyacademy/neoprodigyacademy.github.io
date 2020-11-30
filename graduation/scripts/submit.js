class Student {
    constructor(name, prodigy) {
        this.name = name;
        this.prodigy = prodigy;
    }
}

var student = null;

function submit() {
    student = new Student(name.value, prodigy.value);
    document.querySelector(".welcome-layer").classList.add("hidden");
    document.querySelector(".cards-layer").classList.remove("hidden");
}

submitName.onclick = submit;
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
});

const showCertButton = document.querySelector("#show-certificate");
showCertButton.onclick = showCertificateOverlay;

function showCertificateOverlay() {
    if (student) {
        overlay.classList.remove("hidden");
        overlay.innerHTML = '<a id="certificate-download" class="btn btn-primary download" download="certificate.png">Download</a><canvas id="canvas"></canvas>';
        let certCanvas = overlay.querySelector("#canvas");
        drawCertificate(IMG_CERTIFICATE, student.name, certCanvas);

        let downloadCertificate = overlay.querySelector("#certificate-download");
        downloadCertificate.onclick = () => {
            var url = certCanvas.toDataURL("image/png");
            downloadCertificate.href = url;
        }
    } else showError();
}

const showTranscriptButton = document.querySelector("#show-transcript");
showTranscriptButton.onclick = showTranscriptOverlay;

function showTranscriptOverlay() {
    if (student) {
        overlay.classList.remove("hidden");
        overlay.innerHTML = '<a id="transcript-download" class="btn btn-primary download" download="transcript.png">Download</a><canvas id="canvas"></canvas>';
        let transcriptCanvas = overlay.querySelector("#canvas");
        drawTranscript(TRANSCRIPT_PREFIX + student.prodigy.toLowerCase() + ".png", student.name, transcriptCanvas);

        let download = overlay.querySelector("#transcript-download");
        download.onclick = () => {
            var url = transcriptCanvas.toDataURL("image/png");
            download.href = url;
        }
    } else showError();
}

const showGownButton = document.querySelector("#show-gown");
showGownButton.onclick = showGown;

function showGown() {
    if (student) {
        overlay.classList.remove("hidden");
        overlay.innerHTML = '<a id="transcript-download" class="btn btn-primary download" download="transcript.png">Download</a><img id="gown-image"></canvas>';
        let gownImage = overlay.querySelector("#gown-image");
        gownImage.src = "../assets/gown_" + student.prodigy.toLowerCase() + ".jpg";
    } else showError();
}

function showError() {
    alert("Please register first");
}