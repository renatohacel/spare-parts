import { useReducer, useState } from "react"
import { outToolReducer } from "../reducers/outToolReducer";
import { createOutTool, deleteOutTool, getAllOutTools, updateOutTool } from "../pages/tools/services/outToolsService";
import Swal from "sweetalert2";


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



const initialOutToolForm = {
    id: 0,
    receiver: "",
    num_employee_receiver: "",
    tool: "",
    area: "",
    qty: "",
    area: "",
}

export const useOutTools = () => {
    const [outTools, dispatch] = useReducer(outToolReducer, [])
    const [outToolSelected, setOutToolSelected] = useState(initialOutToolForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});




    const getOutTools = async () => {
        try {
            setIsLoading(true);
            const result = await getAllOutTools();
            dispatch({
                type: 'loadOutTools',
                payload: result.data
            })
        } catch (error) {
            console.error("Error fetching personal:", error);
        } finally {
            setIsLoading(false)
        }
    }

    const handlerAddOutTool = async (outTool) => {
        try {
            console.log(outTool)
            const response = outTool.id === 0
                ? await createOutTool(outTool)
                : await updateOutTool(outTool)

            if (response && response.status === 201) {
                dispatch({
                    type: (outTool.id === 0) ? 'addOutTool' : 'updateOutTool',
                    payload: response.data.result
                });

                if (outTool.id !== 0) {
                    handlerCloseFormOutTool();
                    Toast.fire({
                        icon: "success",
                        title: "Préstamo realizado con éxito",
                    });
                } else {
                    handlerCloseFormOutTool()
                    Toast.fire({
                        icon: "success",
                        title: "Préstamo editado con éxito",
                    });
                }

            } else if (response && response.status === 409) {
                const errorMessage = response.data.error;
                switch (errorMessage) {
                    case 'receiver_not_exists':
                        setErrors({ receiver: 'El empleado no está registrado en el personal' })
                        break;
                    case 'tool_no_exists':
                        setErrors({ tool: 'La herramienta no está registrada' })
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
            console.error('Error in handlerAddOutTool:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar préstamo de herramienta",
            });
        }
    }


    const handlerOutToolSelected = (outTool) => {
        setEditing(true);
        setVisibleForm(true);
        setOutToolSelected({
            ...outTool,
            selectedReceiver: outTool.selectedReceiver,
            selectedTool: outTool.selectedTool
        });
    }

    const handlerDeleteOutTool = async (id, tool) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar la herramienta?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOutTool(id, tool);
                dispatch({
                    type: "deleteOutTool",
                    payload: id,
                });
                Toast.fire({
                    title: "Herramienta eliminada correctamente",
                    icon: "success"
                });
            }
        });
    }


    const handlerOpenFormOutTool = () => {
        setEditing(false);
        setVisibleForm(true)
    }

    const handlerCloseFormOutTool = () => {
        setVisibleForm(false);
        setOutToolSelected(initialOutToolForm);
        setErrors({});
    }

    return {
        outTools,
        visibleForm,
        outToolSelected,
        initialOutToolForm,
        isLoading,
        editing,
        errors,
        getOutTools,
        handlerOpenFormOutTool,
        handlerCloseFormOutTool,
        handlerOutToolSelected,
        handlerAddOutTool,
        handlerDeleteOutTool,
    }
}