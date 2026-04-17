// =============================
// VARIABLES GLOBALES
// =============================
let modoEdicion = false; // controla si estamos editando
let idClienteEditar = null; // guarda el ID del cliente a editar


// =============================
// PREPARAR NUEVO CLIENTE
// =============================
function prepararNuevo() {

    limpiarFormulario();

    modoEdicion = false;
    idClienteEditar = null;

    // cambia UI
    document.getElementById("tituloModal").textContent = "Registrar Cliente";
    document.getElementById("btn-crearCliente").textContent = "Guardar";
}


// =============================
// CARGAR CLIENTES EN TABLA
// =============================
function cargarClientes() {

    fetch('http://localhost:8080/api/clientes')
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tabla-cliente");
            tabla.innerHTML = "";

            data.forEach(cliente => {

                tabla.innerHTML += `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido}</td>
                        <td>${cliente.dni}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.direccion}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm btnEditar"
                                data-id="${cliente.id}">
                                <i class="fa-solid fa-pen-to-square"></i>Editar
                            </button>

                            <button class="btn btn-outline-danger btn-sm btnEliminar"
                                data-id="${cliente.id}">
                                <i class="fa-solid fa-trash"></i>Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}


// =============================
// EVENTO GLOBAL (EDITAR / ELIMINAR)
// =============================
document.addEventListener("DOMContentLoaded", () => {

    cargarClientes();

    document.getElementById("btn-crearCliente")
        .addEventListener("click", guardarCliente);

    document.getElementById("btnNuevo")
        .addEventListener("click", () => {
            limpiarFormulario();
            modoEdicion = false;
            idClienteEditar = null;

            document.getElementById("tituloModal").textContent = "Registrar Cliente";
            document.getElementById("btn-crearCliente").textContent = "Guardar";

            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("modalRegistroCliente")
            );

            modal.show();
        });

    // EVENTO GLOBAL AQUÍ (IMPORTANTE)
    document.addEventListener("click", (e) => {

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
                    document.getElementById("btn-crearCliente").textContent = "Actualizar";

                    const modal = bootstrap.Modal.getOrCreateInstance(
                        document.getElementById("modalRegistroCliente")
                    );

                    modal.show();
                });
        }

        const btnEliminar = e.target.closest(".btnEliminar");

        if (btnEliminar) {

            const id = btnEliminar.dataset.id;

            if (confirm("¿Eliminar cliente?")) {

                fetch(`http://localhost:8080/api/clientes/${id}`, {
                    method: "DELETE"
                }).then(res => {
                    if (res.ok) cargarClientes();
                });
            }
        }
    });
});

// =============================
// GUARDAR / ACTUALIZAR CLIENTE
// =============================
function guardarCliente() {

    const cliente = {
        nombre: document.getElementById("c_nombre").value,
        apellido: document.getElementById("c_apellido").value,
        dni: document.getElementById("c_dni").value,
        telefono: document.getElementById("c_telefono").value,
        direccion: document.getElementById("c_direccion").value
    };

    let url = 'http://localhost:8080/api/clientes';
    let metodo = 'POST';

    // si está editando → PUT
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
        .then(res => {
            if (res.ok) {

                cargarClientes();
                limpiarFormulario();
 
                modoEdicion = false;
                idClienteEditar = null;

                // reset UI
                document.getElementById("tituloModal").textContent = "Registrar Cliente";
                document.getElementById("btn-crearCliente").textContent = "Guardar";

                // =============================
                // 🟢 CAMBIO 1: quitar focus activo (FIX ARIA WARNING)
                // =============================
                document.activeElement?.blur();

                // =============================
                // 🟢 CAMBIO 2: cerrar modal de forma segura
                // =============================
                const modalEl = document.getElementById("modalRegistroCliente");
                const modal = bootstrap.Modal.getInstance(modalEl);

                modal.hide();
            }
        });
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