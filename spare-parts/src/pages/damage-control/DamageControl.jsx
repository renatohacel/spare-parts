import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { TbShieldExclamation } from "react-icons/tb";
import { Card } from "../../components/templates/Card";

export const DamageControl = () => {
  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <TbShieldExclamation className="mt-[4px]" />
          <h2 className="mb-6">Control de Daños</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium">Lista de Daños Registrados</h2>
        </Card>
      </main>
    </>
  );
};
