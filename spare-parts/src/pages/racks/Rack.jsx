import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { VscServer } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { TableInventory } from "../inventory/table/TableInventory";

export const Rack = () => {
  // Leemos el rackId de la URL (p.ej. "/rack/19" => "19")
  const { rackId } = useParams();

  // Leemos la letra (A, B, C, D...) pasada en navigate(..., { state: { letter: ... } })
  const location = useLocation();
  const { letter_dashboard } = location.state || {};

  const [letter, setLetter] = useState(letter_dashboard);
  const [currentLocation, setCurrentLocation] = useState(
    letter_dashboard ? `${rackId}-${letter_dashboard}` : rackId
  );
  // Obtenemos el inventario del contexto

  const handlerCurrentLocation = (l) => {
    setLetter(l);
    setCurrentLocation(`${rackId}-${l}`);
  };

  // A, B, C, D para el rack
  const letters = ["A", "B", "C", "D"];

  return (
    <main className="flex-1 p-8 text-slate-500">
      <div className="flex flex-row gap-2 text-3xl font-bold ">
        <IoIosArrowForward className="mt-[4px]" />
        <VscServer className="mt-[4px]" />
        <h2 className="mb-6">Rack {rackId}</h2>
      </div>

      <Card>
        <div className="flex flex-row justify-between">
          <h2 className="mb-6 font-medium text-xl">Rack Layout</h2>
        </div>

        <div className="grid grid-cols-2 gap-10 p-10 bg-slate-100 bg-opacity-70 rounded-lg">
          <div className="col-span-1">
            {/* RACK */}
            <div className="flex flex-col gap-4">
              <p className="mt-2 text-xl text-center text-slate-400 font-mono opacity-70">
                SECTION {letter ? letter : "GENERAl"}
              </p>
              {/* Muestra el número del rack */}
              <button
                className="bg-slate-600 text-center rounded-lg p-1 w-full overflow-auto text-white text-4xl font-mono mb-2 hover:bg-slate-500 transition-all duration-300"
                onClick={() => handlerCurrentLocation("")}
              >
                RACK {rackId}
              </button>

              {/* Botones A, B, C, D. Se resalta el que coincida con letter */}
              {letters.map((l) => {
                const isActive = l === letter;
                return (
                  <button
                    key={l}
                    className={`
                      ${isActive ? "bg-slate-400" : "bg-slate-300"}
                      text-center rounded-lg p-3 w-full overflow-auto 
                      text-slate-500 text-4xl font-mono
                      hover:shadow-2xl hover:bg-slate-400 
                      transition-all duration-500 hover:-translate-y-3
                    `}
                    onClick={() => handlerCurrentLocation(l)}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Columna derecha (puedes mostrar otra info o tablas) */}

          <div className="col-span-1">
            <div className="text-center mt-10 p-2">
              <TableInventory inRack={true} currentLocation={currentLocation} />
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};
