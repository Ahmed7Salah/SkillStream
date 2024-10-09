import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    selected: string,
    setSignInError?: React.Dispatch<React.SetStateAction<string>>,
    setSignUpError?: React.Dispatch<React.SetStateAction<string>>
}


const SignInUpSwitcher = ({ selected, setSignInError, setSignUpError }: Props) => {
  return (
    <HStack position="absolute" top="0" w="100%" gap="0">
        <Button as={Link} to="/account/sign-up" w="100%" size="lg" onClick={setSignInError ? () => setSignInError("") : undefined } colorScheme={selected === "Sign up" ? "teal" : "gray"} borderRadius="none" outline="none">
            Sign up
        </Button>
        <Button as={Link} to="/account/sign-in" w="100%" size="lg" onClick={setSignUpError ? () => setSignUpError("") : undefined } colorScheme={selected === "Sign in" ? "teal" : "gray"} borderRadius="none" outline="none">
            Sign in
        </Button>
    </HStack>
  )
}

export default SignInUpSwitcher
