import { IoIosArrowForward } from "react-icons/io";
import { LiaToolsSolid } from "react-icons/lia";
import { Card } from "../../components/templates/Card";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { Modal } from "../../components/modal/Modal";
import { TableTools } from "./tableTools/TableTools";
import { TableOutsTools } from "./tableOutsTools/TableOutsTools";
import { AuthContext } from "../../auth/context/AuthContext";

export const Tools = () => {
  const { login } = useContext(AuthContext);
  const { toolsHook, outToolsHook } = useContext(DashboardContext);
  const { handlerOpenFormOutTool } = outToolsHook;
  const { getTools, visibleTable, handlerOpenTableTools } = toolsHook;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTools();
  }, []);

  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <LiaToolsSolid className="mt-[4px]" />
          <h2 className="mb-6">Tools</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium text-xl">Préstamos de Herramienta</h2>
          <div className="flex justify-start gap-2 mb-2">
            {login.user.isAdmin === 1 && (
              <button
                className="shadow text-slate-200 text-center text-sm bg-teal-600 mb-3 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
                onClick={handlerOpenFormOutTool}
              >
                Registrar Préstamo
              </button>
            )}
            <button
              className="shadow text-gray-400 text-center text-sm bg-inherit border border-gray-400 mb-3 p-2 rounded-lg hover:bg-gray-400 hover:text-gray-100 transition-all duration-300 opacity-80"
              onClick={handlerOpenTableTools}
            >
              Lista de Herramientas
            </button>
          </div>
          <TableOutsTools />
        </Card>
      </main>
      {visibleTable && (
        <Modal title={"Lista de Herramientas"}>
          <TableTools />
        </Modal>
      )}
    </>
  );
};
