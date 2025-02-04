import { useReducer, useState } from "react"
import { inOutsReducer } from "../reducers/inOutsReducer"
import Swal from "sweetalert2";
import { getAllInOuts } from "../pages/in-outs/services/inOutServices";

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

const initialFormInOut = {
    id: 0,
    receiver: '',
    num_employee_receiver: '',
    status: '',
    area: '',
    tester: '',
    reason_scrap: '',
    qty_scrap: '',
    sn_scrap: '',
    material: '',
    qty_material: '',
    sn_material: '',
    comments: '',
}


export const useInOuts = () => {
    const [inOuts, dispatch] = useReducer(inOutsReducer, [])
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({});
    const [inOutSelected, setInOutSelected] = useState(initialFormInOut);

    const getInOuts = async () => {
        try {
            setIsLoading(true)
            const result = await getAllInOuts()
            dispatch({
                type: 'loadInOut',
                payload: result.data
            })
        } catch (error) {
            console.error('Error en el fetching in_outs:', error)
        } finally {
            setIsLoading(false);
        }
    }



    const handlerDeleteInOut = async (id) => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar la entrada/salida?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                // deleteMaterial(id);
                // dispatch({
                //     type: "deleteInventory",
                //     payload: id,
                // });
                console.log('DELETING...')
                Toast.fire({
                    title: "In/Out eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }


    const handlerInOutSelected = (inOut) => {
        setEditing(true);
        setVisibleForm(true);
        setInOutSelected({
            ...inOut
        })
    }

    const handlerOpenFormInOut = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseFormInOut = () => {
        setVisibleForm(false);
        setInOutSelected(initialFormInOut);
        setErrors({});
    }


    return {
        inOuts,
        isLoading,
        editing,
        visibleForm,
        errors,
        inOutSelected,
        initialFormInOut,


        getInOuts,
        handlerOpenFormInOut,
        handlerCloseFormInOut,
        handlerInOutSelected,
        handlerDeleteInOut,
    }
}