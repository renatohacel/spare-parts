import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

export const CheckReturnForm = () => {
  const { outToolsHook } = useContext(DashboardContext);
  const {
    handlerCloseFormReturn,
    initialCommentsForm,
    commentsSelected,
    handlerCheckReturn,
  } = outToolsHook;

  const [returnForm, setReturnForm] = useState(initialCommentsForm);
  const { comments } = returnForm;

  useEffect(() => {
    setReturnForm({ ...commentsSelected });
  }, [commentsSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setReturnForm({ ...returnForm, [name]: value });
  };

  const onCloseForm = () => {
    handlerCloseFormReturn();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = date.toTimeString().split(" ")[0]; // HH:mm:ss

    const formData = {
      ...returnForm,
      is_returned: 1,
      date_return: formattedDate,
      time_return: formattedTime,
    };
    handlerCheckReturn(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col p-1">
        <label className="text-slate-400 font-medium mb-1" htmlFor="area">
          Comentarios
        </label>
        <textarea
          className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          name="comments"
          type="text"
          value={comments}
          onChange={onInputChange}
        />
      </div>
      <p
        className="text-slate-400 italic text-center"
        style={{ fontSize: "0.9rem" }}
      >
        Se puede dejar en blanco, se registrará el regreso de todos modos
      </p>
      <div className="flex gap-3 w-full overflow-auto mt-4 p-1 col-span-2">
        <button
          type="submit"
          className="shadow text-slate-200 text-center text-sm bg-teal-600 p-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 w-32 transition"
        >
          Registrar
        </button>
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
