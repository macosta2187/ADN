$(document).ready(function () {

    var token = localStorage.getItem("accessToken");
    if (token != null)
        $(location).prop('href', '/ADN/ChoferMenu.html');

    $("#btnLogin").click(function () {
        var email = $("#email").val();
        var contraseña = $("#contraseña").val();

        var data = {
            "email": email,
            "contraseña": contraseña

        }

        $.ajax({
            url: 'http://127.0.0.1:8001/api/loginChofer/token',
            type: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),

            success: function (data) {
                localStorage.setItem("accessToken", data.access_token);
                $(location).prop('href', '/ADN/ChoferMenu.html');
            },

            error: function (data) {                
                alert("Credenciales inválidas");
               
            }
        });
    });
});


var emailInput = document.getElementById("email");        
        document.getElementById("btnLogin").addEventListener("click", function () {
            
            var email = emailInput.value;

            if (email) {                
                localStorage.setItem("miEmail", email);                
            } 
        });