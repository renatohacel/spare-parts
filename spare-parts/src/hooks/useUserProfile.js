import { useContext, useState } from "react";
import { updateProfile } from "../pages/user-profile/services/profileServices";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/context/AuthContext";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const useUserProfile = () => {
    const { handlerUpdateProfile } = useContext(AuthContext);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({});

    const handleEditProfile = async (input) => {
        try {
            console.log(input)
            const response = await updateProfile(input)

            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Tú usuario fue actualizado con éxito",
                });
                handlerUpdateProfile(response.data.result);
                handleCloseFormProfile();
            } else if (response.status === 409) {
                const errorMessage = response.data.error;
                if (errorMessage === 'username_exists') {
                    setErrors({ username: 'El usuario ya está en uso.' })
                }

            } else if (response.status === 400) {
                const outErrors = response.data.error.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(outErrors);

            } else {
                throw new Error('Error desconocido');
            }
        } catch (error) {
            console.error('Error in handleEditProfile:', error);
            Toast.fire({
                icon: "error",
                title: "Error al actualizar tú perfil",
            });
        }
    }


    const handleOpenFormProfile = () => {
        setVisibleForm(true);
    }

    const handleCloseFormProfile = () => {
        setVisibleForm(false);
        setErrors({})
    }

    return {
        visibleForm,
        errors,
        handleOpenFormProfile,
        handleCloseFormProfile,
        handleEditProfile,
    }
}