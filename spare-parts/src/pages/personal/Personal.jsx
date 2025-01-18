import { FiUsers } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { TablePersonal } from "./table/TablePersonal";

export const Personal = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500 overflow-auto">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <FiUsers className="mt-[4px]" />
          <h2 className="mb-6">Personal</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium text-xl">Lista del Personal</h2>
          <TablePersonal/>
        </Card>
      </main>
    </>
  );
};
