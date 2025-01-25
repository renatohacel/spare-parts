import { CgArrowsExchange } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

export const MenuInOuts = () => {
  return (
    <div className="group">
      <NavLink
        className="hover:cursor-pointer flex items-center w-full p-2 transition-all duration-300 rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80"
        to={"/in-outs"}
      >
        <div className="grid mr-4 place-items-center text-2xl">
          <CgArrowsExchange />
        </div>
        In/Outs
      </NavLink>
    </div>
  );
};
