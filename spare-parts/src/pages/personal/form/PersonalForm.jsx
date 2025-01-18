import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { FaCheck } from "react-icons/fa";

export const PersonalForm = () => {
  const {
    initialPersonalForm,
    employeeSelected,
    handlerCloseFormPersonal,
    handlerAddPersonal,
    isSend,
    errors,
    //GENERALS
    onInputShift,
    onKeyShift,
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
  } = useContext(DashboardContext);

  const [personalForm, setPersonalForm] = useState(initialPersonalForm);
  const { id, name, num_employee, role, area, manager, shift } = personalForm;

  useEffect(() => {
    setPersonalForm({ ...employeeSelected });
  }, [employeeSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setPersonalForm({ ...personalForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...personalForm,
      num_employee: personalForm.num_employee
        ? parseInt(personalForm.num_employee, 10)
        : null,
      shift: personalForm.shift ? parseInt(personalForm.shift, 10) : null,
    };
    handlerAddPersonal(formData);
  };

  const onCloseForm = () => {
    handlerCloseFormPersonal();
    setPersonalForm(initialPersonalForm);
  };

  return (
    <form className="flex flex-col gap-4 w-auto p-2" onSubmit={onSubmit}>
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
        <div className="flex flex-col p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="name"
            type="text"
            value={name}
            onChange={onInputChange}
            onKeyDown={onKeyName}
            onInput={onInputName}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.name}
          </p>
        </div>
        <div className="flex flex-col p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="num_employee"
          >
            No. Empleado
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="num_employee"
            type="text"
            value={num_employee}
            onChange={onInputChange}
            maxLength={8}
            onKeyDown={onKeyNumEm}
            onInput={onInputNumEm}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.num_employee}
          </p>
        </div>
        <div className="flex flex-col p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="role"
          >
            Puesto
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="role"
            type="text"
            value={role}
            onChange={onInputChange}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.role}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="area"
          >
            Area
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area"
            type="text"
            value={area}
            onChange={onInputChange}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.area}
          </p>
        </div>
        <div className="flex flex-col p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="manager"
          >
            Manager
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="manager"
            type="text"
            value={manager}
            onChange={onInputChange}
            onKeyDown={onKeyName}
            onInput={onInputName}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.manager}
          </p>
        </div>
        <div className="flex flex-col w-full p-3">
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
            value={shift}
            onChange={onInputChange}
            onKeyDown={onKeyShift}
            onInput={onInputShift}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.shift}
          </p>
        </div>
      </div>
      <div className="flex gap-3 w-full overflow-auto p-2">
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
