import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { DashboardContext } from "../../../context/DashboardContext";
import { IoCloseSharp } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";

export const TableRow = ({ index, records, id, name, status }) => {
  const { login } = useContext(AuthContext);
  const { toolsHook } = useContext(DashboardContext);
  const { handlerToolSelected, handlerDeleteTool } = toolsHook;

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
        <div className="flex flex-col items-center">
          {status === 1 ? (
            <div className="rounded-full bg-green-400 p-2 text-xs bg-opacity-50 text-green-600">
              <FaCheck />
            </div>
          ) : (
            <div className="rounded-full bg-orange-400 p-2 text-xs bg-opacity-50 text-orange-600">
              <CgSandClock />
            </div>
          )}
        </div>
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
                handlerToolSelected({ id, name });
              }}
            >
              <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={() => handlerDeleteTool(id)}
            >
              <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};
