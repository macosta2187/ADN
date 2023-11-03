        const lotesData = document.getElementById('lotesData');

        function cargarDatos() {
            fetch('http://127.0.0.1:8003/api/Lote', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const groupedData = groupByLoteAndStatus(data);
                    renderTable(groupedData);
                })
                .catch(error => {
                    console.error('Error al cargar los datos:', error);
                });
        }

        function groupByLoteAndStatus(data) {
            const groupedData = {};

            data.forEach(lote => {
                const key = `${lote.lote}_${lote.estatus}`;
                if (!groupedData[key]) {
                    groupedData[key] = [];
                }
                groupedData[key].push(lote);
            });

            return groupedData;
        }

        function renderTable(groupedData) {
            lotesData.innerHTML = '';

            for (const key in groupedData) {
                if (groupedData.hasOwnProperty(key)) {
                    const rows = groupedData[key];
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${rows[0].id}</td>
                        <td>${rows[0].lote}</td>
                        <td>${rows[0].camionId}</td>
                        <td>${rows.map(lote => lote.paqueteId).join(', ')}</td>
                        <td>
                            <select onchange="cambiarEstatus(${rows[0].id}, this.value)">
                                <option value="Consolidado" ${rows[0].estatus === 'Consolidado' ? 'selected' : ''}>Consolidado</option>
                                <option value="En Transito" ${rows[0].estatus === 'En Transito' ? 'selected' : ''}>En Transito</option>
                                <option value="Desconsolidado" ${rows[0].estatus === 'Desconsolidado' ? 'selected' : ''}>Desconsolidado</option>
                            </select>
                        </td>
                    `;

                    lotesData.appendChild(row);
                }
            }
        }

        function cambiarEstatus(loteId, nuevoEstatus) {
            const url = `http://127.0.0.1:8003/api/Lote/${loteId}`;

            // Datos para la solicitud PUT
            const data = {
                estatus: nuevoEstatus
            };

            // Opciones de la solicitud PUT
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            // Realizar la solicitud PUT
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al actualizar el estatus: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(loteActualizado => {
                    // Manejar la respuesta JSON con el lote actualizado
                    console.log('Lote actualizado:', loteActualizado);
                    alert('Estatus actualizado con éxito.');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el estatus.');
                });
        }

        // Cargar los datos al cargar la página
        cargarDatos();
		
		    $(document).ready(function(){
            var token = localStorage.getItem("accessToken");
            if(token == null)
            $(location).prop('href', '/ADN/loginchofer.html');
            
            $("#cerrarSesion").click(function(){
                jQuery.ajax({  
                    url: 'http://127.0.0.1:8001/api/logout',  
                    type: 'GET',
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("accessToken"),
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                    },
                    success: function(data) {  
                        localStorage.removeItem("accessToken");
                        $(location).prop('href', '/ADN/loginchofer.html');
                    }
                    
                });  
            });
            
        });
    </script>