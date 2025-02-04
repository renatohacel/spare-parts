import { useExports } from "../hooks/useExports";
import { useGeneral } from "../hooks/useGeneral";
import { useImports } from "../hooks/useImports";
import { useInventory } from "../hooks/useInventory";
import { useOutTools } from "../hooks/useOutTools";
import { usePersonal } from "../hooks/usePersonal";
import { useRacks } from "../hooks/useRacks";
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

  //IMPORTS
  const importsHook = useImports();

  //EXPORTS
  const exportsHook = useExports();

  //RACKS
  const racksHook = useRacks();

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
        importsHook,
        exportsHook,
        racksHook,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
