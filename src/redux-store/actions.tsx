
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
        type: "USER_FETCH",
        user
    }
}


export const fetchCoursesAction = (courses: any) => {
    return {
        type: "COURSES_FETCH",
        courses
    }
}


export const fetchCourseAction = (course: any) => {
    return {
        type: "COURSE_FETCH",
        course
    }
}


export const SearchUsersAction = (usersList: any) => {
    return {
        type: "SEARCH_USERS",
        usersList
    }
}


export const ClearUsersAction = () => {
    return {
        type: "CLEAR_USERS"
    }
}


export const updateAccessToken = (access_token: string | undefined) => {
    return {
        type: "UPDATE_ACCESS_TOKEN",
        access_token
    }
}