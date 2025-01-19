import { useGeneral } from "../hooks/useGeneral";
import { usePersonal } from "../hooks/usePersonal";
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

  //USERS
  const usersHook = useUsers();

  return (
    <DashboardContext.Provider
      value={{ usersHook, personalHook, generalHook, userProfileHook }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
