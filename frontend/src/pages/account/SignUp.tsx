import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpFormSchema } from '../../schemas/AccountFormValidationSchema';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux-store/actions';
import SignInUpWith from '../../components/AccountForm/SmallParts/SignInUpWith';
import FormOutlines from '../../components/AccountForm/FormOutlines';
import OrDivider from '../../components/AccountForm/SmallParts/OrDivider';
import CustomInput from '../../components/AccountForm/SmallParts/CustomInput';
import SignInUpSwitcher from '../../components/AccountForm/SmallParts/SignInUpSwitcher';
import PasswordAndConfirmPass from '../../components/AccountForm/SmallParts/PasswordAndConfirmPass';

const SignUp = () => {
    const [signUpError, setSignUpError] = useState("");
    // updating store
    const dispatch = useDispatch();

    const signInUser = (user: any) => {
        dispatch(login(user))
    }

    const navigate = useNavigate();

    
    const onSubmit = async ({ email, password, confirmPassword, name }: { email: string, password: string, confirmPassword: string, name: string }) => {
        const res = await fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, confirmPassword, name }),
        }).then((res) => res.json())
            .catch((err) => console.log(err))
        if (res.success) {
            signInUser(res.user)
            navigate('/', { replace: true })
        } else {
            setSignUpError(res.message)
        }
    }


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        validationSchema: signUpFormSchema,
        onSubmit,
      })

  return (
    <FormOutlines
        header="Sign up to your account"
        headerContent="Unlock your potential with courses designed for the future. Thrive in your career with flexible education."
        headerChildren={<SignInUpWith type="Sign Up" />}
        topSwitcher={<SignInUpSwitcher selected="Sign up" setSignUpError={setSignUpError} />}
        >
            <OrDivider />
            <form autoComplete='off' onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem'}}>
                <CustomInput
                    type="name"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <CustomInput
                    type="email"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    apiError={signUpError}
                    setApiError={setSignUpError}
                />
                <PasswordAndConfirmPass
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <Button mt="2" colorScheme="teal" size="lg" w="45%" h="14" fontSize="xl" type="submit">Sign up</Button>
            </form>
    </FormOutlines>
  )
}

export default SignUp
