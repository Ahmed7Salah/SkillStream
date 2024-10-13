import { Center, Divider, Text } from '@chakra-ui/react'

const OrDivider = () => {
  return (
    <Center w="full" borderColor="gray.400">
        <Divider orientation="horizontal" w="40%" />
            <Text fontSize="sm" mx="3">
                Or
            </Text>
        <Divider w="40%" />
    </Center>
  )
}

export default OrDivider
