import { Heading, Stack, Text } from '@chakra-ui/react'

interface Props {
  header: JSX.Element | string
  content: string
  children?: JSX.Element
}

const FormHeader = ({ header, content, children }: Props) => {
  return (
    <Stack as="section" align="center" spacing="5">
        <Heading fontSize="4xl">
            {header}
        </Heading>
        <Text w="70%" textAlign="center">
            {content}
        </Text>
        {children}
    </Stack>
  )
}

export default FormHeader
