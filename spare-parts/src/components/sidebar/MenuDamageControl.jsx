import { TbShieldExclamation } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export const MenuDamageControl = () => {
  return (
    <div className="group">
      <NavLink
        to={"/damage-control"}
        className="hover:cursor-pointer flex items-center w-full p-2 transition-all rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80"
      >
        <div className="grid mr-5 place-items-center text-xl">
          <TbShieldExclamation />
        </div>
        Control de Daños
      </NavLink>
    </div>
  );
};
