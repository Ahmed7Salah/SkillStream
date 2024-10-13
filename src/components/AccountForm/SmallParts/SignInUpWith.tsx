import { Button, HStack } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { VscGithubInverted } from 'react-icons/vsc'

const SignInUpWith = ({ type }: {type: string}) => {
  return (
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
  )
}

export default SignInUpWith
