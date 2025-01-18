import { useState, useEffect, useContext } from "react";
import { TableRow } from "./TableRow";
import { Modal } from "../../../components/modal/Modal";
import { PersonalForm } from "../form/PersonalForm";
import { DashboardContext } from "../../../../context/DashboardContext";
import { OrbitProgress } from "react-loading-indicators";

export const TablePersonal = () => {
  const {
    visibleForm,
    handlerOpenFormPersonal,
    getPersonal,
    personal,
    isLoading,
  } = useContext(DashboardContext);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [areaFilter, setAreaFilter] = useState("Area");

  useEffect(() => {
    getPersonal();
  }, []);

  useEffect(() => {
    setFilteredRecords([...personal]);
  }, [personal]);

  const handleChange = ({ target: { value } }) => {
    if (value === "Integración") setAreaFilter("Integración");
    if (value === "MFG") setAreaFilter("MFG");
    if (value === "Area") {
      setAreaFilter("Area");
      return setFilteredRecords(personal);
    }

    const filtered = personal.filter((record) => {
      return (
        (record.name &&
          record.name.toLowerCase().includes(value.toLowerCase())) ||
        (record.num_employee &&
          record.num_employee
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())) ||
        (record.role &&
          record.role.toLowerCase().includes(value.toLowerCase())) ||
        (record.shift &&
          record.shift
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())) ||
        (record.area &&
          record.area.toLowerCase().includes(value.toLowerCase())) ||
        (record.manager &&
          record.manager.toLowerCase().includes(value.toLowerCase()))
      );
    });

    setFilteredRecords(filtered);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <button
          className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
          onClick={handlerOpenFormPersonal}
        >
          Registrar Personal
        </button>
        <div className="flex items-end gap-3">
          <select
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="status"
            value={areaFilter}
            onChange={handleChange}
          >
            <option value="Area">Area</option>
            <option value="Integración">Integración</option>
            <option value="MFG">MFG</option>
          </select>

          <input
            className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            placeholder="Buscar..."
            type="text"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto shadow rounded-lg max-h-[calc(100vh-200px)]">
        <table className="min-w-full w-full rounded-xl">
          <thead className="bg-slate-200 divide-x divide-slate-200 text-center sticky top-0">
            <tr>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200 rounded-tl-lg"
              >
                Nombre
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
                Puesto
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
                Area
              </th>
              <th
                scope="col"
                className="p-2 text-sm leading-6 font-semibold text-slate-600 capitalize bg-slate-300 bg-opacity-45 hover:bg-slate-200"
              >
                Manager
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
            {isLoading && (
              <tr className="bg-white transition-all duration-500 hover:bg-slate-100">
                <td
                  colSpan={7}
                  className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 text-center rounded-bl-xl rounded-br-xl"
                >
                  <OrbitProgress
                    color="#32cd32"
                    size="large"
                    text=""
                    textColor=""
                  />
                </td>
              </tr>
            )}
            {filteredRecords.length > 0
              ? filteredRecords.map(
                  (
                    { id, name, num_employee, role, shift, area, manager },
                    index
                  ) => (
                    <TableRow
                      //const
                      index={index}
                      records={filteredRecords}
                      key={index}
                      //data
                      id={id}
                      name={name}
                      num_employee={num_employee}
                      role={role}
                      shift={shift}
                      area={area}
                      manager={manager}
                    />
                  )
                )
              : !isLoading && (
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
      {visibleForm && (
        <>
          <Modal title={"Registrar Personal"}>
            <PersonalForm />
          </Modal>
        </>
      )}
    </>
  );
};
