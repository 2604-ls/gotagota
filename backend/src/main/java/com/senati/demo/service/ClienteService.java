package com.senati.demo.service;

import com.senati.demo.entity.Cliente;
import com.senati.demo.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

//Importamos la anotacion @service
//Esto es la capa de logica de negocio, aqui van las validaciones, calculos, etc.
@Service
public class ClienteService {
    //Inyectamos el repositorio para poder accedes a la base de datos
    private final ClienteRepository clienteRepository;

    //Contructor: Spring inyecta automaticamente el reposotorio
    public ClienteService(ClienteRepository clienteRepository){
        this.clienteRepository = clienteRepository;
    }
    //Retorna o recive la lista de todos los clientes
    public List<Cliente> ListarTodos(){
        return clienteRepository.findAll();
    }

    //crear un cliente             //nombre de la clase
    public Cliente crearCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    //Elimina el cliente por ID
    public void eliminarCliente(long id){
        clienteRepository.deleteById(id);

    };
}
