import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { FaHome } from "react-icons/fa";

export const Dashboard = () => {
  // Crear una referencia para el botón "RACK 23"
  const [found, setFound] = useState(false);
  const rack23Ref = useRef(null);

  // Enfocar y desplazar la pantalla hacia el botón "RACK 23" al iniciar
  useEffect(() => {
    if (rack23Ref.current) {
      rack23Ref.current.focus(); // Enfocar el botón
      rack23Ref.current.scrollIntoView({ behavior: "smooth", block: "center" }); // Desplazar la pantalla hacia el botón
      setFound(true);
    }
  }, []);

  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <FaHome className="mt-[4px]" />
          <h2 className="mb-6">Inicio</h2>
        </div>
        <Card>
          <div className="flex flex-row justify-between">
            <h2 className="mb-6 font-medium text-lg">Mapa de Racks</h2>
            <input
              className="mb-3 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
              placeholder="Buscar..."
              type="text"
              // value={searchText}
              // onChange={handleSearchChange}
            />
          </div>
          <div className="grid p-10 gap-10 grid-flow-row bg-slate-100 rounded-lg">
            {/* RACK 1 */}
            <div className="row-span-1">
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                LINEA A
              </p>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button
                  className={` rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono  transition-all duration-500  
                    ${
                      false
                        ? "-translate-y-3 bg-teal-600 shadow-2xl shadow-green-700 hover:bg-teal-500 focus:outline-none focus:ring-teal-700 focus:ring-2"
                        : "bg-slate-600 hover:shadow-2xl hover:bg-slate-400 hover:-translate-y-3"
                    }`}
                >
                  RACK 1
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 2
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 3
                </button>
              </div>
            </div>
            {/* RACK 2 */}
            <div className="row-span-1">
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                LINEA B
              </p>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 4
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 5
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 6
                </button>
              </div>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg mt-1">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 7
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 8
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 9
                </button>
              </div>
              <p className="mt-2 text-xl text-slate-400 font-mono opacity-70">
                LINEA C
              </p>
            </div>
            {/* RACK 3 */}
            <div className="row-span-1">
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                LINEA D
              </p>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 10
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 11
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 12
                </button>
              </div>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg mt-1">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 13
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 14
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 15
                </button>
              </div>
              <p className="mt-2 text-xl text-slate-400 font-mono opacity-70">
                LINEA E
              </p>
            </div>
            {/* RACK 4 */}
            <div className="row-span-1">
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                LINEA F
              </p>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 16
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 17
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 18
                </button>
              </div>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg mt-1">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 19
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 20
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 21
                </button>
              </div>
              <p className="mt-2 text-xl text-slate-400 font-mono opacity-70">
                LINEA G
              </p>
            </div>
            {/* RACK 5 */}
            <div className="row-span-1">
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                LINEA H
              </p>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 22
                </button>
                <button
                  ref={rack23Ref} // Asignar la referencia al botón "RACK 23"
                  className={` rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono  transition-all duration-500  
                    ${
                      found
                        ? "-translate-y-3 bg-teal-600 shadow-2xl shadow-green-700 hover:bg-teal-500 focus:outline-none focus:ring-teal-700 focus:ring-2"
                        : "bg-slate-600 hover:shadow-2xl hover:bg-slate-400 hover:-translate-y-3"
                    }`}
                >
                  RACK 23
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 24
                </button>
              </div>
              <div className="px-3 py-5 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg mt-1">
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 25
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 26
                </button>
                <button className="bg-slate-600 rounded-lg p-1 w-full overflow-auto text-white text-xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  RACK 27
                </button>
              </div>
              <p className="mt-2 text-xl text-slate-400 font-mono opacity-70">
                LINEA I
              </p>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};
