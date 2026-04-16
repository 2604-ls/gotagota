package com.senati.demo.controller;

import com.senati.demo.entity.Cliente;
import com.senati.demo.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//ANOTACIONES
//Indica que esta clase maneja peticiones HTTPS y DEVUELVE JSON
@RestController
//Define la URL Base de todos los END-POINT de esta clase
@RequestMapping("api/clientes")
//Esta anotacion permite que el front-end puedo llamara esta API
//Si no ponemos esto, el navegador bloquea las peticiones por politicos CORS
@CrossOrigin(origins = "*")
public class ClienteController {
    //DECLARAMOS UNA VARIABLE CONSTANTE
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService){
        this.clienteService = clienteService;
    }

    //GET /api/clientes -> devuelve todos los clientes en formato JSON
    @GetMapping
    public List<Cliente> listar() {return clienteService.ListarTodos();}

    @PostMapping
    public ResponseEntity<Cliente> crear(@RequestBody Cliente cliente){
        return  ResponseEntity.ok(clienteService.crearCliente(cliente));
    }

    //DELETE/api/cliente/{id} -> elimina un cliente pur su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id){
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }

}
