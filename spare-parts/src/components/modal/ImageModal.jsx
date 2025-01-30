import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

export const ImageModal = ({ image }) => {
  const { inventoryHook } = useContext(DashboardContext);
  const { handlerImageClose } = inventoryHook;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {/* Contenedor relativo para colocar el botón de cierre */}
      <div className="relative">
        <button
          onClick={() => {
            handlerImageClose();
          }}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-100 hover:text-red-500 text-slate-500 transition-colors"
        >
          ✕
        </button>

        {/* Imagen que se ajusta a la ventana sin salir de los límites */}
        <img
          src={image}
          alt="Modal"
          className="max-w-[90vw] max-h-[90vh] object-contain bg-slate-100 p-4 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
