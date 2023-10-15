// Declarar paquetes en el ámbito global
let paquetes = [];

// Función para cargar los paquetes
function cargarPaquetes() {
    fetch('http://127.0.0.1:8003/api/Paquete', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Asignar el valor a la variable paquetes
        paquetes = data;
        actualizarTabla();
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });
}

// Función para listar los camiones
function listarCamiones() {
    fetch('http://127.0.0.1:8002/api/Camiones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const camionesSelect = document.getElementById('camionesSelect');
        // Limpiar el combobox
        camionesSelect.innerHTML = '';
        
        // Iterar sobre los camiones y agregar opciones al combobox
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



    const checkboxes = document.querySelectorAll('input[name="seleccionarPaquete"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                sumaPesos += parseFloat(this.value);
            } else {
                sumaPesos -= parseFloat(this.value);
            }
            sumaPesosLabel.textContent = `Peso Total del envío en kg: ${sumaPesos.toFixed(2)} kg`;
        });
    });



// Cargar los camiones al inicio
listarCamiones();

// Agregar event listeners
document.getElementById('filtroDepartamento').addEventListener('change', () => {
    actualizarTabla();
});
document.getElementById('filtroPeso').addEventListener('change', () => {
    actualizarTabla();
});
document.querySelector('button').addEventListener('click', consolidarPaquetes);
cargarPaquetes();

