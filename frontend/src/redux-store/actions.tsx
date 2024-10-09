
export const loginAction = (user: any) => {
    return {
        type: "LOGIN",
        user
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const fetchAction = (user: any) => {
    return {
        type: "FETCH",
        user
    }
}