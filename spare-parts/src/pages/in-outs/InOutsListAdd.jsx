import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { CgArrowsExchange } from "react-icons/cg";
import { InOutsForm } from "./form/InOutsForm";

export const InOutsListAdd = () => {
  return (
    <>
      <main className="flex-1 p-8 text-slate-500 overflow-auto">
        <div className="flex flex-row gap-2 text-3xl font-bold">
          <IoIosArrowForward className="mt-[4px]" />
          <CgArrowsExchange className="mt-[4px]" />
          <h2 className="mb-6">Ingresos / Salidas</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium text-xl">Registrar Ingreso / Salida</h2>
          <InOutsForm />
        </Card>
      </main>
    </>
  );
};
