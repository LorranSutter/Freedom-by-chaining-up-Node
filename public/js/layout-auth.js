function loginNavBar(data) {
    if(data) {
        $("#login-link").text("Dashboard");
        $("#logout-link").css("display", "block");
    }
}

$(document).ready(function(){
    $.get('/auth')
     .done(loginNavBar);
});