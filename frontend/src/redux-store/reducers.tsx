const initialValues = {
    account: {
        user: null,
        loggedIn: false
    },
    courses: []
}


export const authReducer = (state: any = initialValues, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                account: {
                    loggedIn: true,
                    user: action.user
                }
            }
        case "LOGOUT":
            return {
                ...state,
                account: {
                    loggedIn: false,
                    user: null
                }
            }
        default:
            return state
    }
}