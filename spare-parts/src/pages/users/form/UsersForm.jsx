import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { FaCheck } from "react-icons/fa";

export const UsersForm = () => {
  const { usersHook, generalHook } = useContext(DashboardContext);
  const {
    initialUsersForm,
    handlerCloseFormUsers,
    errors,
    userSelected,
    handlerAddUser,
    isSend,
  } = usersHook;
  const {
    //GENERALS
    onInputShift,
    onKeyShift,
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
  } = generalHook;

  const [usersForm, setUsersForm] = useState(initialUsersForm);
  const { id, username, password, name, num_employee, shift, isAdmin } =
    usersForm;

  useEffect(() => {
    setUsersForm({ ...userSelected });
  }, [userSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setUsersForm({ ...usersForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formData;
    if (usersForm.password === "") {
      formData = {
        id,
        username,
        name,
        num_employee: parseInt(usersForm.num_employee, 10),
        shift: parseInt(usersForm.shift, 10),
        isAdmin: parseInt(usersForm.isAdmin, 10),
      };
    } else {
      formData = {
        ...usersForm,
        num_employee: parseInt(usersForm.num_employee, 10),
        shift: parseInt(usersForm.shift, 10),
        isAdmin: parseInt(usersForm.isAdmin, 10),
      };
    }
    handlerAddUser(formData);
  };

  const onCloseForm = () => {
    handlerCloseFormUsers();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-full max-w-4xl p-2 mx-auto"
    >
      {isSend && (
        <p
          className="text-green-700 italic flex gap-2 ml-3"
          style={{ fontSize: "0.9rem" }}
        >
          Registrado con éxito <FaCheck className="mt-[4px]" />
        </p>
      )}
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="username"
            type="text"
            value={username || ""}
            onChange={onInputChange}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.username}
          </p>
        </div>
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="password"
            type="password"
            value={password || ""}
            onChange={onInputChange}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.password}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="name"
            type="text"
            value={name || ""}
            onChange={onInputChange}
            onKeyDown={onKeyName}
            onInput={onInputName}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.name}
          </p>
        </div>
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="num_employee"
          >
            No. Empleado
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="num_employee"
            type="text"
            value={num_employee || ""}
            onChange={onInputChange}
            onKeyDown={onKeyNumEm}
            onInput={onInputNumEm}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.num_employee}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="shift"
          >
            Turno
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="shift"
            type="number"
            min={1}
            max={3}
            value={shift || ""}
            onChange={onInputChange}
            onKeyDown={onKeyShift}
            onInput={onInputShift}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.shift}
          </p>
        </div>
        <div className="flex flex-col p-1 w-full">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="isAdmin"
          >
            Tipo de usuario
          </label>
          <select
            name="isAdmin"
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            value={isAdmin || ""}
            onChange={onInputChange}
          >
            <option value={0}>Estándar</option>
            <option value={1}>Administrador</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 w-full overflow-auto mt-4 p-1">
        {id === 0 ? (
          <button
            type="submit"
            className="shadow text-slate-200 text-center text-sm bg-teal-600 p-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 w-32 transition"
          >
            Registrar
          </button>
        ) : (
          <button
            type="submit"
            className="shadow text-slate-200 text-center text-sm bg-amber-500 p-2 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-800 w-32 transition"
          >
            Editar
          </button>
        )}

        <button
          type="button"
          className="shadow text-slate-400 text-center text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-400 hover:text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          onClick={onCloseForm}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
