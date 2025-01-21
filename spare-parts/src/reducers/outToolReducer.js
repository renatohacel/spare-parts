export const outToolReducer = (state = [], action) => {
    switch (action.type) {
        case 'addOutTool':
            return [action.payload, ...state];
        case 'updateOutTool':
            return state.map((tools) => {
                if (tools.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return tools;
            });
        case 'deleteOutTool':
            return state.filter(out => out.id !== action.payload);
        case 'loadOutTools':
            return action.payload;
        default:
            return state;
    }
}