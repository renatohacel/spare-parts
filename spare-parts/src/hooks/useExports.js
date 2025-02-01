import { useReducer, useState } from "react"
import Swal from "sweetalert2";
import { exportsReducer } from "../reducers/exportsReducer";
import { createExport, deleteExport, getByName, updateExport } from "../pages/inventory/exports/services/exportsServices";


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


const initialFormExport = {
    id: 0,
    part_num: '',
    qty: '',
    receiver_location: '',
}

export const useExports = () => {
    const [exports, dispatch] = useReducer(exportsReducer, []);
    const [visibleExports, setVisibleExports] = useState(false);
    const [partNumSelected, setPartNumSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [exportSelected, setExportSelected] = useState(initialFormExport)
    const [sendExport, setSendExport] = useState(false);


    const getExportsByName = async (part_num) => {
        try {
            setIsLoading(true);
            const result = await getByName(part_num);
            dispatch({
                type: 'loadExport',
                payload: result.data
            })
        } catch (error) {
            console.error("Error fetching exports:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddExport = async (imp) => {
        try {
            setSendExport(true);
            const response = imp.id === 0
                ? await createExport(imp)
                : await updateExport(imp)
            if (response && response.status === 201) {
                dispatch({
                    type: (imp.id === 0) ? 'addExport' : 'updateExport',
                    payload: response.data.result
                })
                if (imp.id !== 0) {
                    handlerCloseForm();
                    Toast.fire({
                        icon: "success",
                        title: "Export updated successfully",
                    });
                } else {
                    handlerCloseForm();
                    Toast.fire({
                        icon: "success",
                        title: "Export updated successfully",
                    });
                }
            } else if (response && response.status === 404) {
                Toast.fire({
                    icon: "error",
                    title: "Import not found",
                });
            } else {
                throw new Error('Error desconocido');
            }
        } catch (error) {
            console.error('Error in handlerAddExport:', error);
            Toast.fire({
                icon: "error",
                title: "Error registering import",
            });
        } finally {
            setSendExport(false);
        }
    }

    const handlerDeleteExport = async (id) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar la importación?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExport(id);
                dispatch({
                    type: "deleteExport",
                    payload: id,
                });
                setSendExport(true);
                Toast.fire({
                    title: "Import eliminado correctamente",
                    icon: "success"
                });
            }
        }).finally(() => setSendExport(false));
    }

    const handlerOpenForm = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setExportSelected(initialFormExport)
    }

    const handlerPartNumSelected = (part_num) => {
        setVisibleExports(true);
        setPartNumSelected(part_num)
    }

    const handlerExportSelected = (exp) => {
        setEditing(true);
        setVisibleForm(true);
        setExportSelected({ ...exp })
    }

    const handlerCloseTableExports = () => {
        setVisibleExports(false)
        setPartNumSelected({})
    }


    return {
        exports,
        visibleExports,
        partNumSelected,
        isLoading,
        editing,
        visibleForm,
        exportSelected,
        initialFormExport,
        sendExport,

        handlerPartNumSelected,
        getExportsByName,
        handlerCloseTableExports,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddExport,
        handlerExportSelected,
        handlerDeleteExport,
    }
}