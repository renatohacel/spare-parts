import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import Swal from "sweetalert2";
import Select from "react-select";
import { areas } from "../../../data/autocompletes";

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

export const InOutsForm = () => {
  const { login } = useContext(AuthContext);
  const { personalHook, generalHook, inOutsHook, inventoryHook } =
    useContext(DashboardContext);
  const {
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
    onKeyQty,
    onInputQty,
  } = generalHook;

  const { getPersonal, personal } = personalHook;
  const { inventory, getInventory } = inventoryHook;

  const { errors, handlerCloseFormInOut, initialFormInOut, inOutSelected } =
    inOutsHook;

  const [inOutForm, setInOutForm] = useState(initialFormInOut);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const {
    id,
    num_employee_receiver,
    tester,
    reason_scrap,
    qty_scrap,
    sn_scrap,
    qty_material,
    sn_material,
    comments,
  } = inOutForm;

  useEffect(() => {
    getPersonal();
    getInventory();
  }, []);

  useEffect(() => {
    setInOutForm({ ...inOutSelected });
    setSelectedReceiver(inOutSelected.selectedReceiver);
    setSelectedArea(inOutSelected.selectedArea);
    setSelectedMaterial(inOutSelected.selectedMaterial);
  }, [inOutSelected]);

  // Actualizar el estado del formulario de salida de herramientas
  const onInputChange = ({ target: { value, name } }) => {
    setInOutForm({ ...inOutForm, [name]: value });
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
    setInOutForm({
      ...inOutForm,
      receiver: selectedOption?.value || "",
      num_employee_receiver: selectedOption?.num_employee || "",
    });
  };

  const areaOptions = areas.map((area) => ({
    value: area,
    label: area,
  }));
  const onAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
    setInOutForm({
      ...inOutForm,
      area: selectedOption?.value || "",
    });
  };

  const materialOptions = inventory
    .filter((material) => material.qty > 0)
    .map((material) => ({
      value: material.name,
      label: material.name,
    }));

  const onMaterialChange = (selectedOption) => {
    setSelectedMaterial(selectedOption);
    setInOutForm({
      ...inOutForm,
      material: selectedOption?.value || "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="grid grid-cols-4 gap-4 w-auto p-2" onSubmit={onSubmit}>
      {/* Campo de receptor con React-Select */}
      <div className="col-span-1">
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="receiver">
            Receiver
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
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="num_employee_receiver"
          >
            No. Employee
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
          <label className="text-slate-400 font-medium mb-1" htmlFor="comments">
            Comments
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="comments"
            type="text"
            value={comments}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="status"
            type="text"
            onChange={onInputChange}
          >
            <option value={"Ingreso"}>Ingreso</option>
            <option value={"Salida"}>Salida</option>
          </select>
        </div>
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="area">
            Area
          </label>
          <Select
            options={areaOptions}
            value={selectedArea}
            onChange={onAreaChange}
            placeholder={selectedArea || "Seleccione un receptor"}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="tester">
            Tester
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="tester"
            type="text"
            value={tester}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="reason_scrap"
          >
            SCRAP Reason
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="reason_scrap"
            type="text"
            value={reason_scrap}
            onChange={onInputChange}
          />
        </div>

        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="qty_scrap"
          >
            Qty. SCRAP
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="qty_scrap"
            type="number"
            onKeyDown={onKeyQty}
            onInput={onInputQty}
            value={qty_scrap}
            onChange={onInputChange}
          />
        </div>

        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="sn_scrap">
            SN. SCRAP
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="sn_scrap"
            type="text"
            value={sn_scrap}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col p-1">
          <label className="text-slate-400 font-medium mb-1" htmlFor="material">
            Material
          </label>
          <Select
            options={materialOptions}
            value={selectedMaterial}
            onKeyDown={onKeyName}
            onInput={onInputName}
            onChange={onMaterialChange}
            placeholder={selectedMaterial || "Seleccione un material"}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="qty_material"
          >
            Qty. Material
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="qty_material"
            type="number"
            onKeyDown={onKeyQty}
            onInput={onInputQty}
            value={qty_material}
            onChange={onInputChange}
          />
        </div>

        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="sn_material"
          >
            SN. Material
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="sn_scrap"
            type="text"
            value={sn_material}
            onChange={onInputChange}
          />
        </div>
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
          onClick={() => handlerCloseFormInOut()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
