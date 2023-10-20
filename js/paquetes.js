        document.getElementById('myForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
            })
                .then(response => {

                    if (response.status === 200) {
                        alert('Formulario enviado con éxito.');
                        document.getElementById('myForm').reset();
                    } else {
                        alert('Hubo un error al enviar el formulario.');
                    }
                })
                .catch(error => {
                    alert('Hubo un error al enviar el formulario.');
                });
        });


        

        $(document).ready(function () {
            var token = localStorage.getItem("accessToken");
            if (token == null)
                $(location).prop('href', '/ADN/Login_Almacen.html');

            $("#cerrarSesion").click(function () {
                jQuery.ajax({
                    url: 'http://127.0.0.1:8001/api/logout',
                    type: 'POST',
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