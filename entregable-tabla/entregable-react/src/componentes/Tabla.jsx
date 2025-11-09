import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
function Tabla() {
  const [personas, setPersonas] = useState([])

  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users')
        const datos = await respuesta.json();
        console.log(datos);
        setPersonas(datos);

      } catch (error) {
        console.log('Hubo un error, ' + error.menssage);
      }
    }
    cargarDatos();

  }, [])

  function eliminarPersona(id) {
    setPersonas(personas.filter(p => p.id !== id))
    //crea un nuevo array con los distintos, filtra los iguales. Devuelve T o F

  }
  function busqueda(valor) {
    const buscado = personas.filter((p) => p.name.toLowerCase().includes(valor.toLowerCase()));
    setPersonas(buscado);
  }
  return (
    <>
      <input type="text" placeholder='Busqueda' onChange={(evento) => busqueda(evento.target.value)} />

      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Nombre</th>

          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.name}</td>
              <td><button onClick={() => eliminarPersona(persona.id)}>Eliminar</button></td>

            </tr>
          ))}
        </tbody>
      </Table>

    </>
  )
}

export default Tabla
