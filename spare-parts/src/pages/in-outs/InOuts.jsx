import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { CgArrowsExchange } from "react-icons/cg";
import { TableInOuts } from "./table/TableInOuts";

export const InOuts = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <CgArrowsExchange className="mt-[4px]" />
          <h2 className="mb-6">In / Outs</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium text-xl">In / Outs List</h2>
          <TableInOuts />
        </Card>
      </main>
    </>
  );
};
