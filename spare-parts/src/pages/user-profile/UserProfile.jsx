import { FaUserCog } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "../../components/templates/Card";
import { useContext } from "react";
import { Modal } from "../../components/modal/Modal";
import { DashboardContext } from "../../context/DashboardContext";
import { UserProfileForm } from "./form/UserProfileForm";
import { ProfileCard } from "./ProfileCard";

export const UserProfile = () => {
  const { userProfileHook } = useContext(DashboardContext);
  const { visibleForm } = userProfileHook;

  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 p-8 text-slate-500">
        <div className="flex flex-row gap-2 text-3xl font-bold ">
          <IoIosArrowForward className="mt-[4px]" />
          <FaUserCog className="mt-[4px]" />
          <h2 className="mb-6">Mi Perfil</h2>
        </div>

        <Card>
          <h2 className="mb-6 font-medium text-xl">Detalles de Mi Perfil</h2>
          <ProfileCard />
        </Card>

        {visibleForm && (
          <Modal title={"Editar Mi Usuario/Contraseña"}>
            <UserProfileForm />
          </Modal>
        )}
      </main>
    </>
  );
};
