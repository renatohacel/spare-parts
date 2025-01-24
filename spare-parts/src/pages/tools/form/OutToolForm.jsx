import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { DashboardContext } from "../../../context/DashboardContext";
import { AuthContext } from "../../../auth/context/AuthContext";
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

export const OutToolForm = () => {
  const { login } = useContext(AuthContext);
  const { outToolsHook, personalHook, generalHook, toolsHook } =
    useContext(DashboardContext);
  const {
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
    onKeyQty,
    onInputQty,
  } = generalHook;

  const {
    handlerCloseFormOutTool,
    initialOutToolForm,
    outToolSelected,
    errors,
    handlerAddOutTool,
  } = outToolsHook;
  const { getPersonal, personal } = personalHook;
  const { getTools, tools } = toolsHook;

  const [outToolForm, setOutToolForm] = useState(initialOutToolForm);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  const { id, num_employee_receiver, area, qty } = outToolForm;

  useEffect(() => {
    getPersonal();
    getTools();
  }, []);

  useEffect(() => {
    setOutToolForm({ ...outToolSelected });
    setSelectedReceiver(outToolSelected.selectedReceiver);
    setSelectedTool(outToolSelected.selectedTool);
  }, [outToolSelected]);

  // Actualizar el estado del formulario de salida de herramientas
  const onInputChange = ({ target: { value, name } }) => {
    setOutToolForm({ ...outToolForm, [name]: value });
  };

  // Crear opciones para React-Select a partir de los datos de "tools"
  const toolsOptions = tools
    .filter((tool) => tool.status === 1)
    .map((tool) => ({
      value: tool.name,
      label: tool.name,
    }));

  const onToolChange = (selectedOption) => {
    setSelectedTool(selectedOption);
    setOutToolForm({
      ...outToolForm,
      tool: selectedOption?.value || "",
    });
  };

  // Crear opciones para React-Select a partir de los datos de "personal"
  const receiverOptions = personal.map((employee) => ({
    value: employee.name,
    label: employee.name,
    num_employee: employee.num_employee,
  }));

  // Manejar el cambio de receptor
  const onReceiverChange = (selectedOption) => {
    setSelectedReceiver(selectedOption);
    setOutToolForm({
      ...outToolForm,
      receiver: selectedOption?.value || "",
      num_employee_receiver: selectedOption?.num_employee || "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedReceiver ||
      !num_employee_receiver ||
      !selectedTool ||
      !area ||
      !qty ||
      qty <= 0
    ) {
      Toast.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios",
      });
      return;
    }

    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = date.toTimeString().split(" ")[0]; // HH:mm:ss

    //Create
    if (id === 0) {
      const formData = {
        ...outToolForm,
        //auto
        responsible: login.user.name,
        num_employee_responsible: login.user.num_employee,
        date_out: formattedDate,
        time_out: formattedTime,

        //form inputs
        receiver: selectedReceiver?.value,
        num_employee_receiver: parseInt(selectedReceiver?.num_employee, 10),
        tool: selectedTool?.value,
        area,
        qty: parseInt(qty, 10),

        //for edit
        is_returned: 0,
        date_return: null,
        time_return: null,
        comments: null,
      };

      handlerAddOutTool(formData);
    }
    //EDIT
    else {
      const formData = {
        //auto
        ...outToolForm,
        responsible: login.user.name,
        num_employee_responsible: login.user.num_employee,

        //form inputs
        receiver: selectedReceiver?.value,
        num_employee_receiver: parseInt(selectedReceiver?.num_employee, 10),
        tool: selectedTool?.value,
        area,
        qty: parseInt(qty, 10),

        //for check return
        is_returned: 0,
        date_return: null,
        time_return: null,
        comments: null,
      };

      handlerAddOutTool(formData);
    }
  };

  const onCloseForm = () => {
    handlerCloseFormOutTool();
  };

  return (
    <form className="grid grid-cols-2 gap-4 w-auto p-2" onSubmit={onSubmit}>
      {/* Campo de receptor con React-Select */}
      <div className="flex flex-col">
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="receiver">
            Receptor
          </label>
          <Select
            options={receiverOptions}
            value={selectedReceiver}
            onKeyDown={onKeyName}
            onInput={onInputName}
            onChange={onReceiverChange}
            placeholder={selectedReceiver || "Seleccione un receptor"}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.receiver}
        </p>
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="tool">
            Herramienta
          </label>
          <Select
            options={toolsOptions}
            value={selectedTool}
            onChange={onToolChange}
            placeholder="Seleccione una herramienta"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.tool}
        </p>
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="qty">
            Cantidad
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="qty"
            type="number"
            onKeyDown={onKeyQty}
            onInput={onInputQty}
            value={qty}
            onChange={onInputChange}
          />
        </div>
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.qty}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="num_employee_receiver"
          >
            No. Empleado
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="num_employee_receiver"
            type="text"
            onKeyDown={onKeyNumEm}
            onInput={onInputNumEm}
            value={num_employee_receiver}
            onChange={onInputChange}
          />
        </div>
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.num_employee_receiver}
        </p>
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="area">
            Área
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area"
            type="text"
            value={area}
            onChange={onInputChange}
          />
        </div>
        <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
          {errors?.area}
        </p>
      </div>

      <div className="flex gap-3 w-full overflow-auto mt-4 p-1 col-span-2">
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
