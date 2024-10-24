import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { fetchAction, loginAction, updateAccessToken } from "../redux-store/actions";
import { useFetchCourses } from "./Courses";
import { useFindUser } from "./User";



export function useFetchUser() {
    const dispatch = useDispatch()
    const account = useSelector((state: any) => state?.account)
    return async () => {
      const res = await fetch(`https://backend-eta-ten-70.vercel.app/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${account?.access_token || ""}`
        },
        credentials: 'include'
      }).then((res) => {
        const accessToken = res.headers.get('Authorization')?.split(' ')[1]; // "Bearer <token>"
        if (accessToken) dispatch(updateAccessToken(accessToken))
        return res.json()
    })
      .catch((err) => err)
      
      
      if (res.success) {
        if (account.loggedIn) dispatch(fetchAction(res.user))
        else dispatch(loginAction(res.user))
      }
    }
  }



export function useUpdateProfile() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async ({ avatar, name, email, password, confirmPassword, cb, onSuccess }: { avatar?: string, name?: string, email?: string, password?: string, confirmPassword?: string, cb?: () => void, onSuccess?: () => void }) => {
        const res = await fetch(`https://backend-eta-ten-70.vercel.app/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token || ""}`
            },
            body: JSON.stringify({ avatar, name, email, password, confirmPassword }),
            credentials: 'include'
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))

        enqueueSnackbar(res.message || "Something went wrong", { variant: res.success ? 'success' : 'error' })
        
        cb?.()
        if (res.success) onSuccess?.()
        fetchUser()
    }
}


export function useLikeCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const fetchCourse = useFetchCourses()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (course: string | undefined) => {
        const res = await courseFetch("like-course", access_token, { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
        fetchCourse({id: course})
    }
}


export function useUnlikeCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const fetchCourse = useFetchCourses()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (course: string | undefined) => {
        const res = await courseFetch("unlike-course", access_token, { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
        fetchCourse({id: course})
    }
}


export function useAddCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (course: string) => {
        const res = await courseFetch("add-course", access_token, { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useRemoveCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (course: string) => {
        const res = await courseFetch("remove-course", access_token, { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useFollowUser() {
    const { enqueueSnackbar } = useSnackbar();
    const findUser = useFindUser()
    const fetchUser = useFetchUser()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (userId: string | undefined, name: string) => {
        const res = await courseFetch("follow-user", access_token, { userId })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })
        fetchUser()
        findUser({ name })
    }
}


export function useUnfollowUser() {
    const { enqueueSnackbar } = useSnackbar();
    const findUser = useFindUser()
    const fetchUser = useFetchUser()
    const access_token = useSelector((state: any) => state?.account?.access_token)
    return async (userId: string | undefined, name: string) => {
        const res = await courseFetch("unfollow-user", access_token, { userId })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })
        fetchUser()
        findUser({ name })
    }
}


// change name to fit uses
const courseFetch = async (route: string, access_token: string | undefined, { course, userId }: { course?: string | undefined, userId?: string | undefined }) => {
  return await fetch(`https://backend-eta-ten-70.vercel.app/profile/${route}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token || ""}`
      },
      body: JSON.stringify({ course, userId }),
      credentials: 'include'
  })
  .then((res) => res.json())
  .catch((err) => err)
}