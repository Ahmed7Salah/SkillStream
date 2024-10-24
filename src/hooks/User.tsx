import { useDispatch, useSelector } from "react-redux"
import { ClearUsersAction, SearchUsersAction } from "../redux-store/actions"
import { useNavigate } from "react-router-dom"



export function useFindUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async ({ name }: {name: string | undefined}) => {
        const res = await fetch(`https://backend-eta-ten-70.vercel.app/users/find/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token || ""}`
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