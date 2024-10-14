import { useDispatch } from "react-redux"
import { ClearUsersAction, SearchUsersAction } from "../redux-store/actions"
import { useNavigate } from "react-router-dom"



export function useFindUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return async ({ name }: {name: string | undefined}) => {
        const res = await fetch(`https://skillstreambackend-b2x9s1e2f-ahmed-salahs-projects-534b2558.vercel.app/users/find/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .catch((err) => err)
        .then((data) => data)

        if (res?.success) dispatch(SearchUsersAction(res.users))
        else dispatch(ClearUsersAction())

        navigate("/users/results")
    }
}