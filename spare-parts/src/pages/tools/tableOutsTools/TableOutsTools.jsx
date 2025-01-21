import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Modal } from "../../../components/modal/Modal";
import { OutToolForm } from "../form/OutToolForm";
import { DashboardContext } from "../../../context/DashboardContext";
import { OrbitProgress } from "react-loading-indicators";
import { TableRow } from "./TableRow";

export const TableOutsTools = () => {
  const { login } = useContext(AuthContext);
  const { outToolsHook } = useContext(DashboardContext);
  const { visibleForm, outTools, getOutTools, isLoading } = outToolsHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [areaFilter, setAreaFilter] = useState("Area");

  useEffect(() => {
    getOutTools();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [outTools, searchText, areaFilter]);

  const applyFilters = () => {
    let records = [...outTools];

    // Filtrar por área
    if (areaFilter !== "Area") {
      records = records.filter(
        (record) => record.area?.toLowerCase() === areaFilter.toLowerCase()
      );
    }

    // Filtrar por texto
    if (searchText.trim() !== "") {
      const lowerCaseText = searchText.toLowerCase();
      records = records.filter((record) =>
        [
          "responsible",
          "num_employee_responsible",
          "receiver",
          "num_employee_receiver",
          "area",
          "tool",
          "date_out",
          "time_out",
          "qty",
          "is_returned",
          "date_return",
          "time_return",
          "comments",
        ].some((key) =>
          record[key]?.toString().toLowerCase().includes(lowerCaseText)
        )
      );
    }

    setFilteredRecords(records);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAreaChange = (e) => {
    setAreaFilter(e.target.value);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="flex items-end gap-3">
          <select
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area_filter"
            value={areaFilter}
            onChange={handleAreaChange}
          >
            <option value="Area">Area</option>
            <option value="Integración">Integración</option>
            <option value="MFG">MFG</option>
            <option value="Procesos">Procesos</option>
            <option value="QA">QA</option>
            <option value="l1 - l3">L1 - L3</option>
            <option value="Desensamble">Desensamble</option>
            <option value="FA">FA</option>
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
              {/* Column Headers */}
              {[
                "Responsable",
                "No. Empleado",
                "Receptor",
                "No. Empleado",
                "Herramienta",
                "Fecha de salida",
                "Hora de salida",
                "Area",
                "Cantidad",
                "Devolución",
                "Fecha de regreso",
                "Hora de regreso",
                "Comentarios",
                login.user.isAdmin === 1 && "Acciones",
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
                <td colSpan={14} className="p-5 text-center">
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
                <td colSpan={14} className="p-5 text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {visibleForm && (
        <Modal title={"Registrar Préstamo"}>
          <OutToolForm />
        </Modal>
      )}
    </>
  );
};
