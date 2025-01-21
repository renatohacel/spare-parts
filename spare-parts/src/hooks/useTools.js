import { useReducer, useState } from "react";
import { toolsReducer } from "../reducers/toolsReducer";
import { createTool, deleteByIdTool, getAllTools, updateTool } from "../pages/tools/services/toolsService";
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



const initialToolForm = {
    id: 0,
    name: '',
}

export const useTools = () => {

    const [tools, dispatch] = useReducer(toolsReducer, [])
    const [toolSelected, setToolSelected] = useState(initialToolForm);
    const [visibleTable, setVisibleTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [visibleFormTable, setVisibleFormTable] = useState(false);

    const getTools = async () => {
        try {
            setIsLoading(true);
            const result = await getAllTools();
            dispatch({
                type: 'loadTools',
                payload: result.data
            });
        } catch (error) {
            console.error("Error fetching tools:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddTool = async (tool) => {
        try {
            const response = tool.id === 0
                ? await createTool(tool)
                : await updateTool(tool)

            if (response && response.status === 201) {
                dispatch({
                    type: (tool.id === 0) ? 'addTool' : 'updateTool',
                    payload: response.data.result
                });

                if (tool.id !== 0) {
                    handlerCloseFormTable();
                    Toast.fire({
                        icon: "success",
                        title: "Herramienta actualizada con éxito",
                    });
                } else {
                    handlerCloseFormTable();
                    Toast.fire({
                        icon: "success",
                        title: "Herramienta registrada con éxito",
                    });
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
            console.error('Error in handlerAddTool:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar herramienta",
            });
        }
    }

    const handlerDeleteTool = async (id) => {
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
                deleteByIdTool(id);
                dispatch({
                    type: "deleteTool",
                    payload: id,
                });
                Toast.fire({
                    title: "Herramienta eliminada correctamente",
                    icon: "success"
                });
            }
        });
    }

    const handlerToolSelected = (tool) => {
        setEditing(true);
        setVisibleFormTable(true);
        setToolSelected({
            ...tool
        })
    }

    const handlerOpenTableTools = () => {
        setVisibleTable(true);
    }
    const handlerCloseTableTools = () => {
        setVisibleTable(false);
    }

    const handlerOpenFormTable = () => {
        setEditing(false);
        setVisibleFormTable(true);
    }
    const handlerCloseFormTable = () => {
        setVisibleFormTable(false);
        setToolSelected(initialToolForm);
        setErrors({})
    }

    return {
        tools,
        visibleTable,
        isLoading,
        visibleFormTable,
        toolSelected,
        editing,
        errors,
        initialToolForm,
        getTools,
        handlerOpenTableTools,
        handlerCloseTableTools,
        handlerOpenFormTable,
        handlerCloseFormTable,
        handlerToolSelected,
        handlerAddTool,
        handlerDeleteTool,
    }
}