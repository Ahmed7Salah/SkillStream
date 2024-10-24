import { useDispatch } from "react-redux"
import { fetchCourseAction, fetchCoursesAction } from "../redux-store/actions"


export const useFetchCourses = () => {
    const dispatch = useDispatch()
    return async ({ id, page, category }: { id?: string, page?: number, category?: string }) => await fetch(
        `https://backend-eta-ten-70.vercel.app/api/course/${id ? id : `?pageNumber=${page}&category=${category ? category : ""}`}`
        , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => res.json())
        .then((data) => {
            delete data.message
            delete data.success
            if (id) dispatch(fetchCourseAction(data.course))
            else dispatch(fetchCoursesAction(data))
        })
        .catch((err) => console.log(err))
}


export const useGetContent = () => {
    return async (id: string | undefined) => await fetch(`https://backend-eta-ten-70.vercel.app/api/course/${id}/content`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((res) => res.json())
    .then((data) => data.content)
    .catch((err) => console.log(err))

}

