$(document).ready(function () {
    var token = localStorage.getItem("accessToken");
    if (token == null)
        $(location).prop('href', '/ADN/Login_Almacen.html');

    $("#cerrarSesion").click(function () {
        jQuery.ajax({
            url: 'http://127.0.0.1:8001/api/logout',
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            success: function (data) {
                localStorage.removeItem("accessToken");
                $(location).prop('href', '/ADN/Login_Almacen.html');
            }

        });
    });

});

var userEmail = localStorage.getItem("miEmail");
if (userEmail) {
    document.querySelector('.user-nombre').textContent = " " + userEmail;
};

document.addEventListener("DOMContentLoaded", function () {
    var userEmail = localStorage.getItem("miEmail");
    if (userEmail) {
        document.querySelector('.user-nombre2').textContent = userEmail;
        console.log("Valor de userEmail:", userEmail);
    }
});



$('.menu-toggle').click(function () {
    $('.contenedor').toggleClass('ancho-min');
    if (window.matchMedia('(min-width: 1017px)').matches) {
        /* Changes when we reach the min-width  */


    } else {
        /* Reset for CSS changes – Still need a better way to do this! */
        if (!$('.contenedor').hasClass("ancho-min")) {
            // $('.main').css('margin-left', '250px');
        }
        else {
            // $('.main').css('margin-left', '70px');
        }
    }

});

$('.menu-boton').click(function () {
    $('.menu-nav-seg').toggleClass('open-menu-nav-seg');
    $('.menu-boton i').toggleClass('fa-caret-right');
    $('.menu-boton i').toggleClass('fa-caret-down');
});

(function ($) {

    /*
    * We need to turn it into a function.
    * To apply the changes both on document ready and when we resize the browser.
    */

    function mediaSize() {
        /* Set the matchMedia  992 + 250*/
        if (window.matchMedia('(min-width: 1017px)').matches) {
            /* Changes when we reach the min-width  */
            $('.contenedor').removeClass('ancho-min');
            // $('.sidebar').css('position', 'static');
            // $('.main').css('margin-left', '0');

        } else {
            /* Reset for CSS changes – Still need a better way to do this! */
            $('.contenedor').addClass('ancho-min');
            // $('.sidebar').css('position', 'absolute');
            // $('.main').css('margin-left', '70px');
        }
    };

    /* Call the function */
    mediaSize();
    /* Attach the function to the resize event listener */
    window.addEventListener('resize', mediaSize, false);

})(jQuery);




