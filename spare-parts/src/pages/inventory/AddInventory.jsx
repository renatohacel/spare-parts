import { AiOutlineProduct } from "react-icons/ai";
import { Card } from "../../components/templates/Card";
import { IoIosArrowForward } from "react-icons/io";

export const AddInventory = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <AiOutlineProduct className="mt-[4px]" />
          <h2 className="mb-6">Inventario</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium">Registrar Artículo</h2>
        </Card>
      </main>
    </>
  );
};
