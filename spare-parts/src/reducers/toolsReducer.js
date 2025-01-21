export const toolsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addTool':
            return [action.payload, ...state];
        case 'updateTool':
            return state.map((tools) => {
                if (tools.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return tools;
            });
        case 'deleteTool':
            return state.filter(emp => emp.id !== action.payload);
        case 'loadTools':
            return action.payload;
        default:
            return state;
    }
}