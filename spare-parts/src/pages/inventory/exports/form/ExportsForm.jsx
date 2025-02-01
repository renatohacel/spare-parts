import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DashboardContext } from "../../../../context/DashboardContext";

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

export const ExportsForm = () => {
  const { exportsHook, generalHook } = useContext(DashboardContext);
  const { onKeyQty, onInputQty } = generalHook;
  const {
    handlerCloseForm,
    initialFormExport,
    handlerAddExport,
    exportSelected,
    partNumSelected,
  } = exportsHook;

  const [exportForm, setExportForm] = useState({
    ...initialFormExport,
    part_num: partNumSelected,
  });
  const { id, qty, receiver_location, date } = exportForm;

  useEffect(() => {
    setExportForm({ ...exportSelected });
  }, [exportSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setExportForm({
      ...exportForm,
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
      return;
    } else if (!receiver_location) {
      Toast.fire({
        icon: "warning",
        title: "Receiver's location is required",
      });
      return;
    }
    handlerAddExport(exportForm);
  };

  return (
    <form className="flex flex-col gap-4 w-auto p-2" onSubmit={onSubmit}>
      <div className="flex flex-row gap-5 w-full overflow-auto">
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty"
          >
            Qty. Export
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
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="receiver_location"
          >
            Receiver's location
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="receiver_location"
            type="text"
            onChange={onInputChange}
            value={receiver_location}
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
            Register
          </button>
        ) : (
          <button
            type="submit"
            className="shadow text-slate-200 text-center text-sm bg-amber-500 p-2 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-800 w-32 transition"
          >
            Update
          </button>
        )}

        <button
          type="button"
          className="shadow text-slate-400 text-center text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-400 hover:text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          onClick={() => handlerCloseForm()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
