package com.senati.demo.entity;
import jakarta.persistence.*;

//@Entity le dice a hibermate que esta clase representa una tabla en la BD
@Entity
//@table indica el nombre exacta de tabla en mysql  o Mariadb
@Table(name = "cliente")
public class Cliente {
    //@Id marca este compo como la clave primaria de la tabla
    //@GeneratedValue hace que el ID se genere automaticamente (AutoIncrement)
    //@Column(name="cliente_id") indica el nombre exacto de la columna en mysql
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cliente_id")
    private Long id;

    //nultable=false significa que este campo no puede estar vacio en la BD
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;

    //unique=true significa que no puede haber dos clientes con el mismo DNI
    //length=8significa limita eñ campo a 8 caracteres
    @Column(nullable = false, unique = true, length = 8)
    private String dni;

    //sin anotaciones ( @ ) extra: columna normal, puede ser nula
    private String telefono;
    private String direccion;

    //GETTER a SETTER
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
