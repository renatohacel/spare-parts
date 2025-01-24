import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext";
import { IoIosEye } from "react-icons/io";

export const TableRow = ({
  index,
  records,
  id,
  id_feature,
  image,
  name,
  part_num,
  suplier_part_num,
  qty_import_total,
  is_dashboard,
  qty,
  ubication,
  damages,
  qty_export_total,
  comments,
}) => {
  const { login } = useContext(AuthContext);
  return (
    <tr className="bg-white transition-all duration-500 hover:bg-slate-100 text-center">
      <td
        className={`p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
          index === records.length - 1 && "rounded-bl-xl"
        }`}
      >
        {image}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {id_feature}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {name}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {part_num}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {suplier_part_num}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        <div className="flex gap-2">
          {qty_import_total}
          <button>
            <IoIosEye className="mt-[1px] text-blue-600 hover:text-blue-400 transition-all duration-300" />
          </button>
        </div>
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {is_dashboard}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {qty}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {ubication}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {damages}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        <div className="flex gap-2">
          {qty_export_total}
          <button>
            <IoIosEye className="mt-[1px] text-blue-600 hover:text-blue-400 transition-all duration-300" />
          </button>
        </div>
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
              //   onClick={() => {
              //     handlerEmployeeSelected({
              //       id: id,
              //       name: name,
              //       num_employee: num_employee || "",
              //       role: role || "",
              //       shift: shift || "",
              //       area: area || "",
              //       manager: manager || "",
              //     });
              //   }}
            >
              <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              //   onClick={() => handlerDeleteEmployee(id)}
            >
              <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};
