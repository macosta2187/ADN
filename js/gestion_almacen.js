


$('.menu-toggle').click(function() {
    $('.contenedor').toggleClass('ancho-min');
    if (window.matchMedia('(min-width: 1017px)').matches) {
       
              
  
          } else {
         
        if (!$('.contenedor').hasClass("ancho-min")) {
                
        }  
        else {
         
        }
          }
    
  });
  
  $('.menu-boton').click(function() {
    $('.menu-nav-seg').toggleClass('open-menu-nav-seg');
    $('.menu-boton i').toggleClass('fa-caret-right');
    $('.menu-boton i').toggleClass('fa-caret-down');
  });
  
  (function($) {
      

   
      function mediaSize() { 
         
          if (window.matchMedia('(min-width: 1017px)').matches) {
         
              $('.contenedor').removeClass('ancho-min');
       
  
          } else {
         
              $('.contenedor').addClass('ancho-min');
    
          }
      };
      
     
    mediaSize();
    
      window.addEventListener('resize', mediaSize, false);  
      
  })(jQuery);
  







const camionesSelect = document.getElementById('camionesSelect');
const filtroDepartamento = document.getElementById('filtroDepartamento');
//const filtroPeso = document.getElementById('filtroPeso');
const paquetesData = document.getElementById('paquetesData');
const sumaPesosLabel = document.getElementById('sumaPesosLabel');
const consolidarButton = document.querySelector('button');

const filtroGrupo = document.getElementById("filtroGrupo");

var paquetes = [];

listarCamiones();

function listarCamiones() {
    fetch('http://127.0.0.1:8002/api/Camiones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            camionesSelect.innerHTML = '';
            data.forEach(camion => {
                const option = document.createElement('option');
                option.value = camion.id_camion;
                option.textContent = camion.id_camion;
                camionesSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los camiones:', error);
        });
}

function desmarcarCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="seleccionarPaquete"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
    });
}


function cargarPaquetes() {
    fetch('http://127.0.0.1:8003/api/Paquete', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            paquetes = data;
            actualizarTabla(paquetes);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function actualizarTabla(paquetes) {


   
    const grupoSeleccionado = filtroGrupo.value;
    //const pesoSeleccionado = parseFloat(filtroPeso.value);
    paquetesData.innerHTML = '';
    let sumaPesos = 0.0;

    paquetes.forEach(paquete => {
        
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paquete.id}</td>
                <td>${paquete.descripcion}</td>
                <td>${paquete.numero}</td>
                <td>${paquete.calle}</td>                        
                <td>${paquete.localidad}</td>
                <td>${paquete.departamento}</td>
                <td>${paquete.telefono}</td>                        
                <td>${paquete.tamaño}</td>
                <td>${paquete.peso}</td>
                <td>${paquete.fecha_creacion}</td>
                <td>${paquete.hora_creacion}</td>
                <td>${paquete.codigo_seguimiento}</td>
                <td><input type="checkbox" name="seleccionarPaquete" value="${paquete.id}" data-peso="${paquete.peso}"></td>
                <td><select class="form-control" onchange="cambiarEstado(this, ${paquete.id})">
<option value="Ingresado" ${paquete.estado === 'Ingresado' ? 'selected' : ''}>Ingresado</option>
<option value="En almacen origen" ${paquete.estado === 'En almacen origen' ? 'selected' : ''}>En almacen origen</option>
<option value="En transito" ${paquete.estado === 'En transito' ? 'selected' : ''}>En transito</option>
<option value="En almacen destino" ${paquete.estado === 'En almacen destino' ? 'selected' : ''}>En almacen destino</option>
<option value="Disponible en pick up" ${paquete.estado === 'Disponible en pick up' ? 'selected' : ''}>Disponible en pick up</option>
<option value="En distribucion" ${paquete.estado === 'En distribucion' ? 'selected' : ''}>En distribucion</option>
<option value="Reagenda entrega" ${paquete.estado === 'Reagenda entrega' ? 'selected' : ''}>Reagenda entrega</option>
<option value="Entregado" ${paquete.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
</select>
</td>


            `;
            paquetesData.appendChild(row);
        
    });

    const checkboxes = document.querySelectorAll('input[name="seleccionarPaquete"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const pesoDelPaquete = parseFloat(this.getAttribute('data-peso'));

            if (this.checked) {
                sumaPesos += pesoDelPaquete;
            } else {
                sumaPesos -= pesoDelPaquete;
            }
            sumaPesosLabel.textContent = `Peso Total del envío en kg: ${sumaPesos.toFixed(2)} kg`;

            if (sumaPesos >= 1000) {
                alert("El peso total es igual o mayor a 1000 kg. Máxima capacidad de carga alcanzada");
                sumaPesosLabel.textContent = `Peso Total del envío en kg: 0.00 kg`;
                desmarcarCheckboxes();
            }
        });
    });
}


cargarPaquetes();
listarCamiones();




function consolidarPaquetes() {
const camionSeleccionado = parseInt(document.getElementById('camionesSelect').value);
const checkboxes = document.querySelectorAll('input[name="seleccionarPaquete"]:checked');

if (checkboxes.length === 0) {
alert("Selecciona al menos un paquete para consolidar.");
return;
}

const selectedPackages = Array.from(checkboxes).map(checkbox => checkbox.value);
const data = {
selectedCamion: camionSeleccionado,
selectedPackages: JSON.stringify({ Paquetes: selectedPackages })
};




fetch('http://127.0.0.1:8003/api/PaqueteLote', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(response => {
if (response.ok) {
    alert("Paquetes consolidados correctamente.");          
    cargarPaquetes();
} else {
    alert("Hubo un error al consolidar los paquetes.");
}
})
.catch(error => {
console.error('Error en la solicitud:', error);
});
}



filtroGrupo.addEventListener("change", function() {

const selectedGrupo = this.value;
const paquetesFiltrados= [];

paquetes.forEach(row => {
    const departamento = row.departamento;

    if (selectedGrupo === "" || 
(selectedGrupo === "Grupo 5" && (departamento === "Maldonado" || departamento === "Rocha")) ||
(selectedGrupo === "Grupo 4" && (departamento === "Lavalleja" || departamento === "Trinta y Tres" || departamento === "Cerro Largo")) ||
(selectedGrupo === "Grupo 3" && (departamento === "Flores" || departamento === "San José" || departamento === "Paysandú" || departamento === "Salto")) ||  // Agregado "||" después de "Paysandú"
(selectedGrupo === "Grupo 2" && (departamento === "Colonia" || departamento === "Río Negro" || departamento === "Soriano")) ||
(selectedGrupo === "Grupo 1" && (departamento === "Montevideo" || departamento === "Canelones" || departamento === "Florida" || departamento === "Durazno" || departamento === "Rivera" || departamento === "Artigas" || departamento === "Tacuarembó"))) {
paquetesFiltrados.push(row);
} 

});

      actualizarTabla(paquetesFiltrados);
});




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
function cambiarEstado(select, paqueteId) {
const nuevoEstado = select.value;

fetch(`http://127.0.0.1:8003/api/PaqueteEstado/${paqueteId}`, {
method: 'PUT',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({ estado: nuevoEstado }),
})
.then(response => {
if (response.ok) {
    alert(`El estado del paquete ${paqueteId} se cambió a "${nuevoEstado}".`);
    cargarPaquetes(); 
} else {
    alert("Hubo un error al cambiar el estado del paquete.");
    cargarPaquetes(); 
}
})
.catch(error => {
console.error('Error en la solicitud API:', error);
cargarPaquetes();
});
}





