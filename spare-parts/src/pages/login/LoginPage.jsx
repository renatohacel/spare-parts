import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { NvidiaLogo } from "../../components/logos/NvidiaLogo";
import { useContext, useState, useEffect } from "react"; // Importar useEffect
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from "sweetalert2";

const initialLoginForm = {
  username: "",
  password: "",
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const LoginPage = () => {
  const { handlerLogin } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  // Función para evitar el acceso a herramientas de desarrollo
  useEffect(() => {
    // Deshabilitar el menú contextual (clic derecho)
    const handleContextMenu = (e) => {
      e.preventDefault(); // Bloquear el menú contextual
    };

    // Deshabilitar atajos de teclado (Ctrl+Shift+I, F12, etc.)
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key === "I") || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === "J") || // Ctrl+Shift+J
        (e.ctrlKey && e.key === "U") || // Ctrl+U
        e.key === "F12" // F12
      ) {
        e.preventDefault(); // Bloquear la acción
      }
    };

    // Detectar si la consola está abierta
    const handleConsoleOpen = () => {
      console.clear(); // Limpiar la consola
    };

    // Verificar si la consola está abierta
    const interval = setInterval(() => {
      if (console.clear) {
        handleConsoleOpen();
      }
    }, 1000);

    // Agregar event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Limpiar event listeners al desmontar el componente
    return () => {
      clearInterval(interval);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onInputChange = ({ target: { name, value } }) => {
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      Toast.fire({
        title: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }
    // Implementamos el login
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="opacity-70">
          <h1 className="text-4xl mb-2 font-bold text-center text-slate-600">
            SPARE PARTS
          </h1>
          <div className="flex justify-center mb-8 opacity-70">
            <div className="w-24">
              <NvidiaLogo textColor={"000"} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

        <form className="space-y-7" onSubmit={onSubmit}>
          <div className="flex gap-1">
            <label className="block border-slate-400 gap-2 text-slate-400 mt-3 mr-2">
              <FaUser />
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              name="username"
              value={username}
              onChange={onInputChange}
            />
          </div>
          <div className="flex gap-1">
            <label className="block border-slate-400 gap-2 text-slate-400 mt-3 mr-2">
              <MdOutlinePassword />
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
