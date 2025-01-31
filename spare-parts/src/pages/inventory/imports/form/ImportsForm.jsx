import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import Swal from "sweetalert2";

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

export const ImportsForm = () => {
  const { importsHook, generalHook } = useContext(DashboardContext);
  const { onKeyQty, onInputQty } = generalHook;
  const {
    handlerCloseForm,
    initialFormImport,
    handlerAddImport,
    importSelected,
    partNumSelected,
  } = importsHook;

  const [importForm, setImportForm] = useState({
    ...initialFormImport,
    part_num: partNumSelected,
  });
  const { id, qty, date } = importForm;

  useEffect(() => {
    setImportForm({ ...importSelected });
  }, [importSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setImportForm({
      ...importForm,
      part_num: partNumSelected,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (qty < 1) {
      Toast.fire({
        icon: "warning",
        title: "Quantity must be more than 0",
      });
    }
    handlerAddImport(importForm);
  };

  return (
    <form className="flex flex-col gap-4 w-auto p-2" onSubmit={onSubmit}>
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty"
          >
            Qty. Import
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="qty"
            type="number"
            onKeyDown={onKeyQty}
            onInput={onInputQty}
            onChange={onInputChange}
            value={qty}
          />
        </div>

        {id !== 0 && (
          <div className="flex flex-col p-1">
            <label
              className="text-slate-400 font-medium mb-1 whitespace-nowrap"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400         focus:ring-opacity-50"
              name="date"
              type="date"
              onChange={onInputChange}
              value={date}
            />
          </div>
        )}
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
          onClick={() => handlerCloseForm()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
