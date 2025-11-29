let passwordInput = document.getElementById("password");
let showIcon = document.getElementById("icone");

showIcon.onclick = () => {
    let isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    showIcon.classList.toggle("fa-eye");
    showIcon.classList.toggle("fa-eye-slash");
};
