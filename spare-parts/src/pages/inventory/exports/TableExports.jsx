import { useContext, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { TableRow } from "./TableRow";
import { OrbitProgress } from "react-loading-indicators";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import { Modal } from "../../../components/modal/Modal";
import { ExportsForm } from "./form/ExportsForm";

export const TableExports = () => {
  const { login } = useContext(AuthContext);
  const { exportsHook } = useContext(DashboardContext);
  const {
    exports,
    partNumSelected,
    getExportsByName,
    handlerCloseTableExports,
    isLoading,
    editing,
    visibleForm,
    handlerOpenForm,
  } = exportsHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getExportsByName(partNumSelected);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [exports, searchText]);

  const applyFilters = () => {
    let records = [...exports];

    // Filtrar por texto
    if (searchText.trim() !== "") {
      const lowerCaseText = searchText.toLowerCase();
      records = records.filter((record) =>
        ["part_num", "date", "qty"].some((key) =>
          record[key]?.toString().toLowerCase().includes(lowerCaseText)
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
        <div>
          {login.user.isAdmin === 1 && (
            <button
              className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300 mr-1 mt-1"
              onClick={handlerOpenForm}
            >
              <IoAddOutline />
            </button>
          )}
        </div>
        <div className="flex items-end gap-3">
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
                Part Number
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Receiver's location
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Date
              </th>
              {login.user.isAdmin === 1 && (
                <th
                  scope="col"
                  className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-5 text-center">
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
                <td colSpan={5} className="p-1 text-center">
                  Not exports registered
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
          onClick={handlerCloseTableExports}
        >
          Cancel
        </button>
      </div>
      {visibleForm && (
        <Modal title={editing ? "Update Export" : "Register Export"}>
          <ExportsForm />
        </Modal>
      )}
    </>
  );
};
