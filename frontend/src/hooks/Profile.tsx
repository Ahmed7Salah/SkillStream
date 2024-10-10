import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { fetchAction } from "../redux-store/actions";
import { useNavigate } from "react-router-dom";



export function useFetchUser() {
    const dispatch = useDispatch()
    const naviagate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    return async () => {
      const res = await fetch(`http://localhost:5000/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }).then((res) => res.json())
      .catch((err) => err)

      if (res.success) {
        dispatch(fetchAction(res.user))
      } else {
          enqueueSnackbar("Please login first", { variant: 'error' })
          naviagate('/account/sign-in', { replace: true })
      }
    }
  }



export function useUpdateProfile() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async ({ avatar, name, email, password, confirmPassword, cb, onSuccess }: { avatar?: string, name?: string, email?: string, password?: string, confirmPassword?: string, cb?: () => void, onSuccess?: () => void }) => {
        const res = await fetch(`http://localhost:5000/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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
    // const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("like-course", { course })
        // if (!res.success) enqueueSnackbar("Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useUnlikeCourse() {
    // const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("unlike-course", { course })
        // if (!res.success) enqueueSnackbar("Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useAddCourse() {
    // const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("add-course", { course })
        // if (!res.success) enqueueSnackbar("Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useRemoveCourse() {
    // const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("remove-course", { course })
        // if (!res.success) enqueueSnackbar("Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


const courseFetch = async (route: string, { course }: { course: string }) => {
  return await fetch(`http://localhost:5000/profile/${route}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ course }),
      credentials: 'include'
  })
  .then((res) => res.json())
  .catch((err) => err)
}