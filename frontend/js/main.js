// EVENTO AL CARGAR EL DOM
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("tabla-cliente");

            for (let i = 0; i < data.length; i++) {
                let cliente = data[i];

                let fila = `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido}</td>
                        <td>${cliente.dni}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.direccion}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm me-2">
                                <i class="fas fa-edit"></i> Editar
                            </button> 

                            <button data-idcliente="${cliente.id}" class="btn btn-outline-danger btn-sm btnEliminar">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        });
});


// EVENTO CLICK (ELIMINAR)
document.addEventListener("click", function (e) {
    const btnDelete = e.target.closest(".btnEliminar");

    if (btnDelete) {
        const id = btnDelete.dataset.idcliente;

        if (confirm("¿Seguro que deseas eliminar este cliente?")) {
            fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        alert('Cliente eliminado correctamente');
                        location.reload();
                    } else {
                        alert('Error al eliminar el cliente: ' + response.status);
                    }
                });
        }
    }
});

// EVENTO PARA GUARDAR CLIENTE
document.addEventListener("DOMContentLoaded", () => {
    const btnGuardar = document.getElementById("btn-crearCliente");

    btnGuardar.addEventListener("click", function () {
        guardarCliente();
    });
});

// FUNCION GUARDAR CLIENTE
function guardarCliente() {
    const nombre = document.getElementById("c_nombre").value;
    const apellido = document.getElementById("c_apellido").value;
    const dni = document.getElementById("c_dni").value;
    const telefono = document.getElementById("c_telefono").value;
    const direccion = document.getElementById("c_direccion").value;

    const cliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        telefono: telefono,
        direccion: direccion
    };

    fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
        .then(response => {
            if (response.ok) {
                alert("Cliente guardado correctamente");
                location.reload();
            } else {
                alert("Error al guardar cliente");
            }
        })
        .catch(error => console.error("Error:", error));
}