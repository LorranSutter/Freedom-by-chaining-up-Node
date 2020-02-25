// Thanks to https://codepen.io/diegoleme/pen/surIK

var password = document.getElementById("login-password")
var passwordConfirm = document.getElementById("login-password-confirm");

function validatePassword(){
  if(password.value != passwordConfirm.value) {
    passwordConfirm.setCustomValidity("Password don't match");
  } else {
    passwordConfirm.setCustomValidity('');
  }
}

password.addEventListener("change", validatePassword);
passwordConfirm.addEventListener("keyup", validatePassword);