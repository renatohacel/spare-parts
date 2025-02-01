export const exportsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addExport':
            return [action.payload, ...state];

        case 'updateExport':
            return state.map((exp) => {
                if (exp.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return exp;
            });
        case 'deleteExport':
            return state.filter(exp => exp.id !== action.payload);
        case 'loadExport':
            return action.payload;
        default:
            return state;
    }
}