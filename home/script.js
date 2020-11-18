const registerButton = document.querySelector("#register_btn");

const form = document.querySelector(".form");
const closeBtn = document.querySelector("#hideRegister");
closeBtn.onclick = () => {
    form.style.left = "-540px";
}

const registerBtn = document.querySelector("#register_btn");
registerBtn.onclick = () => {
    form.style.left = "0";
}