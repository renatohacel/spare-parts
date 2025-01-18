
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const MenuPersonal = () => {
  return (
    <div className="group">
      <NavLink
        to={"/personal"}
        className="hover:cursor-pointer flex items-center w-full p-2 transition-all rounded-lg outline-none text-start hover:bg-blue-50 hover:bg-opacity-80"
      >
        <div className="grid mr-5 place-items-center text-xl">
          <FiUsers />
        </div>
        Personal
      </NavLink>
    </div>
  );
};
