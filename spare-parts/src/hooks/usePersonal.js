import { useReducer, useState } from "react"
import { createPersonal, deleteByIdPersonal, getAllPersonal, updateEmployee } from "../pages/personal/services/personalService"
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
    const [personal, dispatch] = useReducer(personalReducer, initialPersonal);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({});
    const [employeeSelected, setEmployeeSelected] = useState(initialPersonalForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [editing, setEditing] = useState(false);

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

        try {
            const response = employee.id === 0
                ? await createPersonal(employee)
                : await updateEmployee(employee);

            if (response.status === 201) {
                dispatch({
                    type: (employee.id === 0) ? "addEmployee" : "updateEmployee",
                    payload: response.data.result
                });

                if (employee.id === 0) {
                    setIsSend(true);
                    onSend();
                }

                if (employee.id > 0) {
                    handlerCloseFormPersonal();
                    Toast.fire({
                        icon: "success",
                        title: "Empleado actualizado con éxito",
                    });
                    setIsSend(false);
                }

                // await getPersonal();


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
                deleteByIdPersonal(id);
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
        setEditing(true);
        setVisibleForm(true);
        setEmployeeSelected({
            ...employee
        });
    }

    const handlerOpenFormPersonal = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseFormPersonal = () => {
        setVisibleForm(false);
        setEmployeeSelected(initialPersonalForm);
        setErrors({})
    }


    const onSend = () => {
        const resetForm = { ...initialPersonalForm };
        setEmployeeSelected(resetForm);
        setErrors({});

        setTimeout(() => {
            setIsSend(false);
        }, 1000);
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
        editing,
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
