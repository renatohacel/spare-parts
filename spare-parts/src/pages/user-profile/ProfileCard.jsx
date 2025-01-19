import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { DashboardContext } from "../../context/DashboardContext";
import { CiEdit } from "react-icons/ci";

export const ProfileCard = () => {
  const { login } = useContext(AuthContext);
  const { userProfileHook } = useContext(DashboardContext);
  const { handleOpenFormProfile } = userProfileHook;
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 w-100 p-5 gap-5 rounded-lg">
      {/* LOGO USER */}
      <div className="rounded-full bg-teal-600 p-10 mb-6 w-52 h-52 flex items-center justify-center shadow-lg">
        <p className="text-9xl mb-9 text-slate-100">
          {login.user.username.charAt(0).toUpperCase()}
        </p>
      </div>
      {/* NOMBRE */}
      <div className="flex flex-col items-center">
        <p className="text-slate-400 opacity-50 text-sm">Nombre</p>
        <h2 className="font-bold text-2xl">{login.user.name}</h2>
      </div>
      {/* EMAIL */}
      {login.user.email && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-slate-400 opacity-50 text-sm">Correo</p>
            <h2 className="text-lg">{login.user.email}</h2>
          </div>
        </>
      )}
      {/* USERNAME */}
      <div className="flex flex-col items-center">
        <p className="text-slate-400 opacity-50 text-sm">Usuario</p>
        <div className="flex flex-row gap-2">
          <h2 className="ml-7">{login.user.username}</h2>
          <button onClick={handleOpenFormProfile}>
            <CiEdit className="text-slate-400 hover:text-black" />
          </button>
        </div>
      </div>
      {/* NO. EMPLEADO */}
      <div className="flex flex-col items-center">
        <p className="text-slate-400 opacity-50 text-sm">No. Empleado</p>
        <h2>{login.user.num_employee}</h2>
      </div>
      {/* TURNO */}
      <div className="flex flex-col items-center">
        <p className="text-slate-400 opacity-50 text-sm">Turno</p>
        <h2>Turno {login.user.shift}</h2>
      </div>
    </div>
  );
};
