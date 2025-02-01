import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { DashboardContext } from "../../../context/DashboardContext";
import { CgSandClock } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import { components } from "react-select";
export const TableRow = ({
  index,
  records,
  id,
  responsible,
  num_employee_responsible,
  receiver,
  num_employee_receiver,
  area,
  tool,
  date_out,
  time_out,
  qty,
  is_returned,
  date_return,
  time_return,
  comments,
}) => {
  const { login } = useContext(AuthContext);
  const { toolsHook, outToolsHook } = useContext(DashboardContext);
  const {
    handlerOutToolSelected,
    handlerDeleteOutTool,
    handlerCommentsSelected,
  } = outToolsHook;

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
        {receiver}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {num_employee_receiver}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {tool}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {date_out}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {time_out}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {area}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {qty}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        <div className="flex flex-col items-center">
          {is_returned === 1 ? (
            <>
              <div
                id="return"
                className="rounded-full bg-green-400 p-2 text-xs bg-opacity-50 text-green-600"
                data-tooltip-place="top"
              >
                <FaCheck />
              </div>
              <Tooltip anchorSelect="#return">Entregada</Tooltip>
            </>
          ) : (
            <>
              {login.user.isAdmin === 1 ? (
                <>
                  <button
                    id="no-return"
                    data-tooltip-place="top"
                    className="rounded-full transition-all duration-300 bg-orange-400 p-2 text-xs bg-opacity-50 text-orange-600 hover:bg-orange-500 hover:bg-opacity-70 hover:text-orange-300"
                    onClick={() => {
                      handlerCommentsSelected({
                        id,
                        comments: comments || "",
                        tool,
                      });
                    }}
                  >
                    <CgSandClock />
                  </button>
                  <Tooltip anchorSelect="#no-return" clickable>
                    Marcar devolución
                  </Tooltip>
                </>
              ) : (
                <>
                  <div
                    id="no-return"
                    data-tooltip-place="top"
                    className="rounded-full bg-orange-400 p-2 text-xs bg-opacity-50 text-orange-600"
                  >
                    <CgSandClock />
                  </div>
                  <Tooltip anchorSelect="#no-return">Ocupada</Tooltip>
                </>
              )}
            </>
          )}
        </div>
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {date_return}
      </td>
      <td className="p-1 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {time_return}
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
                handlerOutToolSelected({
                  id,
                  responsible,
                  num_employee_responsible,
                  receiver,
                  num_employee_receiver,
                  area,
                  tool,
                  date_out,
                  time_out,
                  qty,
                  is_returned,
                  date_return,
                  time_return,
                  comments,
                  selectedReceiver: {
                    value: receiver,
                    label: receiver,
                    num_employee: num_employee_receiver,
                  },
                  selectedTool: { value: tool, label: tool },
                });
              }}
            >
              <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
            </button>
            <button
              className="p-2 rounded-full group transition-all duration-500 flex items-center"
              onClick={() => handlerDeleteOutTool(id, tool)}
            >
              <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};
