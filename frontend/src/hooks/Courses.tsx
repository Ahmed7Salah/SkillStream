import { useDispatch } from "react-redux"
import { fetchCourseAction, fetchCoursesAction } from "../redux-store/actions"


export const useFetchCourses = () => {
    const dispatch = useDispatch()
    return async (id?: string) => await fetch(`http://localhost:5000/api/course/${id ? id : ""}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => res.json())
        .then((data) => {
            delete data.message
            delete data.success
            if (id) dispatch(fetchCourseAction(data))
            else dispatch(fetchCoursesAction(data))
        })
        .catch((err) => console.log(err))
}


export const useGetContent = () => {
    const dispatch = useDispatch()
    return async (id: string | undefined) => await fetch(`http://localhost:5000/api/course/${id}/content`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((res) => res.json())
    .then((data) => data.content)
    .catch((err) => console.log(err))

}

