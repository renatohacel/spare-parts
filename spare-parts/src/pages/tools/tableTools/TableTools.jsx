import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import { IoAddOutline } from "react-icons/io5";
import { OrbitProgress } from "react-loading-indicators";
import { TableRow } from "./TableRow";
import { Modal } from "../../../components/modal/Modal";
import { ToolForm } from "../form/ToolForm";

export const TableTools = () => {
  const { login } = useContext(AuthContext);
  const { toolsHook } = useContext(DashboardContext);
  const {
    tools,
    getTools,
    isLoading,
    handlerCloseTableTools,
    handlerOpenFormTable,
    visibleFormTable,
    editing,
  } = toolsHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getTools();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tools, searchText, statusFilter]);

  const applyFilters = () => {
    let records = [...tools];

    if (statusFilter !== "") {
      records = records.filter(
        (record) => record.status === parseInt(statusFilter)
      );
    }

    // Filtrar por texto
    if (searchText.trim() !== "") {
      const lowerCaseText = searchText.toLowerCase();
      records = records.filter((record) =>
        ["name", "status"].some((key) =>
          record[key]?.toString().toLowerCase().includes(lowerCaseText)
        )
      );
    }

    setFilteredRecords(records);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {login.user.isAdmin === 1 && (
            <button
              className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300 mr-1 mt-1"
              onClick={handlerOpenFormTable}
            >
              <IoAddOutline />
            </button>
          )}
        </div>
        <div className="flex items-end gap-3">
          <select
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="status_filter"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">Todas</option>
            <option value="1">Disponibles</option>
            <option value="0">Ocupadas</option>
          </select>
          <input
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            placeholder="Buscar..."
            type="text"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto shadow rounded-lg max-h-[calc(100vh-200px)]">
        <table className="min-w-full w-full rounded-xl">
          <thead className="bg-slate-200 divide-x divide-slate-200 text-center sticky top-0">
            <tr>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Herramienta
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Estatus
              </th>
              {login.user.isAdmin === 1 && (
                <th
                  scope="col"
                  className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
                >
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-5 text-center">
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
              <tr>
                <td colSpan={3} className="p-5 text-center">
                  No hay herramientas registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-end">
        <button
          type="button"
          className="shadow text-slate-400 text-center text-sm border border-gray-300 p-2 rounded-lg hover:bg-gray-400 hover:text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 mt-1"
          onClick={handlerCloseTableTools}
        >
          Cancelar
        </button>
      </div>
      {visibleFormTable && (
        <Modal title={editing ? "Editar Herramienta" : "Registrar Herramienta"}>
          <ToolForm />
        </Modal>
      )}
    </>
  );
};
