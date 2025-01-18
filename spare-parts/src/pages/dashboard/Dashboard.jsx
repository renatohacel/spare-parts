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
        <div className="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <h2 className="mb-6 font-medium">Registrar Ingreso/Salida</h2>
          </Card>
          <Card>
            <h2 className="mb-6 font-medium">Registrar Herramienta</h2>
          </Card>
        </div>

        <Card>
          <h2 className="mb-6 font-medium">Lista de Salidas/Ingresos</h2>
        </Card>
      </main>
    </>
  );
};
