import { useReducer, useState } from "react"
import { inventoryReducer } from "../reducers/inventoryReducer"
import { checkDashboard, createMaterial, deleteMaterial, getAllInventory, updateMaterial } from "../pages/inventory/services/inventoryService";
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

const initialFormInventory = {
    id: 0,
    image: '',
    id_feature: '',
    name: '',
    part_num: '',
    suplier_part_num: '',
    qty_import_total: '',
    location: '',
    comments: '',
}


export const useInventory = () => {
    const [inventory, dispatch] = useReducer(inventoryReducer, []);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [materialSelected, setMaterialSelected] = useState(initialFormInventory);
    const [imageOpen, setImageOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState('')

    const getInventory = async () => {
        try {
            setIsLoading(true);
            const result = await getAllInventory();
            dispatch({
                type: 'loadInventory',
                payload: result.data
            })
        } catch (error) {
            console.error('Error en el fetching inventory:', error)
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddMaterial = async (material) => {

        try {
            const id = parseInt(material.get('id'), 10);
            console.log('ID:', id);

            const response = id === 0
                ? await createMaterial(material)
                : await updateMaterial(material);

            if (response && response.status === 201) {
                dispatch({
                    type: id === 0 ? 'addInventory' : 'updateInventory',
                    payload: response.data.result
                });

                if (id !== 0) {
                    handlerCloseFormInventory();
                    Toast.fire({
                        icon: "success",
                        title: "Material updated successfully.",
                    });
                } else {
                    handlerCloseFormInventory();
                    Toast.fire({
                        icon: "success",
                        title: "Material registered successfully.",
                    });
                }
            } else if (response && response.status === 409) {
                const errorMessage = response.data.error;
                switch (errorMessage) {
                    case 'id_feature_exists':
                        setErrors({ id_feature: 'The ID Feature already exists' });
                        break;
                    case 'name_exists':
                        setErrors({ name: 'The Name already exists' });
                        break;
                    case 'part_num_exists':
                        setErrors({ part_num: 'The Part Number already exists' });
                        break;
                    case 'suplier_part_num_exists':
                        setErrors({ suplier_part_num: 'The Suplier Part Number already exists' });
                        break;
                    default:
                        setErrors({ other: 'Error desconocido' });
                        break;
                }
            }
        } catch (error) {
            console.error('Error in handlerAddOutTool:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar material",
            });
        }
    };

    const handlerDeleteMaterial = async (id) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar el material?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMaterial(id);
                dispatch({
                    type: "deleteInventory",
                    payload: id,
                });
                Toast.fire({
                    title: "Material eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }

    const handlerCheckDashboard = async (id) => {
        try {
            const response = await checkDashboard(id)
            if (response && response.status === 201) {
                dispatch({
                    type: 'updateInventory',
                    payload: response.data.result
                })
            } else {
                throw new Error('Not Found');
            }
        } catch (error) {
            console.error('Error in handlerCheckReturn:', error);
            Toast.fire({
                icon: "error",
                title: "Error check_dasboard",
            });
        }

    }


    const handlerMaterialSelected = (material) => {
        setEditing(true);
        setVisibleForm(true);
        setMaterialSelected({
            ...material
        })
    }

    const handlerOpenFormInventory = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseFormInventory = () => {
        setVisibleForm(false);
        setMaterialSelected(initialFormInventory);
        setErrors({});
    }

    const handlerImageOpen = (image) => {
        setImageOpen(true)
        setImageSelected(image)
    }

    const handlerImageClose = () => {
        setImageOpen(false)
        setImageSelected('')
    }


    return {
        inventory,
        isLoading,
        visibleForm,
        editing,
        materialSelected,
        errors,
        initialFormInventory,
        imageOpen,
        imageSelected,

        getInventory,
        handlerOpenFormInventory,
        handlerCloseFormInventory,
        handlerAddMaterial,
        handlerDeleteMaterial,
        handlerMaterialSelected,
        handlerImageOpen,
        handlerImageClose,
        handlerCheckDashboard,
    }
}