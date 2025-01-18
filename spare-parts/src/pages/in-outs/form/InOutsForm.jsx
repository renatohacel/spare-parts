import { useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

export const InOutsForm = () => {
  //CAMPOS QUE SON POR MEDIO DEL BACKEND
  //RECEPTOR, NO.EMPLEADO RECEPTOR, TURNO, FECHA, HORA

  const [status, setStatus] = useState("Ingreso");

  return (
    <form className="flex flex-col gap-4 w-full p-5 shadow rounded-lg bg-slate-100 overflow-auto">
      {/* PERSONAL INFO */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="responsible"
          >
            Responsable
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="responsible"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="num_employee"
          >
            No. Empleado
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="num_employee"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Ingreso">Ingreso</option>
            <option value="Salida">Salida</option>
          </select>
        </div>
      </div>
      {/* UBICACION */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="area"
          >
            Área
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="area"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-3">
          <label className="text-slate-400 font-medium mb-1" htmlFor="tester">
            Tester
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="tester"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="reason"
          >
            Motivo/SCRAP
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="reason"
            type="text"
          />
        </div>

        {/* SCRAP */}
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="sn_scrap"
          >
            SN de SCRAP
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="sn_scrap"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty_scrap"
          >
            Cant. SCRAP
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="qty_scrap"
            type="number"
            min={0}
            onKeyDown={(e) => {
              // Bloquear el signo "-" y otras teclas no deseadas
              if (
                e.key === "-" ||
                e.key === "e" ||
                e.key === "+" ||
                e.key === "."
              ) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              // Forzar que el valor sea positivo
              if (e.target.value < 0) {
                e.target.value = 0;
              }
            }}
          />
        </div>
      </div>

      {/* MATERIAL */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="material"
          >
            Material
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="material"
            type="text"
          />
        </div>

        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1"
            htmlFor="sn_material whitespace-nowrap"
          >
            SN de Material
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            name="sn_material"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="qty_material"
          >
            Cant. Material
          </label>
          <input
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 w-full"
            name="qty_material"
            type="number"
            min={0}
            onKeyDown={(e) => {
              // Bloquear el signo "-" y otras teclas no deseadas
              if (
                e.key === "-" ||
                e.key === "e" ||
                e.key === "+" ||
                e.key === "."
              ) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              // Forzar que el valor sea positivo
              if (e.target.value < 0) {
                e.target.value = 0;
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full p-3">
          <label
            className="text-slate-400 font-medium mb-1 whitespace-nowrap"
            htmlFor="comments"
          >
            Comentarios
          </label>
          <textarea
            className="border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 resize-none"
            rows={4}
            name="comments"
            type="text"
            style={{
              boxSizing: 'content-box'
            }}
          />
        </div>
      </div>
      <div className="flex justify-start gap-5">
        <div className="flex flex-row p-3">
          <button className="shadow text-slate-200 text-center bg-teal-600 mb-3 py-2 px-7 w-auto rounded-lg hover:bg-teal-700 transition-all duration-300 focus:ring-2 focus:ring-teal-00 outline-none">
            {status === "Ingreso" ? (
              <>
                <div className="flex gap-2">
                  <IoArrowBackCircleOutline className="text-xl mt-[2.5px]" />
                  <span>Registrar Ingreso</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <IoArrowForwardCircleOutline className="text-xl mt-[2.5px]" />
                  <span>Registrar Salida</span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
