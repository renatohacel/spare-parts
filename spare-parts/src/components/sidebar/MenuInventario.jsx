import { AiOutlineProduct } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdCreate } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const MenuInventario = () => {
  return (
    <div className="group">
      <div className="hover:cursor-pointer flex items-center w-full p-2 transition-all duration-300 rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80">
        <div className="grid mr-4 place-items-center text-2xl">
          <AiOutlineProduct />
        </div>
        <p>Inventario</p>
        <IoIosArrowForward className="ml-2 mt-[1px] group-hover:hidden" />
        <IoIosArrowDown className="hidden ml-2 mt-[1px] group-hover:flex" />
      </div>
      <div className="hidden flex-col gap-2 mt-2 group-hover:flex">
        <NavLink
          to={"/inventory"}
          className="flex items-center w-full p-2 transition-all duration-300 rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80 text-xs"
        >
          <div className="grid mr-4 place-items-center">
            <FaListUl />
          </div>
          Articulos Registrados
        </NavLink>
        <NavLink
          to={"/inventory/add"}
          className="flex items-center w-full p-2 transition-all duration-300 rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80 text-xs"
        >
          <div className="grid mr-4 place-items-center">
            <MdCreate />
          </div>
          Registrar Articulo
        </NavLink>
      </div>
    </div>
  );
};
