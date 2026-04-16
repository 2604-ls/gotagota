// =============================
// VARIABLES GLOBALES
// =============================
let modoEdicion = false;
let idClienteEditar = null;


// =============================
// EVENTO AL CARGAR
// =============================
document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();

    const btnGuardar = document.getElementById("btn-crearCliente");
    btnGuardar.addEventListener("click", guardarCliente);
});


// =============================
// CARGAR CLIENTES
// =============================
function cargarClientes() {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("tabla-cliente");
            elemento.innerHTML = "";

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
                            <button data-id="${cliente.id}" class="btn btn-outline-primary btn-sm me-2 btnEditar">
                                Editar
                            </button> 

                            <button data-idcliente="${cliente.id}" class="btn btn-outline-danger btn-sm btnEliminar">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        });
}


// =============================
// ELIMINAR
// =============================
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
                        cargarClientes(); // 🔥 sin reload
                    } else {
                        alert('Error al eliminar el cliente');
                    }
                });
        }
    }
});


// =============================
// EDITAR (NUEVO)
// =============================
document.addEventListener("click", function (e) {
    const btnEditar = e.target.closest(".btnEditar");

    if (btnEditar) {
        const id = btnEditar.dataset.id;

        fetch(`http://localhost:8080/api/clientes/${id}`)
            .then(res => res.json())
            .then(cliente => {

                document.getElementById("c_nombre").value = cliente.nombre;
                document.getElementById("c_apellido").value = cliente.apellido;
                document.getElementById("c_dni").value = cliente.dni;
                document.getElementById("c_telefono").value = cliente.telefono;
                document.getElementById("c_direccion").value = cliente.direccion;

                modoEdicion = true;
                idClienteEditar = id;

                document.getElementById("tituloModal").textContent = "Editar Cliente";

                const modal = new bootstrap.Modal(document.getElementById('modalRegistroCliente'));
                modal.show();
            });
    }
});


// =============================
// GUARDAR / ACTUALIZAR
// =============================
function guardarCliente() {
    const nombre = document.getElementById("c_nombre").value.trim();
    const apellido = document.getElementById("c_apellido").value.trim();
    const dni = document.getElementById("c_dni").value.trim();
    const telefono = document.getElementById("c_telefono").value.trim();
    const direccion = document.getElementById("c_direccion").value.trim();

    if (!nombre || !apellido || !dni) {
        alert("Completa los campos obligatorios");
        return;
    }

    const cliente = { nombre, apellido, dni, telefono, direccion };

    let url = 'http://localhost:8080/api/clientes';
    let metodo = 'POST';

    // 👉 SI ESTÁ EDITANDO
    if (modoEdicion) {
        url = `http://localhost:8080/api/clientes/${idClienteEditar}`;
        metodo = 'PUT';
    }

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
        .then(response => {
            if (response.ok) {
                alert(modoEdicion ? "Cliente actualizado" : "Cliente guardado");

                limpiarFormulario();
                cargarClientes();

                // reset
                modoEdicion = false;
                idClienteEditar = null;

                document.getElementById("tituloModal").textContent = "Registrar Cliente";

                const modal = bootstrap.Modal.getInstance(document.getElementById('modalRegistroCliente'));
                modal.hide();
            } else {
                alert("Error en la operación");
            }
        })
        .catch(error => console.error("Error:", error));
}


// =============================
// LIMPIAR FORMULARIO
// =============================
function limpiarFormulario() {
    document.getElementById("c_nombre").value = "";
    document.getElementById("c_apellido").value = "";
    document.getElementById("c_dni").value = "";
    document.getElementById("c_telefono").value = "";
    document.getElementById("c_direccion").value = "";
}