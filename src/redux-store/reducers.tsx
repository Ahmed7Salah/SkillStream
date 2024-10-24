
const initialValues = {
    account: {
        user: null,
        loggedIn: false,
        access_token: null
    },
    courses: {
        coursesList: [],
        page: 1,
        pages: 1,
        count: 0,
        categories: []
    },
    users: {
        usersList: [],
        page: 1,
        pages: 1,
        count: 0
    }
}

// TODO: FETCH_COURSE causes FETCH_COURSES fix
export const rootReducer = (state: any = initialValues, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                account: {
                    ...state.account,
                    loggedIn: true,
                    user: action.user
                }
            }
        case "LOGOUT":
            return {
                ...state,
                account: {
                    ...state.account,
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
                courses: {...state.courses, coursesList:
                    state.courses.coursesList.map((course: any) => course._id === action.course._id ? action.course : course)
                }
            }
            // TODO fetch pages...
        case "SEARCH_USERS":
            return {
                ...state,
                users: {...state.users, usersList: action.usersList}
            }
        case "CLEAR_USERS":
            return {
                ...state,
                users: {...state.users, usersList: []}
            }
        case "UPDATE_ACCESS_TOKEN":
            return {
                ...state,
                account: {
                    ...state.account,
                    access_token: action.access_token
                }
        }
        default:
            return state
    }
}