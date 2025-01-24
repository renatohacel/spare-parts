import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";

export const TableInventory = () => {
  const { login } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {login.user.isAdmin === 1 && (
            <button
              className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
              //    onClick={handlerOpenFormPersonal}
            >
              Registrar Material
            </button>
          )}
        </div>
        <div className="flex items-end gap-3">
          <select
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area_filter"
            //  value={areaFilter}
            //  onChange={handleAreaChange}
          >
            <option value="Area">Ubicación</option>
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
            //  value={searchText}
            //  onChange={handleSearchChange}
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
            {/* {isLoading ? (
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
                 <td colSpan={7} className="p-5 text-center">
                   No hay personal registrado
                 </td>
               </tr>
             )} */}
          </tbody>
        </table>
      </div>
      {/* {visibleForm && (
         <Modal title={editing ? "Editar Personal" : "Registrar personal"}>
           <PersonalForm />
         </Modal>
       )} */}
    </>
  );
};
