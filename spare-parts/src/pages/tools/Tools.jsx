import { IoIosArrowForward } from "react-icons/io";
import { LiaToolsSolid } from "react-icons/lia";
import { Card } from "../../components/templates/Card";

export const Tools = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <LiaToolsSolid className="mt-[4px]" />
          <h2 className="mb-6">Herramientas</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium">Préstamos de Herramienta</h2>
        </Card>
      </main>
    </>
  );
};
