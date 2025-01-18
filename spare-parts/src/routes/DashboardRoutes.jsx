import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ListInventory } from "../pages/inventory/ListInventory";
import { AddInventory } from "../pages/inventory/AddInventory";
import { InOutsList } from "../pages/in-outs/InOutsList";
import { InOutsListAdd } from "../pages/in-outs/InOutsListAdd";
import { Tools } from "../pages/tools/Tools";
import { DamageControl } from "../pages/damage-control/DamageControl";
import { Personal } from "../pages/personal/Personal";
import { Footer } from "../components/templates/Footer";
import { UserProfile } from "../pages/user-profile/UserProfile";
import { Users } from "../pages/users/Users";
import { useContext} from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { DashboardProvider } from "../../context/DashboardProvider";

export const DashboardRoutes = () => {
  const { login } = useContext(AuthContext);
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="inventory" element={<ListInventory />} />
              <Route path="inventory/add" element={<AddInventory />} />
              <Route path="in-outs" element={<InOutsList />} />
              <Route path="in-outs/add" element={<InOutsListAdd />} />
              <Route path="tools" element={<Tools />} />
              <Route path="damage-control" element={<DamageControl />} />
              <Route path="personal" element={<Personal />} />
              <Route path="my-profile" element={<UserProfile />} />
              {login.user.isAdmin === 1 ? (
                <Route path="users" element={<Users />} />
              ) : (
                <Route path="*" element={<Navigate to="/home" />} />
              )}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </DashboardProvider>
  );
};
