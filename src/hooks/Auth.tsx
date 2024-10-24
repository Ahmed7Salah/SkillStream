import { useDispatch } from "react-redux"
import { loginAction, logoutAction } from "../redux-store/actions"
import { useNavigate } from "react-router-dom"



export function useLogin(setState: React.Dispatch<React.SetStateAction<string>>) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   return async ({ email, password }: { email: string, password: string }) => {
    const { message, success, user } = await userFetch('login', { email, password })
    if (success) {
      dispatch(loginAction(user))
      navigate('/', { replace: true })
    } else {
      setState(message)
    }
  }
}


export function useSignUp(setState: React.Dispatch<React.SetStateAction<string>>) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   return async ({ email, password, confirmPassword, name }: { email: string, password: string, confirmPassword: string, name: string }) => {
    const { message, success, user } = await userFetch('signup', { email, password, confirmPassword, name })
    if (success) {
      dispatch(loginAction(user))
      navigate('/', { replace: true })
    } else {
      setState(message)
    }
  }
}


export function useLogout(setState: React.Dispatch<React.SetStateAction<string>>) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return async () => {
      const { message } = await userFetch('logout')
      setState(message)
        dispatch(logoutAction())
        navigate('/account/sign-in', { replace: true })
    }
}


export function useResetPassword (
  setState: React.Dispatch<React.SetStateAction<{message: string, success: boolean, fetched: boolean}>>,
  userId: string | undefined,
  token: string | undefined
) {
  return async ({ password, confirmPassword }: { password: string, confirmPassword: string}) => {
    const { message, success } = await userFetch(`reset-password/${userId}/${token}`, { password, confirmPassword })
    setState({message, success, fetched: true})
  }
}



export function useForgotPassword(
  setState: React.Dispatch<React.SetStateAction<{message: string, success: boolean}>>,
  setApiError: React.Dispatch<React.SetStateAction<string>>
) {
  return async ({ email }: { email: string }) => {
    const { message, success } = await userFetch('forgot-password', { email })
    if (success) setState({ message, success })
    else setApiError(message)
  }
}



async function userFetch(route: string,
  { email, password, confirmPassword, name }: {
    email?: string,
    password?: string,
    confirmPassword?: string,
    name?: string
  } = {}) : Promise<{message: string, success: boolean, user?: {name: string, email: string}}> {
  return await fetch(`https://backend-eta-ten-70.vercel.app/user/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword, name }),
    credentials: 'include'
  }).then((res) => res.json())
  .catch((err) => err)
}
