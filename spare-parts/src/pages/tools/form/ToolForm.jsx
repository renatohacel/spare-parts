import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

export const ToolForm = () => {
  const { toolsHook } = useContext(DashboardContext);
  const {
    handlerCloseFormTable,
    initialToolForm,
    errors,
    handlerAddTool,
    toolSelected,
  } = toolsHook;

  const [toolForm, setToolForm] = useState(initialToolForm);
  const { id, name } = toolForm;

  useEffect(() => {
    setToolForm({ ...toolSelected });
  }, [toolSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setToolForm({ ...toolForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handlerAddTool(toolForm);
  };

  const onCloseForm = () => {
    handlerCloseFormTable();
  };

  return (
    <form className="flex flex-col gap-4 w-auto p-2" onSubmit={onSubmit}>
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1">
          <input type="hidden" value={id} name="id" />
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
            onChange={onInputChange}
            value={name}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.name}
          </p>
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
