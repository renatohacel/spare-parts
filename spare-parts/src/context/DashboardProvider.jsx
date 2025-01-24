import { useGeneral } from "../hooks/useGeneral";
import { useInventory } from "../hooks/useInventory";
import { useOutTools } from "../hooks/useOutTools";
import { usePersonal } from "../hooks/usePersonal";
import { useTools } from "../hooks/useTools";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUsers } from "../hooks/useUsers";
import { DashboardContext } from "./DashboardContext";

export const DashboardProvider = ({ children }) => {
  //GENERAL
  const generalHook = useGeneral();

  //PERSONAL
  const personalHook = usePersonal();

  //USER PROFILE
  const userProfileHook = useUserProfile();

  //TOOLS
  const toolsHook = useTools();

  //OUT TOOLS
  const outToolsHook = useOutTools();

  //USERS
  const usersHook = useUsers();

  //INVENTORY
  const inventoryHook = useInventory();

  return (
    <DashboardContext.Provider
      value={{
        usersHook,
        personalHook,
        generalHook,
        userProfileHook,
        toolsHook,
        outToolsHook,
        inventoryHook,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
