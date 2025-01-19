
export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login':
            return {
                isAuth: true,
                user: action.payload
            }
        case 'logout':
            return {
                isAuth: false,
            }
        case 'updateProfile':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
