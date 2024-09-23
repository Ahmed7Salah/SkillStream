
export const login = (user: any) => {
    return {
        type: "LOGIN",
        user
    }
}

export const logout = (user: any) => {
    return {
        type: "LOGOUT",
        user
    }
}