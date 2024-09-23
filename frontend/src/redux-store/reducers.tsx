const initialValues = {
    user: null,
    loggedIn: false
}


export const authReducer = (auth: any = initialValues, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...auth,
                loggedIn: true,
                user: action.user
            }
        case "LOGOUT":
            return {
                ...auth,
                loggedIn: false,
                user: null
            }
        default:
            return auth
    }
}