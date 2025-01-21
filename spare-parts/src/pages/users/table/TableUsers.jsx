import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { TableRow } from "./TableRow";
import { DashboardContext } from "../../../context/DashboardContext";
import { OrbitProgress } from "react-loading-indicators";
import { Modal } from "../../../components/modal/Modal";
import { UsersForm } from "../form/UsersForm";

export const TableUsers = () => {
  const { usersHook } = useContext(DashboardContext);
  const {
    users,
    getUsers,
    isLoading,
    editing,
    visibleForm,
    handlerOpenFormUsers,
  } = usersHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredRecords(users);
  }, [users]);

  useEffect(() => {
    applyFilters();
  }, [users, searchText]);

  const applyFilters = () => {
    let records = [...users];

    // Filtrar por texto
    if (searchText.trim() !== "") {
      const lowerCaseText = searchText.toLowerCase();
      records = records.filter((record) =>
        ["username", "num_employee", "name", "shift", "email", "isAdmin"].some(
          (key) => record[key]?.toString().toLowerCase().includes(lowerCaseText)
        )
      );
    }

    setFilteredRecords(records);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <button
          className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
          onClick={handlerOpenFormUsers}
        >
          Registrar Usuario
        </button>
        <input
          className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          placeholder="Buscar..."
          type="text"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto shadow rounded-lg max-h-[calc(100vh-200px)]">
        <table className="min-w-full w-full rounded-xl">
          <thead className="bg-slate-200 divide-x divide-slate-200 text-center sticky top-0">
            <tr>
              {/*Column Headers */}
              {[
                "Username",
                "No. Empleado",
                "Nombre",
                "Turno",
                "Tipo de usuario",
                "Acciones",
              ].map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  <OrbitProgress
                    color="#32cd32"
                    size="large"
                    text=""
                    textColor=""
                  />
                </td>
              </tr>
            ) : filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => {
                return (
                  <TableRow
                    key={record.id}
                    index={index}
                    records={filteredRecords}
                    {...record}
                  />
                );
              })
            ) : (
              <tr className="bg-white transition-all duration-500 hover:bg-slate-100">
                <td
                  colSpan={6}
                  className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 text-center rounded-bl-xl rounded-br-xl"
                >
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {visibleForm && (
        <Modal title={editing ? "Editar Usuario" : "Registrar Usuario"}>
          <UsersForm />
        </Modal>
      )}
    </>
  );
};
