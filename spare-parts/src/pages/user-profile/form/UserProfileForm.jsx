import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";

export const UserProfileForm = () => {
  const { login } = useContext(AuthContext);
  const { userProfileHook } = useContext(DashboardContext);
  const { handleCloseFormProfile, handleEditProfile, errors } = userProfileHook;

  const [profileForm, setProfileForm] = useState({
    id: login.user.id,
    username: login.user.username,
    password: "",
  });

  const onInputChange = ({ target: { value, name } }) => {
    setProfileForm({ ...profileForm, [name]: value.trim() });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (profileForm.password === "") {
      const formData = {
        id: profileForm.id,
        username: profileForm.username,
      };

      handleEditProfile(formData);
    } else {
      handleEditProfile(profileForm);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" value={profileForm.id} />
      <div className="flex flex-col p-3">
        <label
          className="text-slate-400 font-medium mb-1 whitespace-nowrap"
          htmlFor="username"
        >
          Usuario
        </label>
        <input
          className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          name="username"
          type="text"
          value={profileForm.username}
          onChange={onInputChange}
        />
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.username}
        </p>
      </div>
      <div className="flex flex-col p-3">
        <label
          className="text-slate-400 font-medium mb-1 whitespace-nowrap"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          name="password"
          type="password"
          onChange={onInputChange}
          value={profileForm.password}
        />
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.password}
        </p>
      </div>

      <p className="text-slate-400 italic" style={{ fontSize: "0.9rem" }}>
        Si dejas la contraseña en blanco no cambiará la actual
      </p>
      <div className="flex gap-3 w-full overflow-auto p-2 mt-3">
        <button
          type="submit"
          className="shadow text-slate-200 text-center text-sm bg-amber-500 p-2 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-800 w-32 transition"
        >
          Editar
        </button>
        <button
          type="button"
          className="shadow text-slate-400 text-center text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-400 hover:text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          onClick={handleCloseFormProfile}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
