import { AiOutlineProduct } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export const MenuInventario = () => {
  return (
    <div className="group">
      <NavLink
        className="hover:cursor-pointer flex items-center w-full p-2 transition-all duration-300 rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80"
        to={"/inventory"}
      >
        <div className="grid mr-4 place-items-center text-2xl">
          <AiOutlineProduct />
        </div>
        <p>Inventory</p>
      </NavLink>
    </div>
  );
};
