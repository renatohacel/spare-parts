export const personalReducer = (state = [], action) => {
    switch (action.type) {
        case 'addEmployee':
            return [action.payload, ...state];

        case 'updateEmployee':
            return state.map((employee) => {
                if (employee.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return employee;
            });
        case 'deleteEmployee':
            return state.filter(emp => emp.id !== action.payload);
        case 'loadPersonal':
            return action.payload;
        default:
            return state;
    }
}