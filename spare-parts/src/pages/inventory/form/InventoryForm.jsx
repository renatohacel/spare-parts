import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

export const InventoryForm = () => {
  const { inventoryHook, generalHook } = useContext(DashboardContext);
  const { onKeyQty, onInputQty } = generalHook;
  const { handlerCloseFormInventory, initialFormInventory, materialSelected } =
    inventoryHook;

  const [inventoryForm, setInventoryForm] = useState(initialFormInventory);
  const {
    id,
    image,
    id_feature,
    name,
    part_num,
    suplier_part_num,
    qty_import_total,
    qty,
    ubication,
    comments,
  } = inventoryForm;

  useEffect(() => {
    setInventoryForm({ ...materialSelected });
  }, [materialSelected]);

  const onInputChange = ({ target: { value, name } }) => {
    setInventoryForm({ ...inventoryForm, [name]: value });
  };

  const onCloseForm = () => {
    handlerCloseFormInventory();
  };
  return (
    <form className="grid grid-cols-3 p-3 gap-3 justify-between">
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
        </div>
        <div className="flex flex-col p-1">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty"
          >
            Qty in stock
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
