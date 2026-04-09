package com.senati.demo.repository;

import com.senati.demo.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Anotacion @repository INTERFAZ COMO LA CAPA DE ACCESO A LA BSE DE DATOS
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    //No necesitamos escribir noda aqui
    //JpaRepository ya tiene_todo_lo_basico
}
