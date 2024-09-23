import { Button, Center, Divider, Flex, FormControl, FormErrorMessage, Heading, HStack, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInFormSchema, signUpFormSchema } from '../schemas/AccountFormValidationSchema';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux-store/actions';


interface SignInUpProps {
  type: "Sign in" | "Sign up"
}

// refactor into small components
const SignInUp = ({type}: SignInUpProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  // updating store
  const dispatch = useDispatch();

  const signInUser = (user: any) => {
    dispatch(login(user))
  }

  const navigate = useNavigate();

  const signIn = async ({ email, password }: { email: string, password: string }) => {
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    }).then((res) => res.json())
    .catch((err) => console.log(err))
    if (res.success === true) {
      signInUser(res.user)
      navigate('/', { replace: true })
    } else {
      setSignInError(res.message)
    }
  }

  const signUp = async ({ email, password, confirmPassword, name }: { email: string, password: string, confirmPassword: string, name: string }) => {
    const res = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword, name }),
    }).then((res) => res.json())
    .catch((err) => console.log(err))
    if (res.success === true) {
      signInUser(res.user)
      navigate('/', { replace: true })
    } else {
      setSignUpError(res.message === "Email already registered" ? res.message : "Something went wrong")
    }
  }

  const onSubmit = (values: any) => {
    if (type === "Sign up") signUp(values)
    else signIn(values)
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: type === "Sign up" ? signUpFormSchema : signInFormSchema,
    onSubmit,
  })


  return (
    <Flex
      as="main"
      h="fit-content"
      w="100vw"
      bg="gray.100"
      p="8"
      align="center"
      justify="center"
    >
      <VStack
        position="relative"
        mx="auto"
        bg="gray.50"
        h="full"
        w="35%"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        spacing="8"
        pb="8"
        pt="20"
        boxShadow="md"
        justify="center"
      >
        <HStack position="absolute" top="0" w="100%" gap="0">
          <Button as={Link} w="100%" size="lg" to="/signup" onClick={() => setSignInError("")} colorScheme={type === "Sign up" ? "teal" : "gray"} borderRadius="none" outline="none">
            Sign up
          </Button>
          
          <Button as={Link} to="/signin" size="lg" w="100%" onClick={() => setSignUpError("")} colorScheme={type === "Sign in" ? "teal" : "gray"} borderRadius="none" outline="none">
            Sign in
          </Button>
        </HStack>
        <Stack as="section" align="center" spacing="5">
          <Heading fontSize="4xl">
            {type} to{" "}
            <Text as="span" bg="teal" color="white" p="1.5" borderRadius="md">
              SkillStream
            </Text>
          </Heading>
          <Text w="70%" textAlign="center">
            Unlock your potential with courses designed for the future. Thrive in
            your career with flexible education.
          </Text>
          <HStack>
            <Button
              bg="transparent"
              size="lg"
              fontSize="md"
              border="1px"
              borderRadius="sm"
              borderColor="gray.400"
              leftIcon={<FcGoogle size="20" />}
              onClick={() => console.log(`${type} with Google`)}
            >
                {type} with Google
            </Button>
            <Button
              bg="transparent"
              size="lg"
              fontSize="md"
              border="1px"
              borderRadius="sm"
              borderColor="gray.400"
              leftIcon={<VscGithubInverted size="20" />}
              onClick={() => console.log(`${type} with Github`)}
            >
                {type} with Github
            </Button>
          </HStack>
        </Stack>
        <Center w="full" borderColor="gray.400">
          <Divider orientation="horizontal" w="40%" />
          <Text fontSize="sm" mx="3">
            Or
          </Text>
          <Divider w="40%" />
        </Center>
        <form autoComplete='off' onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem'}}>
          {type === "Sign up" && <FormControl isInvalid={!!errors.name && touched.name}>
            <Input
            placeholder="Name"
            size="lg"
            name="name"
            required
            borderColor="gray.400"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>}
          <FormControl isInvalid={(!!errors.email && touched.email) || !!signUpError}>
            <Input
              placeholder="Email"
              value={values.email}
              onChange={(e) => {
                handleChange(e)
                setSignUpError("")}}
              onBlur={handleBlur}
              size="lg"
              type='email'
              name="email"
              required
              borderColor="gray.400"
            />
            <FormErrorMessage>{signUpError ? signUpError : errors.email}</FormErrorMessage>
          </FormControl>
            <FormControl isInvalid={(!!errors.password && touched.password) || !!signInError} position="relative">
              <Input
                placeholder="Password"
                size="lg"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                borderColor="gray.400"
                value={values.password}
                onChange={(e) => {
                  handleChange(e)
                  setSignInError("")}}
                onBlur={handleBlur}
              />
              <Button
                right="0"
                zIndex="10"
                position="absolute"
                bg="transparent"
                h="12"
                size="xs"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                onClick={() => setShowPassword(!showPassword)}
                rightIcon={
                  showPassword ? <GrFormViewHide size="25" /> : <GrFormView size="25" />
                }
              >
              </Button>
              <FormErrorMessage>{signInError ? signInError : errors.password}</FormErrorMessage>
            </FormControl>
          {type === "Sign up" &&
            <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
              <Input
                placeholder="Confirm Password"
                size="lg"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                borderColor="gray.400"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>}
            <Button mt="2" colorScheme="teal" size="lg" w="45%" h="14" fontSize="xl" type="submit">
              {type}
            </Button>
        </form>

        {type === "Sign in" && <Button variant="link" fontSize="sm">
          Forgot password?
        </Button>}
      </VStack>
    </Flex>
  );
};export default SignInUp;
