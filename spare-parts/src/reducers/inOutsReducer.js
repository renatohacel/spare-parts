export const inOutsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addInOut':
            return [action.payload, ...state];

        case 'updateInOut':
            return state.map((inOut) => {
                if (inOut.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return inOut;
            });
        case 'deleteInOut':
            return state.filter(io => io.id !== action.payload);
        case 'loadInOut':
            return action.payload;
        default:
            return state;
    }
}