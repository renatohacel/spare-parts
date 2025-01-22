import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { FaHome } from "react-icons/fa";

export const Dashboard = () => {
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
          <div className="grid grid-rows-5 gap-10 p-10 bg-slate-100 bg-opacity70 rounded-lg">
            {/* RACK 1 */}
            <div>
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                RACK 1
              </p>
              <div className="row-span-1 px-3 py-10 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  A
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  B
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  C
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  D
                </button>
              </div>
            </div>
            {/* RACK 2 */}
            <div>
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                RACK 2
              </p>
              <div className="row-span-1 px-3 py-10 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  A
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  B
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  C
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  D
                </button>
              </div>
            </div>
            {/* RACK 3 */}
            <div>
              <p className="mb-1 text-xl text-slate-400 font-mono opacity-70">
                RACK 3
              </p>
              <div className="row-span-1 px-3 py-10 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  A
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  B
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  C
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  D
                </button>
              </div>
            </div>
            {/* RACK 4 */}
            <div>
              <p className="mb-1 text-slate-400 text-xl font-mono opacity-70">
                RACK 4
              </p>
              <div className="row-span-1 px-3 py-10 items-center flex flex-row gap-3 justify-between bg-slate-300 bg-opacity-70 text-center rounded-lg h-14 shadow-lg">
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  A
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  B
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  C
                </button>
                <button className="bg-slate-600 rounded-lg p-3 w-full overflow-auto text-white text-4xl font-mono hover:shadow-2xl hover:bg-slate-400 transition-all duration-500 hover:-translate-y-3">
                  D
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};
