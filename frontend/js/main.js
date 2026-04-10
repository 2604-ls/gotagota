// EVENTOS EN JAVASCRIPT (CLICK, CARGAR, KEY,)
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {
            console.log('Datos:', data);
            const elemento = document.getElementById("tabla-cliente")
            elemento.innerHTML = JSON.stringify(data);
            console.log(elemento)
        })
});
