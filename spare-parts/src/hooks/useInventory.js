import { useReducer } from "react"
import { inventoryReducer } from "../reducers/inventoryReducer"


export const useInventory = () => {
    const [material, dispatch] = useReducer(inventoryReducer);



    return {
        material,

    }
}