import Swal from "sweetalert2";
import { useReducer, useState } from "react"
import { createUser, deleteByIdUser, getAllUsers, updateUser } from "../pages/users/services/usersService";
import { usersReducer } from "../reducers/usersReducer";

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

const ToastDeleted = Swal.mixin({
    toast: true,
    position: "center",
});

const initialUsersForm = {
    id: 0,
    username: '',
    password: '',
    name: '',
    num_employee: '',
    shift: '',
    isAdmin: 0
}


const initialUsers = [];

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({})
    const [userSelected, setUserSelected] = useState(initialUsersForm);
    const [isSend, setIsSend] = useState(false);


    const getUsers = async () => {
        try {
            setIsLoading(true);
            const result = await getAllUsers();
            dispatch({
                type: 'loadUsers',
                payload: result.data
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddUser = async (user) => {
        try {
            const response = user.id === 0
                ? await createUser(user)
                : await updateUser(user)

            if (response && response.status === 201) {
                dispatch({
                    type: (user.id === 0) ? 'addUser' : 'updateUser',
                    payload: response.data.result
                });

                if (user.id === 0) {
                    setIsSend(true);
                    onSend();
                }

                if (user.id !== 0) {
                    handlerCloseFormUsers();
                    Toast.fire({
                        icon: "success",
                        title: "Usuario actualizado con éxito",
                    });
                    setIsSend(false);
                }
            } else if (response && response.status === 409) {
                const errorMessage = response.data.error;
                switch (errorMessage) {
                    case 'username_exists':
                        setErrors({ username: 'El usuario ya está en uso.' });
                        break;
                    case 'num_employee_exists':
                        setErrors({ num_employee: 'El número de empleado ya está registrado.' });
                        break;
                    default:
                        setErrors({ other: 'Error desconocido' });
                }
            } else if (response && response.status === 400) {
                const outErrors = response.data.error.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(outErrors);
            } else {
                throw new Error('Error desconocido');
            }
        } catch (error) {
            console.error('Error in handlerAddUser:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar usuario",
            });
        }
    }

    const handlerDeleteEmployee = (id) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar el usuario?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteByIdUser(id);
                dispatch({
                    type: "deleteUser",
                    payload: id,
                });
                Toast.fire({
                    title: "Usuario eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }


    const handlerUserSelected = (user) => {
        setEditing(true);
        setVisibleForm(true);
        setUserSelected({
            ...user
        })
    }

    const handlerOpenFormUsers = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseFormUsers = () => {
        setVisibleForm(false);
        setUserSelected(initialUsersForm)
        setErrors({})
    }

    const onSend = () => {
        const resetForm = { ...initialUsersForm };
        setUserSelected(resetForm);
        setErrors({});

        setTimeout(() => {
            setIsSend(false);
        }, 1000);
    }


    return {
        users,
        isLoading,
        editing,
        visibleForm,
        errors,
        initialUsersForm,
        userSelected,
        isSend,
        getUsers,
        handlerOpenFormUsers,
        handlerCloseFormUsers,
        handlerUserSelected,
        handlerAddUser,
        handlerDeleteEmployee,
    }
}