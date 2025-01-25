import { useReducer, useState } from "react"
import { inventoryReducer } from "../reducers/inventoryReducer"
import { getAllInventory } from "../pages/inventory/services/inventoryService";
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
    qty: '',
    ubication: '',
    comments: '',
}


export const useInventory = () => {
    const [inventory, dispatch] = useReducer(inventoryReducer, []);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [materialSelected, setMaterialSelected] = useState(initialFormInventory);

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

    const handlerAddMaterial = async () => {

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
    }


    return {
        inventory,
        isLoading,
        visibleForm,
        editing,
        materialSelected,
        errors,
        initialFormInventory,

        getInventory,
        handlerOpenFormInventory,
        handlerCloseFormInventory,
    }
}