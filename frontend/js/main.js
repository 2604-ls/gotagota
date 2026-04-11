// EVENTOS EN JAVASCRIPT (CLICK, CARGAR, KEY,)
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {
            //DOM -> <tbody id="table-cliente">
            const elemento = document.getElementById("tabla-cliente")

            for (let i = 0; i < data.length; i++) {
                //data[i], muestra en forma de array
                let cliente = data[i]
                //alt+96
                let fila = `
                            <tr>
                                <td>${cliente.id}</td>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.apellido}</td>
                                <td>${cliente.dni}</td>
                                <td>${cliente.telefono}</td>
                                <td>${cliente.direccion}</td>
                                <td>
                                    <button class="btn btn-outline-primary btn-sm me-1">
                                        <i class="fas fa-edit"></i> Editar
                                    </button> 

                                    <button id="btnEliminar" data-idcliente = ${cliente.id} class="btn btn-outline-danger btn-sm">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                            `
                elemento.innerHTML += fila
                //console.log(cliente) //Muestra los resultados en consola
            }
        })
});

//EVENTO DE CLICK JAVASCRIP
//Creamos una variable que alcance el DOM de ese elemento de boton
document.addEventListener("click", function(e){
    const btnDelete = e.target.closest(".btnEliminar");
    if(btnDelete){
        alert("Eliminado...");

        const id = btnDelete.dataset.idcliente;

        fetch(`http://localhost:8080/api/clientes/${id}`,{
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok){
                alert('Cliente eliminado correctamente');
                location.reload(); //Recargar la pagina para reflejar los cambios
            }else{
                alert('Error al eliminar el cliente: ' + response.status);
            }
        })
    }
});
