export const inventoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'addMaterial':
            return [action.payload, ...state];

        case 'updateMaterial':
            return state.map((material) => {
                if (material.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return material;
            });
        case 'deleteMaterial':
            return state.filter(mtl => mtl.id !== action.payload);
        case 'loadMaterial':
            return action.payload;
        default:
            return state;
    }
}