$(document).ready(function () {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 3);
    now.setHours(now.getHours() - 3);

    const formattedDate = now.toISOString().substr(0, 10);
    const formattedTime = now.toTimeString().substr(0, 5);

    $('#fecha_creacion').val(formattedDate);
    $('#hora_creacion').val(formattedTime);

    const selectElement = document.getElementById("empresa");

    $.ajax({
        url: "http://127.0.0.1:8003/api/empresa",
        method: "GET",
        dataType: "json",
        success: function (data) {
            data.forEach(empresa => {
                const option = document.createElement("option");
                option.value = empresa.id;
                option.text = empresa.nombre;
                selectElement.appendChild(option);
            });
        },
        error: function (error) {
            console.error("Error al obtener los datos de la empresa:", error);
        }
    });

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
                    alert('Error al enviar los datos');
                }
            })
            .catch(error => {
                alert('Documento no encontrado en sistema');
            });
    });

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

    $('.menu-toggle').click(function () {
        $('.contenedor').toggleClass('ancho-min');
        if (window.matchMedia('(min-width: 1017px)').matches) {
          
        }
    });

    $('.menu-boton').click(function () {
        $('.menu-nav-seg').toggleClass('open-menu-nav-seg');
        $('.menu-boton i').toggleClass('fa-caret-right');
        $('.menu-boton i').toggleClass('fa-caret-down');
    });

    function mediaSize() {
        if (window.matchMedia('(min-width: 1017px)').matches) {
            $('.contenedor').removeClass('ancho-min');
        } else {
            $('.contenedor').addClass('ancho-min');
        }
    }

    mediaSize();

    window.addEventListener('resize', mediaSize, false);

    const selectci = document.getElementById("ci");

    $.ajax({
        url: "http://127.0.0.1:8003/api/clienteci",
        method: "GET",
        dataType: "json",
        success: function (data) {
            data.forEach(cliente => {
                const option = document.createElement("option");
                option.value = cliente.id;
                option.text = cliente.ci;
                selectci.appendChild(option);
            });
        },
        error: function (error) {
            console.error("Error al obtener los datos del cliente:", error);
        }
    });
});

	

	
		
