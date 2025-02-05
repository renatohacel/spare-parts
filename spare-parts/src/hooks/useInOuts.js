import { useReducer, useState } from "react"
import { inOutsReducer } from "../reducers/inOutsReducer"
import Swal from "sweetalert2";
import { createInOut, deleteInOut, getAllInOuts, updateInOut } from "../pages/in-outs/services/inOutServices";

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
    status: 'Ingreso',
    area: '',
    tester: '',
    reason_scrap: '',
    qty_scrap: '',
    sn_scrap: '',
    material: '',
    qty_material: '',
    sn_material: '',
    comments: '',
    date: '',
    time: '',
}


export const useInOuts = () => {
    const [inOuts, dispatch] = useReducer(inOutsReducer, [])
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({});
    const [inOutSelected, setInOutSelected] = useState(initialFormInOut);
    const [isSend, setIsSend] = useState(false)

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

    const handlerAddInOut = async(inOut) => {
        try {
            const {id} = inOut

            const response = id === 0
                ? await createInOut(inOut)
                : await updateInOut(inOut)

            if(response.status === 201){
                dispatch({
                    type: (id === 0) ? 'addInOut' : 'updateInOut',
                    payload: response.data.result
                });

                if(id !== 0){
                    handlerCloseFormInOut();
                    Toast.fire({
                        icon: "success",
                        title: 'In/Out updated successfully'
                    })
                    setIsSend(false);
                }else {
                    setIsSend(true);
                    OnSend();
                }
            } else if(response.status === 409){
                setErrors({num_employee_receiver: 'The employee number does not match the employee'})
            } else {
                throw new Error('Error desconocido');
            }
        } catch (error) {
            console.error('Error in handlerAddInOut:', error);
            Toast.fire({
                icon: "error",
                title: "Error al registrar in/out",
            });   
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
                deleteInOut(id);
                dispatch({
                    type: "deleteInOut",
                    payload: id,
                });
                console.log(id)
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

    const OnSend = () => {
        const resetForm = {...initialFormInOut}
        setInOutSelected(resetForm)
        setErrors({});

        setTimeout(() => {
            setIsSend(false);
        }, 1000);
    }


    return {
        inOuts,
        isLoading,
        editing,
        visibleForm,
        errors,
        inOutSelected,
        initialFormInOut,
        isSend,


        getInOuts,
        handlerOpenFormInOut,
        handlerCloseFormInOut,
        handlerInOutSelected,
        handlerDeleteInOut,
        handlerAddInOut,
    }
}