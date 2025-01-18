import { useReducer, useState } from "react"
import { createPersonal, deleteById, getAllPersonal, updateEmployee } from "../src/pages/personal/services/personalService"
import { personalReducer } from "../reducers/personalReducer"
import Swal from 'sweetalert2';

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

const initialPersonalForm = {
    id: 0,
    name: '',
    num_employee: '',
    role: '',
    area: '',
    manager: '',
    shift: '',
}
const initialPersonal = [];



export const usePersonal = () => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [personal, dispatch] = useReducer(personalReducer, initialPersonal);
    const [errors, setErrors] = useState({});
    const [employeeSelected, setEmployeeSelected] = useState(initialPersonalForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const getPersonal = async () => {
        try {
            setIsLoading(true);
            const result = await getAllPersonal();
            dispatch({
                type: 'loadPersonal',
                payload: result.data
            });
        } catch (error) {
            console.error("Error fetching personal:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddPersonal = async (employee) => {
        let response;
        try {
            if (employee.id === 0) {
                response = await createPersonal(employee);
            } else {
                response = await updateEmployee(employee);
            }

            if (response.status === 201) {
                setIsSend(true);
                dispatch({
                    type: (employee.id === 0) ? "addUser" : "updateUser",
                    payload: response.data.result
                });
                await getPersonal();
                if (employee.id === 0) {
                    onSend();
                } else {
                    handlerCloseFormPersonal();
                    Toast.fire({
                        icon: "success",
                        title: "Empleado actualizado con éxito",
                    });
                    setIsSend(false);
                }
            } else if (response.status === 409) {
                setErrors({ num_employee: 'El número de empleado ya está registrado' });

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
            console.error('Error in handlerAddPersonal:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar empleado",
            });
        }
    }

    const handlerDeleteEmployee = (id) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar el empleado?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteById(id);
                dispatch({
                    type: "deleteEmployee",
                    payload: id,
                });
                Toast.fire({
                    title: "Empleado eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }

    const handlerEmployeeSelected = (employee) => {
        setVisibleForm(true);
        setEmployeeSelected({
            ...employee
        });
    }

    const handlerOpenFormPersonal = () => {
        setVisibleForm(true);
        setEmployeeSelected(initialPersonalForm);
    }

    const handlerCloseFormPersonal = () => {
        setVisibleForm(false);
        setEmployeeSelected(initialPersonal);
        setErrors({})
    }


    const onSend = () => {
        const resetForm = { ...initialPersonalForm };
        setEmployeeSelected(resetForm);
        setErrors({});

        setTimeout(() => {
            setIsSend(false);
        }, 2000);
    }





    return {
        //const
        visibleForm,
        initialPersonalForm,
        personal,
        employeeSelected,
        isLoading,
        isSend,
        errors,
        //functions
        handlerEmployeeSelected,
        handlerOpenFormPersonal,
        handlerCloseFormPersonal,
        handlerAddPersonal,
        handlerDeleteEmployee,
        //api
        getPersonal,
    }

}
