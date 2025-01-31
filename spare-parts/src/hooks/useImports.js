import { useReducer, useState } from "react"
import { importsReducer } from "../reducers/importsReducer";
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


export const useImports = () => {
    const [imports, dispatch] = useReducer(importsReducer, []);
    const [visibleImports, setVisibleImports] = useState(false);
    const [partNumSelected, setPartNumSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const getImportsByName = async (impt) => {
        try {
            setIsLoading(true);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const handlerImportSelected = (impt) => {
        setVisibleImports(true);
        setPartNumSelected(impt)
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

        handlerImportSelected,
        getImportsByName,
        handlerCloseTableImports,
    }
}