import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { LoginPage } from "./pages/login/LoginPage";
import { DashboardRoutes } from "./routes/DashboardRoutes";

export const App = () => {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <Route path="/*" element={<DashboardRoutes />} />
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
