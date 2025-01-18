import { FaEdit, FaTrash } from "react-icons/fa";

export const TableRow = ({
  index,
  records,
  username,
  num_employee,
  name,
  shift,
  email,
  isAdmin,
}) => {
  return (
    <tr className="bg-white transition-all duration-500 hover:bg-slate-100 text-center">
      <td
        className={`p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
          index === records.length - 1 && "rounded-bl-xl"
        }`}
      >
        {username}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {num_employee}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {name}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {shift}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {email}
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900">
        {isAdmin}
      </td>
      <td
        className={`p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 ${
          index === records.length - 1 && "rounded-br-xl"
        }`}
      >
        <div className="flex items-center justify-center gap-1">
          <button className="p-2 rounded-full group transition-all duration-500 flex items-center">
            <FaEdit className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
          </button>
          <button className="p-2 rounded-full group transition-all duration-500 flex items-center">
            <FaTrash className="text-red-500 hover:text-red-400 transition-all duration-300" />
          </button>
        </div>
      </td>
    </tr>
  );
};
