var body = document.querySelector("body");
var burgerIcon = document.querySelector("#burger-icon");
var navBar = document.querySelector(".nav-bar");

function dropdownMenu() {
    navBar.classList.toggle("nav-bar-dropdown");
}

burgerIcon.addEventListener("click", dropdownMenu);