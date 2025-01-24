import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import { TableRow } from "./TableRow";
import { OrbitProgress } from "react-loading-indicators";

export const TableInventory = () => {
  const { login } = useContext(AuthContext);
  const { inventoryHook } = useContext(DashboardContext);
  const { inventory, isLoading, getInventory } = inventoryHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [ubicationFilter, setUbicationFilter] = useState("Ubication");

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [inventory, searchText, ubicationFilter]);

  const applyFilters = () => {
    let records = [...inventory];

    // Filtrar por ubication
    if (ubicationFilter !== "Ubication") {
      records = records.filter(
        (record) =>
          record.ubication?.toLowerCase() === ubicationFilter.toLowerCase()
      );
    }

    // Filtrar por texto
    if (searchText.trim() !== "") {
      const lowerCaseText = searchText.toLowerCase();
      records = records.filter((record) =>
        [
          "id_feature",
          "name",
          "part_num",
          "suplier_part_num",
          "qty_import_total",
          "qty",
          "ubication",
          "damages",
          "qty_export_total",
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

  const handleUbicationChange = (e) => {
    setUbicationFilter(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {login.user.isAdmin === 1 && (
            <button
              className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
              //    onClick={handlerOpenForminventory}
            >
              Registrar Material
            </button>
          )}
        </div>
        <div className="flex items-end gap-3">
          <select
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area_filter"
            value={ubicationFilter}
            onChange={handleUbicationChange}
          >
            <option value="Ubication">Ubicación</option>
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
                "Image",
                "ID Feature",
                "Name",
                "Part Num",
                "Suplier PN",
                "Qty. Import Total",
                "In Dashboard",
                "Quantity",
                "Ubication",
                "Damages",
                "Qty. Export Total",
                "Comments",
                login.user.isAdmin === 1 && "Actions",
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
                <td colSpan={7} className="p-5 text-center">
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
                <td colSpan={13} className="p-5 text-center">
                  No hay inventory registrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* {visibleForm && (
         <Modal title={editing ? "Editar inventory" : "Registrar inventory"}>
           <inventoryForm />
         </Modal>
       )} */}
    </>
  );
};
