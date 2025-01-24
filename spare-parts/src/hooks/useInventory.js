import { useReducer, useState } from "react"
import { inventoryReducer } from "../reducers/inventoryReducer"
import { getAllInventory } from "../pages/inventory/services/inventoryService";


export const useInventory = () => {
    const [inventory, dispatch] = useReducer(inventoryReducer, []);
    const [isLoading, setIsLoading] = useState(false);


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


    return {
        inventory,
        isLoading,


        getInventory,
    }
}