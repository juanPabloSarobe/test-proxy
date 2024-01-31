import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

/*   const consulta = () => {
 
let myHeaders = new Headers();
myHeaders.append("Cookie", "rol=usuarioNormal; sesion=bcb0272a5e7e87c9a395076a729835c6; usuario=jp.sarobe%40gmail.com");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

    const cabecera = {
      Cookie:"rol=usuarioNormal; sesion=bcb0272a5e7e87c9a395076a729835c6; usuario=jp.sarobe%40gmail.com"
    }

  let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
  
};


fetch("/foo"+"/servicio/equipos.php/lite/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  } */

  const consulta = async () => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "rol=usuarioNormal; sesion=bcb0272a5e7e87c9a395076a729835c6; usuario=jp.sarobe%40gmail.com");
    myHeaders.append("Content-Type", "application/json");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: "include",
    };

    const response = await fetch("^/fallback/servicio/equipos.php/lite/", requestOptions);
    
    if (!response.ok) {
      throw new Error('La solicitud no pudo ser completada');
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}


 
  const loguearse = () => {
  
    const user1 = "jp.sarobe@gmail.com"
    const pass1 = "juan7595"
    const user2 = "logistica@globalfresh.com.ar"
    const pass2 = "ANDRES"
    
    fetch("api/servicio/login2.php/login?usuario="+user1+"&clave=" +pass1)
      .then(response => {
        response.text()
        console.log(response)
      })

      .then(result => {
         const cookies = result.headers.get('set-cookie');
    
    // Configurar las cookies en una variable
    const cookiesArray = cookies.split(';');

    // Aquí puedes hacer lo que quieras con las cookies
    console.log('Cookies:', cookiesArray);
      }
        
        )
      .catch(error => console.log('error', error));


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
