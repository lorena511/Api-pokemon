import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import DetallePokemon from '../DetallePokemon/DetallePokemon';

const App = () => {

  const [listaPokemon, setListaPokemon] = useState([]);
  const [detallePokemon, setDetallePokemon] = useState({});
  const [paginacion, setPaginacion] = useState({next: '', previous: ''})

  useEffect(() => {
    const cargarPokemon = async () => {
      const URL = "https://pokeapi.co/api/v2/pokemon";

      try{
        const respuesta = await axios.get(URL);
        setListaPokemon(respuesta.data.results);
        setPaginacion({
          next: respuesta.data.next,
          previous: respuesta.data.previous
        });
      }
      catch(error){
        console.log("Ocurrió un error", error);
      }
    }

    cargarPokemon();
  }, []);

  const cargarDetallePokemon = async (urlPoke) => {
    try{
      const respuesta = await axios.get(urlPoke);
      setDetallePokemon(respuesta.data);
    }
    catch(error){
      console.log("Ocurrió un error", error);
    }
  }

  const actualizaPaginacion = async (url) => {
    try{
      const respuesta = await axios.get(url);
      setListaPokemon(respuesta.data.results);
      setPaginacion({
        next: respuesta.data.next,
        previous: respuesta.data.previous
      });
    }
    catch(error){
      console.log("Ocurrió un error", error);
    }
  }

  return (
    <>
      <h1> API de Pokemon </h1>
      <div className='contenedor-pokemon'>
        <div id='detalle'>
          {(detallePokemon.name) ? 
            <DetallePokemon infoPokemon={detallePokemon}/> :
            "Para ver detalles click en cualquiera de los pokemon"
          }  
        </div>
        <ul>
          {listaPokemon.map((pokemon, index) => {
            return (<li key={index}>
                      <button onClick={() => cargarDetallePokemon(pokemon.url)}>
                        {pokemon.name}
                      </button>
                    </li>)
          })}
        </ul>
        <nav>
          {(paginacion.previous !== null) ?
            <button onClick={() => actualizaPaginacion(paginacion.previous)}>
              Página previa
            </button> :
            ""
          }
          {(paginacion.next !== null) ?
            <button onClick={() => actualizaPaginacion(paginacion.next)}>
              Seguir mirando
            </button> :
            ""
          }
        </nav>
      </div>
    </>
  )
}

export default App;