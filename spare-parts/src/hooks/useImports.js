import { useReducer, useState } from "react"
import { importsReducer } from "../reducers/importsReducer";
import Swal from "sweetalert2";
import { createImport, deleteImport, getByName } from "../pages/inventory/imports/services/importsService";


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


const initialFormImport = {
    id: 0,
    part_num: '',
    qty: '',
}

export const useImports = () => {
    const [imports, dispatch] = useReducer(importsReducer, []);
    const [visibleImports, setVisibleImports] = useState(false);
    const [partNumSelected, setPartNumSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [importSelected, setImportSelected] = useState(initialFormImport)
    const [sendImport, setSendImport] = useState(false);


    const getImportsByName = async (part_num) => {
        try {
            setIsLoading(true);
            const result = await getByName(part_num);
            dispatch({
                type: 'loadImport',
                payload: result.data
            })
        } catch (error) {
            console.error("Error fetching imports:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddImport = async (imp) => {
        try {
            setSendImport(true);
            const response = imp.id === 0
                ? await createImport(imp)
                : 'update'
            if (response && response.status === 201) {
                dispatch({
                    type: (imp.id === 0) ? 'addImport' : 'updateImport',
                    payload: response.data.result
                })
                if (imp.id !== 0) {
                    handlerCloseForm();
                    Toast.fire({
                        icon: "success",
                        title: "Import updated successfully",
                    });
                } else {
                    handlerCloseForm();
                    Toast.fire({
                        icon: "success",
                        title: "Import updated successfully",
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
            console.error('Error in handlerAddOutTool:', error);
            Toast.fire({
                icon: "error",
                title: "Error registering import",
            });
        } finally {
            setSendImport(false);
        }
    }

    const handlerDeleteImport = async (id) => {
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
                deleteImport(id);
                dispatch({
                    type: "deleteImport",
                    payload: id,
                });
                setSendImport(true);
                Toast.fire({
                    title: "Import eliminado correctamente",
                    icon: "success"
                });
            }
        }).finally(() => setSendImport(false));
    }

    const handlerOpenForm = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setImportSelected(initialFormImport)
    }

    const handlerPartNumSelected = (part_num) => {
        setVisibleImports(true);
        setPartNumSelected(part_num)
    }

    const handlerImportSelected = (imp) => {
        setEditing(true);
        setVisibleForm(true);
        setImportSelected({ ...imp })
    }

    const handlerCloseTableImports = () => {
        setVisibleImports(false)
        setPartNumSelected({})
    }


    return {
        imports,
        visibleImports,
        partNumSelected,
        isLoading,
        editing,
        visibleForm,
        importSelected,
        initialFormImport,
        sendImport,

        handlerPartNumSelected,
        getImportsByName,
        handlerCloseTableImports,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddImport,
        handlerImportSelected,
        handlerDeleteImport,
    }
}