import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { fetchAction } from "../redux-store/actions";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "./Courses";
import { useFindUser } from "./User";



export function useFetchUser() {
    const dispatch = useDispatch()
    const naviagate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    return async () => {
      const res = await fetch(`https://skillstreambackend-b2x9s1e2f-ahmed-salahs-projects-534b2558.vercel.app/profile/`, {
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
        const res = await fetch(`https://skillstreambackend-b2x9s1e2f-ahmed-salahs-projects-534b2558.vercel.app/profile`, {
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
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const fetchCourse = useFetchCourses()
    return async (course: string | undefined) => {
        const res = await courseFetch("like-course", { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
        fetchCourse({id: course})
    }
}


export function useUnlikeCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    const fetchCourse = useFetchCourses()
    return async (course: string | undefined) => {
        const res = await courseFetch("unlike-course", { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
        fetchCourse({id: course})
    }
}


export function useAddCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("add-course", { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useRemoveCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const fetchUser = useFetchUser()
    return async (course: string) => {
        const res = await courseFetch("remove-course", { course })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })

        fetchUser()
    }
}


export function useFollowUser() {
    const { enqueueSnackbar } = useSnackbar();
    const findUser = useFindUser()
    const fetchUser = useFetchUser()
    return async (userId: string | undefined, name: string) => {
        const res = await courseFetch("follow-user", { userId })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })
        fetchUser()
        findUser({ name })
    }
}


export function useUnfollowUser() {
    const { enqueueSnackbar } = useSnackbar();
    const findUser = useFindUser()
    const fetchUser = useFetchUser()
    return async (userId: string | undefined, name: string) => {
        const res = await courseFetch("unfollow-user", { userId })
        if (!res.success) enqueueSnackbar(res.message || "Something went wrong", { variant: 'error' })
        fetchUser()
        findUser({ name })
    }
}


// change name to fit uses
const courseFetch = async (route: string, { course, userId }: { course?: string | undefined, userId?: string | undefined }) => {
  return await fetch(`https://skillstreambackend-b2x9s1e2f-ahmed-salahs-projects-534b2558.vercel.app/${route}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ course, userId }),
      credentials: 'include'
  })
  .then((res) => res.json())
  .catch((err) => err)
}