import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TableRow } from "./TableRow";
import { getAllUsers } from "../services/usersService";

export const TableUsers = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setRecords(users);
        setFilteredRecords(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = ({ target: { value } }) => {
    const filtered = records.filter((record) => {
      return (
        (record.username && record.username.toLowerCase().includes(value.toLowerCase())) ||
        (record.num_employee && record.num_employee.toString().toLowerCase().includes(value.toLowerCase())) ||
        (record.name && record.name.toLowerCase().includes(value.toLowerCase())) ||
        (record.shift && record.shift.toString().toLowerCase().includes(value.toLowerCase())) ||
        (record.email && record.email.toLowerCase().includes(value.toLowerCase())) ||
        (record.isAdmin && record.isAdmin.toString().toLowerCase().includes(value.toLowerCase()))
      );
    });

    setFilteredRecords(filtered);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <NavLink
          className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
          to={"/inventory/add"}
        >
          Registrar Usuario
        </NavLink>
        <input
          className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          placeholder="Buscar..."
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto shadow rounded-lg max-h-[calc(100vh-200px)]">
        <table className="min-w-full w-full rounded-xl">
          <thead className="bg-slate-200 divide-x divide-slate-200 text-center sticky top-0">
            <tr>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200 rounded-tl-lg"
              >
                Username
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                No. Empleado
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Turno
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Email
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                isAdmin
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200 rounded-tr-lg"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filteredRecords.length > 0 ? (
              filteredRecords.map(
                (
                  { username, num_employee, name, shift, email, isAdmin },
                  index
                ) => (
                  <TableRow
                    //const
                    index={index}
                    records={filteredRecords}
                    key={index}
                    //data
                    username={username}
                    num_employee={num_employee}
                    name={name}
                    shift={shift}
                    email={email}
                    isAdmin={isAdmin}
                  />
                )
              )
            ) : (
              <tr className="bg-white transition-all duration-500 hover:bg-slate-100">
                <td
                  colSpan={7}
                  className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 text-center rounded-bl-xl rounded-br-xl"
                >
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};