$(document).ready(function () {
    var token = localStorage.getItem("accessToken");
    if (token == null)
        $(location).prop('href', '/ADN/Login_Choferes.html');

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
                window.location.href = '/ADN/Login_Choferes.html';
            }
        });
    });
});



$(document).ready(function() {
    $('#paquetes-tabla').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
    });
});
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.9011, lng: -56.1645 },
            zoom: 13
        });

        document.getElementById('searchBtn').addEventListener('click', function () {
            const searchId = document.getElementById('searchId').value;

            
            fetch(`http://127.0.0.1:8002/api/listar-rutas/${searchId}`)

                .then(response => response.json())
                .then(data => {
                    var origen = new google.maps.LatLng(data.origen.latitud, data.origen.longitud);
                    var destino = new google.maps.LatLng(data.destino.latitud, data.destino.longitud);

                    var origenMarker = new google.maps.Marker({
                        position: origen,
                        map: map,
                        title: data.origen.nombre
                    });

                    var destinoMarker = new google.maps.Marker({
                        position: destino,
                        map: map,
                        title: data.destino.nombre
                    });

                    var request = {
                        origin: origen,
                        destination: destino,
                        travelMode: 'DRIVING'
                    };

                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer();

                    directionsDisplay.setMap(map);

                    directionsService.route(request, function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);

                            var route = response.routes[0].legs[0];
                            var distance = route.distance.text;
                            var routeText = route.start_address + ' - ' + route.end_address;
                            var time = route.duration.text;

                            document.getElementById('distance').textContent = distance;
                            document.getElementById('route').textContent = routeText;
                            document.getElementById('time').textContent = time;
                        } else {
                            console.log('Error al obtener la ruta:', status);
                            
                        }
                    });
                })
                .catch(error => {
                    alert('No hay presente un paquete con ese id');

                });
        });

        fetch('http://127.0.0.1:8002/api/paquetes-en-transito') 
            .then(response => response.json())
            .then(data => {
                const paquetesList = document.getElementById('paquetes-list');
                data.forEach(paquete => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${paquete.id}</td>
                        <td>${paquete.departamento}</td>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.estado}</td>
                    `;
                    paquetesList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al obtener la lista de paquetes:', error);
            });
    }

    var userEmail = localStorage.getItem("miEmail");
    if (userEmail) {
        document.querySelector('.user-nombre').textContent = " " + userEmail;
    };
    
    
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