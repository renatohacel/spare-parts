import { VscServer } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";

export const Rack = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <VscServer className="mt-[4px]" />
          <h2 className="mb-6">Ubicación dinámica</h2>
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
          <div className="grid grid-cols-2 gap-10 p-10 bg-slate-100 bg-opacity70 rounded-lg">
            <div className="col-span-1">
              {/* RACK */}
              <div className="flex flex-col gap-4">
                <p className="mt-2 text-xl text-center text-slate-400 font-mono opacity-70">
                  LINEA A
                </p>
                <div className="bg-slate-600 text-center rounded-lg p-1 w-full overflow-auto text-white text-4xl font-mono mb-2">
                  RACK A
                </div>
                <button className="bg-slate-300 text-center rounded-lg p-3 w-full overflow-auto text-slate-500 text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  4
                </button>
                <button className="bg-slate-300 text-center rounded-lg p-3 w-full overflow-auto text-slate-500 text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  3
                </button>
                <button className="bg-slate-300 text-center rounded-lg p-3 w-full overflow-auto text-slate-500 text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  2
                </button>
                <button className="bg-slate-300 text-center rounded-lg p-3 w-full overflow-auto text-slate-500 text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  1
                </button>
              </div>
              {/* RACK */}
              <div className="text-center mt-10 p-2 bg-slate-500 text-white">
                LISTA
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-center mt-10 p-2 bg-slate-500 text-white">
                LISTA
              </div>
              <div className="text-center mt-10 p-2 bg-slate-500 text-white">
                LISTA
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};
