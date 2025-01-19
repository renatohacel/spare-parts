import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DashboardContext } from "../../../context/DashboardContext";
import { AuthContext } from "../../../auth/context/AuthContext";

export const TableRow = ({
  index,
  records,
  id,
  name,
  num_employee,
  role,
  shift,
  area,
  manager,
}) => {
  const { login } = useContext(AuthContext);
  const { personalHook } = useContext(DashboardContext);
  const { handlerEmployeeSelected, handlerDeleteEmployee } = personalHook;
  return (
    <tr className="bg-white transition-all duration-500 hover:bg-slate-100 text-center">
      <td
        className={`p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
          index === records.length - 1 && "rounded-bl-xl"
        }`}
      >
        {name}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {num_employee}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {role}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {shift}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {area}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {manager}
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
                handlerEmployeeSelected({
                  id: id,
                  name: name,
                  num_employee: num_employee || "",
                  role: role || "",
                  shift: shift || "",
                  area: area || "",
                  manager: manager || "",
                });
              }}
            >
              <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={() => handlerDeleteEmployee(id)}
            >
              <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};
