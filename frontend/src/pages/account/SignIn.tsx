import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInFormSchema } from '../../schemas/AccountFormValidationSchema';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux-store/actions';
import SignInUpWith from '../../components/AccountForm/SmallParts/SignInUpWith';
import FormOutlines from '../../components/AccountForm/FormOutlines';
import OrDivider from '../../components/AccountForm/SmallParts/OrDivider';
import CustomInput from '../../components/AccountForm/SmallParts/CustomInput';
import Password from '../../components/AccountForm/SmallParts/Password';
import SignInUpSwitcher from '../../components/AccountForm/SmallParts/SignInUpSwitcher';



// refactor into small components
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState("");

  // updating store
  const dispatch = useDispatch();

  const signInUser = (user: any) => {
    dispatch(login(user))
  }

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: { email: string, password: string }) => {
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    }).then((res) => res.json())
    .catch((err) => console.log(err))
    if (res.success) {
      signInUser(res.user)
      navigate('/', { replace: true })
    } else {
      setSignInError(res.message)
    }
  }


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInFormSchema,
    onSubmit,
  })


  return (
    <FormOutlines
        header="Sign in to your account"
        headerContent="Unlock your potential with courses designed for the future. Thrive in your career with flexible education."
        headerChildren={<SignInUpWith type="Sign In" />}
        topSwitcher={<SignInUpSwitcher selected="Sign in" setSignInError={setSignInError} />}
        >
            <OrDivider />
            <form autoComplete='off' onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem'}}>
                <CustomInput
                    type="email"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <Password
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setApiError={setSignInError}
                    apiError={signInError}
                />
                <Button mt="2" colorScheme="teal" size="lg" w="45%" h="14" fontSize="xl" type="submit">Sign in</Button>
            </form>
            <Button as={Link} to="/account/forgot-password" colorScheme="teal" variant="link" fontSize="sm">
                Forgot password?
            </Button>
    </FormOutlines>
  );
};

export default SignIn;
