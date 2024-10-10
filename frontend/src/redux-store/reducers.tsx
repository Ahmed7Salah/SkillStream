const initialValues = {
    account: {
        user: null,
        loggedIn: false
    },
    courses: {
        coursesList: [],
        page: 1,
        pages: 1,
        count: 0,
        categories: []
    }
}

// TODO: FETCH_COURSE causes FETCH_COURSES fix
export const rootReducer = (state: any = initialValues, action: any) => {
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
        case "USER_FETCH":
            return {
                ...state,
                account: {
                    ...state.account,
                    user: action.user
                }
            }
        case "COURSES_FETCH":
            return {
                ...state,
                courses: action.courses
            }
        case "COURSE_FETCH":
            return {
                ...state,
                courses: {...state.courses, coursesList: [...state.courses.coursesList, action.course]}
            }
        default:
            return state
    }
}