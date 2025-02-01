import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { DashboardContext } from "../../../context/DashboardContext";
import { TableRow } from "./TableRow";
import { OrbitProgress } from "react-loading-indicators";
import { Modal } from "../../../components/modal/Modal";
import { InventoryForm } from "../form/InventoryForm";
import { ImageModal } from "../../../components/modal/ImageModal";
import { TableImports } from "../imports/TableImports";
import { TableExports } from "../exports/TableExports";

export const TableInventory = () => {
  const { login } = useContext(AuthContext);
  const { inventoryHook, importsHook, exportsHook } =
    useContext(DashboardContext);
  const {
    inventory,
    isLoading,
    getInventory,
    handlerOpenFormInventory,
    visibleForm,
    editing,
    imageOpen,
    imageSelected,
  } = inventoryHook;

  const {
    visibleImports,
    partNumSelected: partNumSelectedImport,
    sendImport,
  } = importsHook;
  const {
    visibleExports,
    partNumSelected: partNumSelectedExport,
    sendExport,
  } = exportsHook;

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getInventory();
  }, [sendImport, sendExport]);

  useEffect(() => {
    applyFilters();
  }, [inventory, searchText]);

  const applyFilters = () => {
    let records = [...inventory];

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
          "location",
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

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {login.user.isAdmin === 1 && (
            <button
              className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
              onClick={handlerOpenFormInventory}
            >
              Register Material
            </button>
          )}
        </div>
        <div className="flex items-end gap-3">
          <input
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            placeholder="Search..."
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
                "Quantity in stock",
                "Location",
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
                <td colSpan={13} className="p-5 text-center">
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
      {visibleForm && (
        <Modal title={editing ? "Edit Material" : "Register Material"}>
          <InventoryForm />
        </Modal>
      )}

      {imageOpen && <ImageModal image={imageSelected} />}

      {visibleImports && (
        <Modal
          title={
            <>
              Imports{"   "}
              <span className="text-teal-500">{partNumSelectedImport}</span>
            </>
          }
        >
          <TableImports />
        </Modal>
      )}

      {visibleExports && (
        <Modal
          title={
            <>
              Exports{" "}
              <span className="text-teal-500">{partNumSelectedExport}</span>
            </>
          }
        >
          <TableExports />
        </Modal>
      )}
    </>
  );
};
