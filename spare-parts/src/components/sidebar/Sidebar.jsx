import { NvidiaLogo } from "../logos/NvidiaLogo";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { MenuInventario } from "./MenuInventario";
import { MenuInOuts } from "./MenuInOuts";
import { MenuTools } from "./MenuTools";
import { MenuDamageControl } from "./MenuDamageControl";
import { MenuPersonal } from "./MenuPersonal";
import { MenuAdmin } from "./MenuAdmin";

export const Sidebar = () => {
  const { login, handlerLogout } = useContext(AuthContext);
  return (
    <aside className="w-[260px] bg-slate-300 bg-opacity-60 text-slate-500 p-6 space-y-4 shadow-lg flex flex-col h-screen">
      <div className="flex-grow">
        <NavLink to={"/home"}>
          <div className="transition-all duration-300 bg-blue-50 hover:bg-white hover:bg-opacity-70  rounded-lg p-2 mb-6 shadow-lg hover:cursor-pointer text-slate-800 text-opacity-70">
            <div className="opacity-80">
              <h1 className="text-2xl mb-2 font-bold text-center text-slate-600">
                SPARE PARTS
              </h1>
              <div className="flex justify-center mb-2 opacity-70">
                <div className="w-24">
                  <NvidiaLogo textColor={"000"} />
                </div>
              </div>
            </div>
          </div>
        </NavLink>

        <hr className="border-slate-400 border-opacity-40" />

        <nav className="flex flex-col gap-3 p-2 font-semibold rounded-lg">
          {/* INVENTARIO */}
          <MenuInventario />

          {/* INGRESOS / SALIDAS */}
          <MenuInOuts />

          {/* HERRAMIENTAS */}
          <MenuTools />

          {/*CONTROL DE DANIOS */}
          <MenuDamageControl />

          {/*PERSONAL */}
          <MenuPersonal />

          {/* ADMIN MENU */}
          {login.user.isAdmin === 1 && <MenuAdmin />}
        </nav>
      </div>

      <hr className="border-slate-400 border-opacity-40" />

      <div className="mt-auto flex gap-3">
        {/* Botón circular */}
        <NavLink
          to={"/my-profile"}
          className="w-12 h-9 text-center bg-slate-600 text-blue-50 font-semibold border hover:border-teal-700 hover:border-opacity-50 rounded-full hover:bg-teal-600 transition duration-300 mt-[4px] shadow-lg"
        >
          <p className="text-lg mt-[2px]">
            {login.user?.username.charAt(0).toUpperCase()}
          </p>
        </NavLink>

        {/* Botón normal */}
        <button
          className="w-full p-2 text-center text-slate-500 font-semibold border border-slate-400 border-opacity-10 rounded-lg hover:bg-slate-500 hover:text-white transition duration-300 shadow-lg"
          onClick={handlerLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};
