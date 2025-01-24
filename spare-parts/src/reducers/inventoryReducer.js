export const inventoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'addInventory':
            return [action.payload, ...state];

        case 'updateInventory':
            return state.map((material) => {
                if (material.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return material;
            });
        case 'deleteInventory':
            return state.filter(mtl => mtl.id !== action.payload);
        case 'loadInventory':
            return action.payload;
        default:
            return state;
    }
}