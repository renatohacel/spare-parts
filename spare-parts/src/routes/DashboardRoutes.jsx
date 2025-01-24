import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Inventory } from "../pages/inventory/Inventory";
import { InOuts } from "../pages/in-outs/InOuts";
import { Tools } from "../pages/tools/Tools";
import { DamageControl } from "../pages/damage-control/DamageControl";
import { Personal } from "../pages/personal/Personal";
import { Footer } from "../components/templates/Footer";
import { UserProfile } from "../pages/user-profile/UserProfile";
import { Users } from "../pages/users/Users";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { DashboardProvider } from "../context/DashboardProvider";
import { Rack } from "../pages/racks/Rack";

export const DashboardRoutes = () => {
  const { login } = useContext(AuthContext);

  //Funciones de desarrollo desactivadas
  useEffect(() => {
    if (login.user.isAdmin !== 1) {
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
    }
  }, [login.user.isAdmin]);

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="/rack" element={<Rack />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="in-outs" element={<InOuts />} />
              <Route path="tools" element={<Tools />} />
              <Route path="damage-control" element={<DamageControl />} />
              <Route path="personal" element={<Personal />} />
              <Route path="my-profile" element={<UserProfile />} />
              {login.user.isAdmin === 1 ? (
                <Route path="users" element={<Users />} />
              ) : (
                <Route path="*" element={<Navigate to="/home" />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </DashboardProvider>
  );
};
