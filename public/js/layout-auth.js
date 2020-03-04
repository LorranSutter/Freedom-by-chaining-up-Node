function loginNavBar(data) {
    if(data) {
        $("#login-link").text("Dashboard");
        $("#logout-link").css("display", "block");
    }
}

$(document).ready(function(){
    $.ajax(
        '/auth',
        {
            method: 'GET',
            success: loginNavBar
        }
    )
});