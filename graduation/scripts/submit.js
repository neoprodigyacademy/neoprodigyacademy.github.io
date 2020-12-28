function submit() {
    student = new Student(name.value, prodigy.value, regID.value);
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
        drawCertificate(IMG_CERTIFICATE + student.prodigy.toLowerCase() + ".png", student.name, certCanvas);

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
        drawStudentTranscript(transcriptCanvas, student);

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
        let capURL = "../assets/" + student.prodigy.toLowerCase() + "_cap.png";
        let robeURL = "../assets/" + student.prodigy.toLowerCase() + "_robe.png";
        overlay.classList.remove("hidden");
        overlay.innerHTML =
            '<a id="cap-download" class="btn btn-primary download" download href="' + capURL + '">Download</a>' +
            '<img id="cap-image" src="' + capURL + '">' +
            '<a id="robe-download" class="btn btn-primary download" download href="' + robeURL + '">Download</a>' +
            '<img id="robe-image" src="' + robeURL + '">';
    } else showError();
}

function showInvitationOverlay() {
    overlay.classList.remove("hidden");
    overlay.classList.add("full-width");

    let invitationHTML =
        '<a id="invitation-download" class="btn btn-primary download" download="invitation.jpg" href="../assets/invitation.jpg">Download</a>' +
        '<img src="../assets/invitation.jpg">';
    let guidebookHTML =
        '<a id="guidebook-[idx]-download" class="btn btn-primary download" download="guidebook[idx].jpg" href="../assets/GUIDEBOOK[idx].jpg">Download</a>' +
        '<img src="../assets/GUIDEBOOK[idx].jpg">';

    var concatenated = invitationHTML;
    for (i = 0; i < 3; i++) {
        concatenated += guidebookHTML.replaceAll("[idx]", i + 1);
    }

    overlay.innerHTML = concatenated;
}

const showInvitationButton = document.querySelector("#show-letter");
showInvitationButton.onclick = showInvitationOverlay;

function showError() {
    alert("Please register first");
}