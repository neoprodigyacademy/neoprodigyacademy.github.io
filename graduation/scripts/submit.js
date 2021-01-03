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
const showTranscriptButton = document.querySelector("#show-transcript");
const showGownButton = document.querySelector("#show-gown");
const showInvitationButton = document.querySelector("#show-letter");

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

function showGown() {
    if (student) {
        let plakatURL = "../assets/" + student.prodigy.toLowerCase() + "_plakat.png";
        let capURL = "../assets/" + student.prodigy.toLowerCase() + "_cap.png";
        let robeURL = "../assets/" + student.prodigy.toLowerCase() + "_robe.png";
        overlay.classList.remove("hidden");
        overlay.innerHTML =
            '<a id="plakat-download" class="btn btn-primary download" download href="' + plakatURL + '">Download</a>' +
            '<img id="plakat-image" src="' + plakatURL + '">' +
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
    let mainHTML =
        '<a id="main-download" class="btn btn-primary download" download="invitation_main.jpg" href="../assets/invitation_main.jpg">Download</a>' +
        '<img src="../assets/invitation_main.jpg">';
    let guidebookHTML =
        '<a id="guidebook-[idx]-download" class="btn btn-primary download" download="guidebook[idx].jpg" href="../assets/GUIDEBOOK[idx].jpg">Download</a>' +
        '<img src="../assets/GUIDEBOOK[idx].jpg">';
    
    var concatenated = invitationHTML + mainHTML;
    for (i = 0; i < 3; i++) {
        concatenated += guidebookHTML.replaceAll("[idx]", i + 1);
    }
    
    overlay.innerHTML = concatenated;
}

function showError() {
    alert("Please register first");
}

showInvitationButton.onclick = showInvitationOverlay;
showCertButton.onclick = showCertificateOverlay;
showTranscriptButton.onclick = showTranscriptOverlay;
showGownButton.onclick = showGown;