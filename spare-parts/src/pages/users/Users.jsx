import { IoIosArrowForward } from "react-icons/io";
import { TbUsersGroup } from "react-icons/tb";
import { Card } from "../../components/templates/Card";
import { TableUsers } from "./table/TableUsers";

export const Users = () => {
  return (
    <main className="flex-1 p-8 text-slate-500 overflow-auto">
      <div className="flex flex-row gap-2 text-3xl font-bold">
        <IoIosArrowForward className="mt-[4px]" />
        <TbUsersGroup className="mt-[4px]" />
        <h2 className="mb-6">Usuarios</h2>
      </div>

      <Card>
        <h2 className="mb-6 font-medium text-xl">Administrar Usuarios</h2>
        <TableUsers />
      </Card>
    </main>
  );
};
