import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  const [count, setCount] = useState(0);
  const user1 = "jp.sarobe@gmail.com";
  const pass1 = "juan7595";
  const user2 = "logistica@globalfresh.com.ar";
  const pass2 = "ANDRES";
  const user3 = "SSMA";
  const pass3 = "SEGURIDAD2024";

  const consulta = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include", // Asegura que las cookies se envíen automáticamente
      };

      const response = await fetch(
        "api/servicio/equipos.php/lite",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("La solicitud no pudo ser completada");
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const pref = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include", // Asegura que las cookies se envíen automáticamente
      };

      const response = await fetch(
        "api/servicio/equipos.php/pref",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("La solicitud no pudo ser completada");
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      // Crear el payload en formato URL-encoded
      const payload = new URLSearchParams();
      payload.append("usuario", username);
      payload.append("clave", password);

      let requestOptions = {
        method: "POST",
        body: payload.toString(), // Convertir a string
        headers: myHeaders,
        redirect: "follow",
        credentials: "include", // Asegura que las cookies se envíen automáticamente
      };

      console.log("Enviando datos de inicio de sesión:", requestOptions.body);

      const response = await fetch(
        `api/servicio/login.php/login`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud de inicio de sesión");
      } else {
        const result = await response.json();
        console.log("Resultado de inicio de sesión:", result?.cookie);
        if (result?.cookie == null) {
          throw new Error("usuario o password incorrecto");
        }
        console.log("Inicio de sesión exitoso", result.cookie);
        if (result && result.rol) {
          document.cookie = `rol=${result.rol}`;
        }
        if (result && result.cookie) {
          document.cookie = `sesion=${result.cookie}`;
        }
        if (result && result.rol) {
          document.cookie = `usuario=${username}`;
        }
        console.log("Cookies almacenadas:", document.cookie);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

        {/* Integración del componente LoginForm */}
        <LoginForm onLogin={handleLogin} />
        <button onClick={consulta}>Consulta</button>
        <button onClick={pref}>pref</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
