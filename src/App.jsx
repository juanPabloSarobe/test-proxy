import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
      const user1 = "jp.sarobe@gmail.com";
      const pass1 = "juan7595";
      const user2 = "logistica@globalfresh.com.ar";
      const pass2 = "ANDRES";

  const consulta = async () => {
    try {
      document.cookie = "rol=usuarioNormal" ;
      document.cookie = "sesion=bcb0272a5e7e87c9a395076a729835c6";
      document.cookie = "usuario=jp.sarobe%40gmail.com";

      let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: "include", // Asegura que las cookies se envíen automáticamente
      };

      const response = await fetch("api/servicio/equipos.php/lite", requestOptions);

      if (!response.ok) {
        throw new Error('La solicitud no pudo ser completada');
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const loguearse = async () => {
    try {


      const response = await fetch(`api/servicio/login2.php/login?usuario=${user2}&clave=${pass2}`);
      
      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      } else {
        console.log('Inicio de sesión exitoso');
      }
      
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
     
      const cookies = document.cookie;
    console.log('Cookies almacenadas:', cookies);


      if (cookies) {
        const cookiesArray = cookies.split(';');
        console.log('Cookies:', cookiesArray);
      } else {
        console.log('No se encontraron cookies en la respuesta');
      }
    } catch (error) {
      console.error('Error:', error);
    } 
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={loguearse}>
        loguearse
        </button>
        <button onClick={consulta}>
        Consulta
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
