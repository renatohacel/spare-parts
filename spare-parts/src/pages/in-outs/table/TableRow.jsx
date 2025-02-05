import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import { FaEdit, FaTrash } from "react-icons/fa";

export const TableRow = ({
  index,
  records,
  id,
  responsible,
  num_employee_responsible,
  status,
  receiver,
  num_employee_receiver,
  shift,
  date,
  time,
  area,
  tester,
  reason_scrap,
  qty_scrap,
  sn_scrap,
  material,
  qty_material,
  sn_material,
  comments,
}) => {
  const { login } = useContext(AuthContext);
  const { inOutsHook, inventoryHook } = useContext(DashboardContext);
  const { handlerInOutSelected, handlerDeleteInOut } = inOutsHook;
  const { inventory, getInventory } = inventoryHook;
  const [stock, setStock] = useState(0);

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    const foundMaterial = inventory.find((item) => item.name === material);
    if (foundMaterial) {
      setStock(foundMaterial.qty);
    } else {
      setStock(0);
    }
  }, [inventory, material]);

  return (
    <tr className="bg-white transition-all duration-500 hover:bg-slate-100 text-center">
      <td
        className={`p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
          index === records.length - 1 && "rounded-bl-xl"
        }`}
      >
        {responsible}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {num_employee_responsible}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {status}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {receiver}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {num_employee_receiver}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {shift}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {date}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {time}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {area}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {tester}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {reason_scrap}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {qty_scrap}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {sn_scrap}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {material}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {qty_material}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {sn_material}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {comments}
      </td>
      {login.user.isAdmin === 1 && (
        <td
          className={`p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
            index === records.length - 1 && "rounded-br-xl"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={() => {
                handlerInOutSelected({
                  id,
                  responsible,
                  num_employee_responsible,
                  status,
                  receiver,
                  num_employee_receiver,
                  shift,
                  date,
                  time,
                  area,
                  tester,
                  reason_scrap,
                  qty_scrap,
                  sn_scrap: sn_scrap || "",
                  material,
                  qty_material,
                  sn_material: sn_material || "",
                  comments: comments || "",
                  stock:
                    status === "Salida"
                      ? stock + qty_material
                      : stock - qty_material,
                });
              }}
            >
              <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={() => handlerDeleteInOut(id)}
            >
              <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};
