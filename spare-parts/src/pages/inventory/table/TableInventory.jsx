import { useState } from "react";
import { columnsInventory, dataInventory } from "../../../data/data";
import { TableRow } from "./TableRow";
import { NavLink } from "react-router-dom";

export const TableInventory = () => {
  const [records, setRecords] = useState(dataInventory);

  const handleChange = ({ target: { value } }) => {
    const filteredRecords = dataInventory.filter((record) => {
      return (
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.part_num.toLowerCase().includes(value.toLowerCase()) ||
        record.quantity
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        record.ubication.toLowerCase().includes(value.toLowerCase()) ||
        record.damages.toString().toLowerCase().includes(value.toLowerCase()) ||
        record.porcent.toString().toLowerCase().includes(value.toLowerCase())
      );
    });

    setRecords(filteredRecords);
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <NavLink
          className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
          to={"/inventory/add"}
        >
          Registrar Artículo
        </NavLink>
        <input
          className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
          placeholder="Buscar..."
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full w-full rounded-xl">
          <thead>
            <tr className="bg-slate-300 bg-opacity-45 divide-x divide-slate-200 text-center">
              {columnsInventory.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`p-2 text-sm leading-6 font-semibold text-slate-600 capitalize hover:bg-slate-200 ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${
                    index === columnsInventory.length - 1 ? "rounded-tr-lg" : ""
                  }`}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {records.length > 0 ? (
              records.map(
                (
                  {
                    image,
                    name,
                    part_num,
                    quantity,
                    ubication,
                    damages,
                    porcent,
                  },
                  index
                ) => (
                  <TableRow
                    //const
                    index={index}
                    records={records}
                    key={index}
                    //data
                    image={image}
                    name={name}
                    part_num={part_num}
                    quantity={quantity}
                    ubication={ubication}
                    damages={damages}
                    porcent={porcent}
                  />
                )
              )
            ) : (
              <tr className="bg-white transition-all duration-500 hover:bg-slate-100">
                <td
                  colSpan={columnsInventory.length}
                  className="p-5 whitespace-nowrap text-sm leading-6 font-normal text-gray-900 text-center rounded-bl-xl rounded-br-xl"
                >
                  No hay artículos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
