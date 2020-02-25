var body = document.querySelector("body");
var burgerIcon = document.querySelector("#burger-icon");
var navBar = document.querySelector(".nav-bar");

function dropdownMenu() {
    // console.log("here1");
    // console.log(event);
    // console.log(event.target);
    // if(!event.target.matches("header")){
    //     console.log("here2");
    //     if (navBar.classList.contains("nav-bar-dropdown")) {
    //         navBar.classList.remove("nav-bar-dropdown");
    //     }
    //     return;
    // }

    if (navBar.classList.contains("nav-bar-dropdown")) {
        navBar.classList.remove("nav-bar-dropdown");
    } else {
        navBar.classList.add("nav-bar-dropdown");
    }
}

// body.addEventListener("click", dropdownMenu);
burgerIcon.addEventListener("click", dropdownMenu);