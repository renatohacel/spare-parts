import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
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

export const InventoryForm = () => {
  const { inventoryHook, generalHook } = useContext(DashboardContext);
  const { onKeyQty, onInputQty } = generalHook;
  const {
    handlerCloseFormInventory,
    initialFormInventory,
    materialSelected,
    handlerAddMaterial,
    errors,
  } = inventoryHook;

  const [inventoryForm, setInventoryForm] = useState(initialFormInventory);
  const {
    id,
    id_feature,
    name,
    part_num,
    suplier_part_num,
    qty_import_total,
    ubication,
    comments,

    //edit
    qty,
    is_dashboard,
    damages,
    qty_export_total,
    image,
  } = inventoryForm;

  const [optionalField, setOptionalField] = useState(false);

  useEffect(() => {
    setInventoryForm({ ...materialSelected });
  }, [materialSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setInventoryForm({ ...inventoryForm, [name]: value });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/webp", "image/jpeg", "image/png"];

      if (allowedTypes.includes(file.type)) {
        setInventoryForm({ ...inventoryForm, image: file });
      } else {
        Toast.fire({
          icon: "warning",
          title: "Por favor, sube una imagen en formato .webp, .jpg, .png, etc",
        });
        e.target.value = "";
      }
    }
  };

  const onSubit = (e) => {
    e.preventDefault();
    if (id === 0) {
      if (
        !id_feature ||
        !name ||
        !part_num ||
        !qty_import_total ||
        !ubication
      ) {
        Toast.fire({
          icon: "warning",
          title: "Todos los campos son obligatorios",
        });
        setOptionalField(true);
        return;
      }
    }

    const formData = new FormData();

    formData.append("id", id);
    formData.append("id_feature", id_feature);
    formData.append("name", name);
    formData.append("part_num", part_num);
    formData.append("suplier_part_num", suplier_part_num || "");
    formData.append("qty_import_total", qty_import_total);
    if (id === 0) {
      formData.append("qty", qty_import_total);
    }
    formData.append("ubication", ubication);
    formData.append("comments", comments || "");
    if (inventoryForm.image) {
      formData.append("image", inventoryForm.image);
    }
    if (id !== 0) {
      formData.append("qty", qty);
      formData.append("qty_export_total", qty_export_total);
      formData.append("damages", damages);
      formData.append("is_dashboard", is_dashboard);
    }
    handlerAddMaterial(formData);
  };

  const onCloseForm = () => {
    handlerCloseFormInventory();
  };
  return (
    <form
      className="grid grid-cols-3 p-3 gap-3 justify-between"
      onSubmit={onSubit}
    >
      {/* COL 1 */}
      <div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="image"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={onImageChange}
            className=" bg-white border border-slate-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 py-1 px-2 disabled:pointer-events-none file:bg-slate-200 file:rounded-md file:border-0 file:mr-2 file:hover:cursor-pointer hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="part_num"
          >
            Part Number
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="part_num"
            type="text"
            onChange={onInputChange}
            value={part_num}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.part_num}
          </p>
        </div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty_import_total"
          >
            Qty. Import
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="qty_import_total"
            type="number"
            onKeyDown={onKeyQty}
            onInput={onInputQty}
            onChange={onInputChange}
            value={qty_import_total}
          />
        </div>
        {id !== 0 && (
          <div className="flex flex-col p-1">
            <label
              className="text-slate-400 font-medium mb-1 whitespace-nowrap"
              htmlFor="qty_export_total"
            >
              Qty. Export
            </label>
            <input
              className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
              name="qty_export_total"
              type="number"
              onKeyDown={onKeyQty}
              onInput={onInputQty}
              onChange={onInputChange}
              value={qty_export_total}
            />
          </div>
        )}
      </div>

      {/* COL 2 */}
      <div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="id_feature"
          >
            ID Feature
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="id_feature"
            type="text"
            onChange={onInputChange}
            value={id_feature}
          />
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.id_feature}
          </p>
        </div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="suplier_part_num"
          >
            Suplier Part Number
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="suplier_part_num"
            type="text"
            onChange={onInputChange}
            value={suplier_part_num}
          />
          <p className="text-slate-400 italic" style={{ fontSize: "0.9rem" }}>
            {optionalField && "This field is optional"}
          </p>
          <p className="text-red-500 italic" style={{ fontSize: "0.9rem" }}>
            {errors?.suplier_part_num}
          </p>
        </div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="comments"
          >
            Comments
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="comments"
            type="text"
            onChange={onInputChange}
            value={comments}
          />
          <p className="text-slate-400 italic" style={{ fontSize: "0.9rem" }}>
            {optionalField && "This field is optional"}
          </p>
        </div>
        {id !== 0 && (
          <div className="flex flex-col p-1">
            <label
              className="text-slate-400 font-medium mb-1 whitespace-nowrap"
              htmlFor="damages"
            >
              Damages
            </label>
            <input
              className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
              name="damages"
              type="number"
              onKeyDown={onKeyQty}
              onInput={onInputQty}
              onChange={onInputChange}
              value={damages}
            />
          </div>
        )}
      </div>
      {/* COL 3 */}
      <div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="name"
          >
            Name
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
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="ubication"
          >
            Ubication
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="ubication"
            type="text"
            onChange={onInputChange}
            value={ubication}
          />
        </div>
        {id !== 0 && (
          <>
            <div className="flex flex-col p-1">
              <label
                className="text-slate-400 font-medium mb-1 whitespace-nowrap"
                htmlFor="qty"
              >
                Quantity
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
                htmlFor="is_dashboard"
              >
                Register in dashboard
              </label>
              <select
                name="is_dashboard"
                value={is_dashboard}
                onChange={onInputChange}
                className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          </>
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
          onClick={onCloseForm}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
