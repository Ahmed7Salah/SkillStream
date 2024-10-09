import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { fetchAction } from "../redux-store/actions";



export function useFetchUser() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    return async () => {
      const res = await fetch(`http://localhost:5000/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }).then((res) => res.json())
      .catch((err) => console.log(err))

      if (res.success) {
        dispatch(fetchAction(res.user))
      } else {
          enqueueSnackbar(res.message, { variant: 'error' })
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