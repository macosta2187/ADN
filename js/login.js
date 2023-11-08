$(document).ready(function () {

    var token = localStorage.getItem("accessToken");
    if (token != null)
        $(location).prop('href', '/ADN/AlmacenMenu.html');

    $("#btnLogin").click(function () {
        var email = $("#email").val();
        var contraseña = $("#contraseña").val();

        var data = {
            "email": email,
            "contraseña": contraseña

        }

        $.ajax({
            url: 'http://127.0.0.1:8001/api/loginAlmacen/token',
            type: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),

            success: function (data) {
                localStorage.setItem("accessToken", data.access_token);
                $(location).prop('href', '/ADN/AlmacenMenu.html');
            },

            error: function (data) {
                // Mostrar el mensaje de error en el modal
                $("#modalMessage").text("Credenciales inválidas");
                $('#myModal').modal('show');
            }
        });
    });
});


