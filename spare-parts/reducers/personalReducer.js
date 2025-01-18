export const personalReducer = (state = [], action) => {
    switch (action.type) {
        case 'addEmployee':
            return [...state, action.payload];
        case 'updateEmployee':
            return state.map(emp =>
                emp.id === action.payload.id ? action.payload : emp
            );
        case 'deleteEmployee':
            return state.filter(emp => emp.id !== action.payload);
        case 'loadPersonal':
            return action.payload;
        default:
            return state;
    }
}