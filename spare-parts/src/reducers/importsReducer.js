export const importsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addImport':
            return [action.payload, ...state];

        case 'updateImport':
            return state.map((imp) => {
                if (imp.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return imp;
            });
        case 'deleteImport':
            return state.filter(imp => imp.id !== action.payload);
        case 'loadImport':
            return action.payload;
        default:
            return state;
    }
}